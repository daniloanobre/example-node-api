// Author - Danilo Assis Nobre | danilo@assistatecnologia.com.br

/*
 * APP SETTINGS
*/


// Required Libs
const path = require('path');

// Local variables
const config = {};

/*
 * Database Settings
 */

config.dbAddress = 'mongodb://localhost/example-api';

/*
 * Log Settings
 */

config.logDir = path.join(__dirname, '../logs');

/*
 * Errors Code Settings
 */

config.errors = {
  unauthorized: 401,
  forbidden: 403,
  unprocessableEntity: 422,
  notFound: 404,
  unsupportableMediaType: 415,
  badRequest: 400,
  payloadTooLarge: 413,
  tooManyRequests: 429,
  preconditionFailed: 412,
  internalServerError: 500,
  serviceUnavailable: 503,
  badGateway: 502,
};

module.exports = config;
