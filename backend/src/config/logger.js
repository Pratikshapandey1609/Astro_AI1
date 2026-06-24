const path = require("path");
const winston = require("winston");
const { env } = require("./env");

const transports = [new winston.transports.Console()];

if (env.NODE_ENV === "production") {
  transports.push(new winston.transports.File({ filename: path.join("logs", "app.log") }));
}

const logger = winston.createLogger({
  level: env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports
});

module.exports = { logger };
