const { ApiError } = require("../utils/ApiError");
const { logger } = require("../config/logger");
const { env } = require("../config/env");

function notFoundHandler(req, _res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || 500;
  const payload = {
    message: error.message || "Internal server error"
  };

  if (error.details) payload.details = error.details;
  if (env.NODE_ENV !== "production") payload.stack = error.stack;

  logger.error(payload.message, {
    statusCode,
    details: error.details,
    stack: error.stack
  });

  res.status(statusCode).json(payload);
}

module.exports = { notFoundHandler, errorHandler };
