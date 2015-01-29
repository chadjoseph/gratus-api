(function () {
  "use strict";

  module.exports = {
    cors: {
      methods: ['GET', 'POST'],
      origin: process.env.CORS_ORIGIN || 'http://localhost:5000'
    },
    database: {
      name: 'gratus',
      url: process.env.CLOUDANT_URL || 'http://localhost:5984'
    },
    expressiones: {
      collation: 'raw',
      descending: true,
      include_docs: true,
      limit: 44,
      sentinel: '\ufff0'
    },
    jwt: {
      issuer: 'gratus.io',
      key: 'token',
      passthrough: true,
      secret: process.env.JWT_SECRET_KEY || 'secret'
    },
    server: {
      port: process.env.PORT || 8000
    },
    validation: {
      exprimo: {
        expressio: {
          maxlength: 440,
          minlength: 3,
          pattern: /^(?!.*[`@#%^_+{}\\<>])/
        }
      },
      join: {
        email: {
          maxlength: 254,
          minlength: 6,
          pattern: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
        },
        name: {
          maxlength: 55,
          minlength: 2,
          pattern: /^([a-zA-Z]+((([.]{1})+ ?)|([-]{1})|([\s]{1}))?)+?$/
        },
        persona: {
          maxlength: 18,
          minlength: 2,
          pattern: /^[a-zA-Z0-9]+$/
        },
        password: {
          maxlength: 22,
          minlength: 8,
          pattern: /^[a-zA-Z0-9!@$]+$/
        }
      }
    }
  };
})
();

