(function () {
  "use strict";

  exports.removeAndStripTags = function (string) {
    return string
        .removeTags('a')
        .stripTags()
        .compact();
  };
})();