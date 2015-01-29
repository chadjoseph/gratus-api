(function () {
  'use strict';

  var gratus = require('./index');

  var config = gratus.config;

  gratus.listen(config.server.port);
})();

