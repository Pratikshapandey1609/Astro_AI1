const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const swaggerUi = require("swagger-ui-express");

const { env } = require("./config/env");
const { swaggerSpec } = require("./config/swagger");
const { apiLimiter } = require("./middleware/rateLimit.middleware");
const { errorHandler, notFoundHandler } = require("./middleware/error.middleware");
const routes = require("./routes");

const app = express();
const allowedOrigins = new Set([env.CLIENT_ORIGIN, "http://localhost:5173", "http://127.0.0.1:5173"]);

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) return callback(null, true);
      return callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true
  })
);
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(mongoSanitize());
app.use(apiLimiter);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "astro-ai-api" });
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", routes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = { app };
