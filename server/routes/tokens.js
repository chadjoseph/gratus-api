(function () {
  'use strict';

  var gratus = require('../gratus');

  var tokens = require('../controllers/tokens');

  var route = require('koa-route');

  gratus.use(route.post('/tokens', tokens.create));
})();

