(function () {
  'use strict';

  var gratus = require('../gratus');

  var validation = require('../controllers/validation');

  var route = require('koa-route');

  gratus.use(route.get('/validation/:section', validation.show));
})();

