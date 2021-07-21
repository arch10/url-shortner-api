const express = require('express');
const mongoose = require('mongoose');

const { logger, sendError, initializeLogging } = require('./util');
const { errorHandler } = require('./middlewares');
const { redirectRouter, apiRouter } = require('./routes');

require('dotenv').config();

const app = express();

initializeLogging();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
const db = mongoose.connection;
db.on('error', e => logger.error(e.message));
db.once('open', () => {
  logger.info('Connected to DB');
});

//Add Middleware
app.use(express.json());

//Add URL context
const contextPath = process.env.CONTEXT_PATH || '/api/v1';

//Add Routes
app.use('/', redirectRouter);
app.use(`${contextPath}`, apiRouter);

// Capture errors
app.use(errorHandler);

// Capture Page not found
app.use((req, res) => {
  res.status(404).json(sendError(404, 'Page not found'));
  logger.info(
    `404 - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
});

const serverPort = process.env.PORT || 8080;
app.listen(serverPort, () => {
  logger.info(`Started server at port ${serverPort}`);
  logger.debug(`API context: ${contextPath}`);
});
