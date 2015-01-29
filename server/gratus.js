(function () {
  'use strict';

  require('sugar');

  RegExp.prototype.toJSON = function () {
    return this.toString();
  };

  var koa = require('koa');
  var cors = require('koa-cors');
  var jwt = require('koa-jwt');

  var config = require('./config');

  var nano = require('nano')(config.database.url);
  var db = require('./services/nano')(nano).use(config.database.name);

  var gratus = module.exports = koa();

  gratus.use(function *(next) {
    this.set('X-Powered-By', 'gratitude');

    yield next;
  });

  gratus.use(cors(config.cors));

  gratus.use(
      jwt({
        issuer: config.jwt.issuer,
        secret: config.jwt.secret,
        passthrough: config.jwt.passthrough,
        key: config.jwt.key
      })
  );

  module.exports.config = config;
  module.exports.db = db;
})();

