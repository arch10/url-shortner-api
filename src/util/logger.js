const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
    format.align(),
    format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
  ),
  transports: [
    new DailyRotateFile({
      level: 'warn',
      utc: true,
      maxFiles: '15d',
      maxSize: '20m',
      dirname: 'log',
      filename: 'application-%DATE%.log'
    })
  ]
});

function initializeLogging() {
  if (process.env.NODE_ENV === 'development') {
    const consoleLogger = new transports.Console({ level: 'debug' });
    logger.add(consoleLogger);
  }
}

module.exports = {
  logger,
  initializeLogging
};
