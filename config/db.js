/*
 * DATABASE SETTINGS
 */


// Required Libs
const mongoose = require('mongoose');

// My global lib for javascript Promises
mongoose.Promise = require('bluebird')

// Required utils
const settings = require('./settings');
const logger = require('./logger');

// Local variables
const db = mongoose.connection;

// Connection
function connect() {
  return mongoose.connect(settings.dbAddress, {
    useMongoClient: true,
    autoReconnect: true,
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    socketTimeoutMS: 0,
    poolSize: 5,
    connectTimeoutMS: 30000,
  });
}

// Activate
connect();

// Events
db.on('error', () => {
  logger.error('MongoDB:', 'Connection error...');
  mongoose.disconnect();
});

db.on('connected', () => logger.info('MongoDB:', 'Connection established!'));
db.once('open', () => logger.info('MongoDB:', 'Connection successful!'));
db.on('reconnected', () => logger.info('MongoDB:', 'Reconnected established!'));
db.on('connecting', () => logger.warn('MongoDB:', 'Connecting...'));
db.on('close', () => logger.verbose('MongoDB:', 'Closed connection!'));
db.on('timeout', () => logger.error('MongoDB:', 'Connection timeout...'));

db.on('disconnected', () => {
  logger.warn('MongoDB:', 'Lost connection!');
  setTimeout(() => {
    connect();
  }, 1000);
});

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
  db.close(() => {
    logger.info('MongoDB:', 'Force close connection!');
    process.exit(0);
  });
});

module.exports = mongoose;
