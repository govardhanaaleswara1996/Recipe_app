const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

module.exports = createLogger({
  transports:
    new transports.DailyRotateFile({
      filename: './logs/app-error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '1m',
      format: format.combine(
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        format.align(),
        format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`),
      ),
    }),
});
