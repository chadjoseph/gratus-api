(function () {
  'use strict';

  var gratus = require('../gratus');

  var personas = require('../controllers/personas');

  var route = require('koa-route');

  gratus.use(route.post('/personas', personas.create));

  gratus.use(route.get('/personas/:persona', personas.show));
})();

