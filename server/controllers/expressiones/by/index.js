(function () {
  'use strict';

  var gratus = require('../../../gratus');

  var config = gratus.config;
  var db = gratus.db;

  var options = config.expressiones;

  exports.slash = function *(slash) {
    slash = slash.toLowerCase();

    var result = yield db.view_with_list('expressiones', 'by-slash',
        'index', {
          collation: options.collation,
          descending: options.descending,
          endkey: [slash],
          include_docs: options.include_docs,
          limit: options.limit,
          startkey: [slash, options.sentinel]
        });

    var expressiones = result[0].expressiones;

    this.body = {
      expressiones: expressiones
    };
  };
})();
