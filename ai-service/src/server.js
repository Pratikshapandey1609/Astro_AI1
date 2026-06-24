const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { env } = require("./config/env");
const { logger } = require("./config/logger");
const { serviceAuth } = require("./middleware/serviceAuth");
const predictionRoutes = require("./routes/prediction.routes");

const app = express();

app.use(helmet());
app.use(express.json({ limit: "20kb" }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: env.RATE_LIMIT_MAX, standardHeaders: true, legacyHeaders: false }));
app.get("/health", (_req, res) => res.status(200).json({ status: "ok", service: "astro-ai-service" }));
app.use("/v1", serviceAuth, predictionRoutes);
app.use((error, _req, res, _next) => {
  logger.error("AI service request failed", { message: error.message });
  res.status(error.name === "ZodError" ? 400 : 500).json({ message: error.message || "AI service error" });
});

app.listen(env.PORT, () => logger.info(`ASTRO-AI service listening on ${env.PORT}`));
