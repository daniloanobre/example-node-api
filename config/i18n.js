// Author - Danilo Assis Nobre | danilo@assistatecnologia.com.br

/*
 * I18N SETTINGS
 */


// Required Libs
const i18n = require('i18n');
const path = require('path');

// Configuration
i18n.configure({
  // setup some locales - other locales default to en silently
  locales: ['en-US', 'pt-BR'],

  // you may alter a site wide default locale
  defaultLocale: 'en-US',

  // query parameter to switch locale (ie. /home?lang=ch) - defaults to NULL
  queryParameter: 'lang',

  // where to store json files - defaults to './locales'
  directory: path.join(__dirname, 'locales'),

  // object or [obj1, obj2] to bind the i18n api and current locale to - defaults to null
  register: global,

  // enable object notation
  objectNotation: true,

  // hash to specify different aliases for i18n's internal methods to apply on the
  // request/response objects (method -> alias).
  // note that this will *not* overwrite existing properties with the same name
  api: {
    __: 't', // now req.__ becomes req.t
    __n: 'tn', // and req.__n can be called as req.tn
  },

  // Downcase locale when passed on queryParam; e.g. lang=en-US becomes
  // en-us.  When set to false, the queryParam value will be used as passed;
  // e.g. lang=en-US remains en-US.
  preserveLegacyCase: true,
});

module.exports = i18n;
