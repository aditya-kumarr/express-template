import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf } = format;

const consoleLogFormat = format.combine(
  format.colorize(),
  format.printf((info) => {
    return `$${info.level}: ${info.message}`;
  })
);

export const logger = createLogger({
  level: "info",
  format: combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console({ format: consoleLogFormat }),
    new transports.File({
      filename: "logs/info.log",
      level: "info",
    }),
    new transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new transports.File({
      filename: "logs/warning.log",
      level: "warn",
    }),
  ],
});

export default logger;
