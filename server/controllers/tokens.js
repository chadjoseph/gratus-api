(function () {
  'use strict';

  var gratus = require('../gratus');

  var config = gratus.config;
  var db = gratus.db;

  var bcrypt = require('../services/bcrypt');

  var jwt = require('koa-jwt');
  var body = require('co-body');

  exports.create = function *() {
    var creds = yield body(this);

    if (creds) {
      var persona = (yield db.get(creds.persona.toLowerCase()))[0];

      if (persona) {
        var authenticated = yield bcrypt.compare(creds.password, persona.hash);

        if (authenticated) {
          this.body = {
            name: persona.name,
            persona: persona._id,
            token: jwt.sign(
                {
                  name: persona.name,
                  persona: persona._id
                },
                config.jwt.secret
            )
          };
        }
        else {
          this.response.status = 401;
        }
      }
      else {
        this.response.status = 401;
      }
    }
  };
})();
