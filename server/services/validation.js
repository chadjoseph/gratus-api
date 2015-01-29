(function () {
  "use strict";

  var gratus = require('../gratus');

  var config = gratus.config;

  var validation = config.validation;

  var isValid = function (validate, value) {
    var length = value.length;

    return length >= validate.minlength &&
        length <= validate.maxlength &&
        validate.pattern.test(value);
  };

  exports.isPersona = function (model) {
    var persona = model.persona;
    var password = model.password;
    var name = model.name;
    var email = model.email;

    if (!persona || !password || !name || !email) {
      return false;
    }

    var validate = validation.join;

    return isValid(validate.persona, persona) &&
        isValid(validate.password, password) &&
        isValid(validate.name, name) &&
        isValid(validate.email, email);
  };

  exports.isExpressio = function (model) {
    var expressio = model.expressio;

    if (!expressio) {
      return false;
    }

    var validate = validation.exprimo;

    return isValid(validate.expressio, expressio);
  };
})
();