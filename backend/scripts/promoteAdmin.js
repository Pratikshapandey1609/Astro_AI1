const mongoose = require("mongoose");
const { env } = require("../src/config/env");
const User = require("../src/models/User.model");

const email = process.argv[2]?.trim().toLowerCase();

async function run() {
  if (!email) throw new Error("Usage: npm run admin:promote -- user@example.com");
  await mongoose.connect(env.MONGODB_URI);
  const user = await User.findOneAndUpdate({ email }, { role: "admin" }, { new: true });
  if (!user) throw new Error("User not found");
  console.log(`${user.email} is now an admin`);
  await mongoose.disconnect();
}

run().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect();
  process.exit(1);
});
