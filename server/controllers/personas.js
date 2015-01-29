(function () {
  'use strict';

  var gratus = require('../gratus');

  var config = gratus.config;
  var db = gratus.db;

  var options = config.expressiones;

  var bcrypt = require('../services/bcrypt');
  var valid = require('../services/validation').isPersona;

  var body = require('co-body');
  var crypto = require('crypto');

  exports.create = function *() {
    var persona = yield body(this);

    if (valid(persona)) {
      persona.email = persona.email.toLowerCase();

      var emails = (yield db.view('personas', 'by-email', {
        key: persona.email
      }))[0];

      if (emails.rows.length) {
        this.response.status = 422;

        return;
      }

      persona._id = persona.persona.toLowerCase();
      persona.hash = yield bcrypt.hash(persona.password, 11);
      persona.gravatar =
          crypto
              .createHash('md5')
              .update(persona.email)
              .digest('hex');

      delete persona.password;
      delete persona.persona;

      try {
        var result = yield db.insert(persona);

        this.response.status = result[1]['status-code'];
      } catch (err) {
        this.response.status = err['status-code'];
      }
    }
  };

  exports.show = function *(persona) {
    persona = persona.toLowerCase();

    var result = yield db.view_with_list('personas', 'by-persona',
        'show', {
          collation: options.collation,
          descending: options.descending,
          endkey: [persona],
          include_docs: options.include_docs,
          limit: options.limit,
          startkey: [persona, options.sentinel]
        });

    var doc = result[0].persona;
    var expressiones = result[0].expressiones;

    this.body = {
      doc: doc,
      expressiones: expressiones,
      persona: persona
    };
  };
})();
