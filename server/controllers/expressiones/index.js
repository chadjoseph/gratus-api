(function () {
  'use strict';

  var gratus = require('../../gratus');

  var config = gratus.config;
  var db = gratus.db;

  var options = config.expressiones;

  var valid = require('../../services/validation').isExpressio;
  var sanitize = require('../../services/sanitation').removeAndStripTags;

  var body = require('co-body');

  exports.create = function *() {
    var expressio = yield body(this);

    if (this.token && this.token.persona && valid(expressio)) {
      expressio.expressio = sanitize(expressio.expressio);
      expressio.date = Date.now();
      expressio.persona = this.token.persona;

      yield db.insert(expressio);

      this.response.status = 201;
    }
  };

  exports.index = function *() {
    var result = yield db.view_with_list('expressiones', 'all',
        'index', {
          collation: options.collation,
          descending: options.descending,
          include_docs: options.include_docs,
          limit: options.limit
        });

    var expressiones = result[0].expressiones;

    this.body = {
      expressiones: expressiones
    };
  };

  exports.show = function *(id) {
    var result = yield db.view_with_list('expressiones', 'by-id',
        'show', {
          collation: options.collation,
          include_docs: options.include_docs,
          key: id
        });

    var expressiones = result[0].expressiones;

    this.body = {
      expressiones: expressiones,
      id: id
    };
  };
})();
