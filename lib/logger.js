const winston = require('winston');
const expressWinston = require('express-winston');
const { errors, simple, combine, label, timestamp } = winston.format;

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    simple()
  ),
  transports: [
    // Write all logs with level `error` and below to `error.log`
    new winston.transports.File({ filename: 'error.log', level: 'error', format: combine(timestamp(), errors()) }),
    new winston.transports.Console()
  ],
});

const trafficLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({ format: combine(timestamp(), simple()) })
  ],
  expressFormat: true,
  // dynamicMeta: function(req, res) { return [Object]; } // Extract additional meta data from request or response (typically req.user data if using passport). meta must be true for this function to be activated?
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ]
});

module.exports = {
  logger,
  trafficLogger,
  errorLogger
}
