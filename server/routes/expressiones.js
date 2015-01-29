(function () {
  'use strict';

  var gratus = require('../gratus');

  var expressiones = require('../controllers/expressiones/index');
  var by = require('../controllers/expressiones/by/index');

  var route = require('koa-route');

  gratus.use(route.post('/expressiones', expressiones.create));

  gratus.use(route.get('/expressiones', expressiones.index));
  gratus.use(route.get('/expressiones/:id', expressiones.show));

  gratus.use(route.get('/expressiones/by/:slash', by.slash));
})();

