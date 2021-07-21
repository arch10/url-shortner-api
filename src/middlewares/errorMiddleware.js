const { sendError, logger } = require('../util');

function errorHandler(err, req, res, next) {
  const errorMessage = err.message || 'Unknown error';
  const metadata = err.metadata || 'No Metadata';
  switch (err.status) {
    case 400:
      res.status(400).json(sendError(400, errorMessage));
      logger.warn(
        `400 - ${res.statusMessage} - ${errorMessage} - ${metadata} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
      break;
    case 401:
      res.status(401).json(sendError(401, errorMessage));
      logger.warn(
        `401 - ${res.statusMessage} - ${errorMessage} - ${metadata} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
      break;
    case 403:
      res.status(403).json(sendError(403, 'Forbidden'));
      logger.warn(
        `403 - ${res.statusMessage} - ${errorMessage} - ${metadata} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    case 404:
      res.status(404).json(sendError(404, errorMessage));
      logger.warn(
        `404 - ${res.statusMessage} - ${errorMessage} - ${metadata} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
      break;
    default:
      res.status(500).json(sendError(500, 'Internal Server Error'));
      logger.error(
        `${err.status || 500} - ${
          res.statusMessage
        } - ${errorMessage} - ${metadata} - ${req.originalUrl} - ${
          req.method
        } - ${req.ip}`
      );
  }
}

module.exports = {
  errorHandler
};
