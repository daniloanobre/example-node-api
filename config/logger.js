/*
 * LOGGER SETTINGS
 */


// Required Libs
const winston = require('winston');
const fs = require('fs');

const settings = require('./settings');

// Options
winston.emitErrs = true;
winston.level = process.env.LOG_LEVEL || 'debug';

/*
 * Log Settings
 */

// Create the log directory if it does not exist
if (!fs.existsSync(settings.logDir)) fs.mkdirSync(settings.logDir);

// Logger instance
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      name: 'info-file',
      level: 'info',
      filename: './logs/info-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    }),
    new (winston.transports.File)({
      name: 'error-file',
      level: 'error',
      filename: './logs/error-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    }),
    new (winston.transports.Console)({
      level: winston.level,
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp() {
        return (new Date()).toISOString();
      },
    }),
  ],
});

module.exports = logger;
module.exports.stream = {
  write(message) {
    logger.info(message.slice(0, -1).replace(/"/g, "'"));
  },
};
