const { logger, initializeLogging } = require('./logger');
const { sendError } = require('./errors');

module.exports = {
  logger,
  initializeLogging,
  sendError
};
