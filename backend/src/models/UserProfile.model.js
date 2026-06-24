const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
    dob: { type: Date, required: true },
    tob: { type: String, required: true },
    pob: { type: String, required: true, trim: true },
    zodiacSign: { type: String, required: true, index: true },
    moonSign: { type: String, required: true, index: true },
    nakshatra: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserProfile", userProfileSchema);
