const mongoose = require("mongoose");

const signInfoSchema = new mongoose.Schema(
  {
    signName: { type: String, required: true, unique: true, index: true },
    personality: { type: String, required: true },
    strengths: [{ type: String }],
    weaknesses: [{ type: String }],
    loveTraits: { type: String, required: true },
    careerTraits: { type: String, required: true },
    compatibility: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("SignInfo", signInfoSchema);
