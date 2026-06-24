const mongoose = require("mongoose");

const astrologerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    specialties: [{ type: String, required: true }],
    languages: [{ type: String, required: true }],
    rating: { type: Number, min: 0, max: 5, default: 4.8 },
    orders: { type: Number, default: 0 },
    experienceYears: { type: Number, min: 0, default: 1 },
    ratePerMinute: { type: Number, min: 0, default: 0 },
    availability: { type: String, enum: ["chat", "call", "both"], default: "both" },
    isOnline: { type: Boolean, default: true, index: true }
  },
  { timestamps: true }
);

astrologerSchema.index({ isOnline: 1, rating: -1 });

module.exports = mongoose.model("Astrologer", astrologerSchema);
