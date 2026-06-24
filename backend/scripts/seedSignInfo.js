const mongoose = require("mongoose");
const { env } = require("../src/config/env");
const { logger } = require("../src/config/logger");
const SignInfo = require("../src/models/SignInfo.model");
const { signInfoSeed } = require("../src/constants/signInfo.seed");

async function run() {
  await mongoose.connect(env.MONGODB_URI);
  await SignInfo.bulkWrite(
    signInfoSeed.map((sign) => ({
      updateOne: {
        filter: { signName: sign.signName },
        update: { $set: sign },
        upsert: true
      }
    }))
  );
  logger.info("SignInfo seed completed");
  await mongoose.disconnect();
}

run().catch(async (error) => {
  logger.error("SignInfo seed failed", { error: error.message });
  await mongoose.disconnect();
  process.exit(1);
});
