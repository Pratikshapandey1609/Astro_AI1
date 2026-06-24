const { app } = require("./app");
const { connectDB } = require("./config/db");
const { env } = require("./config/env");
const { logger } = require("./config/logger");

async function bootstrap() {
  await connectDB();

  app.listen(env.PORT, () => {
    logger.info(`ASTRO-AI API running on port ${env.PORT}`);
  });
}

bootstrap().catch((error) => {
  logger.error("Failed to start API", { error: error.message, stack: error.stack });
  process.exit(1);
});
