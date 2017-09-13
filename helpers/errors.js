// Author - Danilo Assis Nobre | danilo@assistatecnologia.com.br

/*
 * ERRORS HELPER
 */


// Required utils
const settings = require('../config/settings');

// Error when object already exists
exports.duplicateError = function (message, object) {
  const err = new Error(message || t('Error.Duplicate'));
  err.object = object;
  return err;
};

// Error when not find the resource
exports.notFoundError = function (message) {
  const err = new Error(message || t('Error.NotFound'));
  err.status = settings.errors.notFound;
  return err;
};

// Error when object type is not valid
exports.objectTypeError = function (message) {
  const err = new Error(message || t('Error.ObjectType'));
  err.status = settings.errors.unprocessableEntity;
  return err;
};

// Error when request is not valid
exports.badRequestError = function (message) {
  const err = new Error(message || t('Error.BadRequest'));
  err.status = settings.errors.badRequest;
  return err;
};

// Error when is not possible to continue
exports.unprocessableError = function (message) {
  const err = new Error(message || t('Error.Unprocessable'));
  err.status = settings.errors.unprocessableEntity;
  return err;
};

// Error when request is not authorized
exports.notAuthorizedError = function (message) {
  const err = new Error(message || t('Error.NotAuthorized'));
  err.status = settings.errors.unauthorized;
  return err;
};

// Error in database
exports.dbError = function (dbInfo) {
  const message = dbInfo.errors ?
    dbInfo.errors[Object.keys(dbInfo.errors)[0]].message : dbInfo.message;
  const err = new Error(message || t('Error.Database'));
  err.status = settings.errors.internalServerError;
  return err;
};

// Error when hurts business rule
exports.businessRuleError = function (message) {
  const err = new Error(message || t('Error.BusinessRule'));
  err.status = settings.errors.unprocessableEntity;
  return err;
};

// Error when some service unavailable
exports.serviceUnavailable = function (message) {
  const err = new Error(message || t('Error.ServiceUnavailable'));
  err.status = settings.errors.serviceUnavailable;
  return err;
};
