(function () {
  'use strict';

  var gratus = require('../gratus');

  var config = gratus.config;

  var validation = config.validation;

  exports.show = function *(section) {
    this.body = {
      validators: yield validation[section]
    };
  };
})();
