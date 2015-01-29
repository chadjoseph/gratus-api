(function () {
  "use strict";

  var bcrypt = require('bcryptjs');
  var thunkify = require('thunkify');

  exports.compare = thunkify(bcrypt.compare);

  exports.hash = thunkify(bcrypt.hash);
})();

