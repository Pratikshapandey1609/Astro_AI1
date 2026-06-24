const mongoose = require("mongoose");

const dailyHoroscopeSchema = new mongoose.Schema(
  {
    sign: { type: String, required: true, index: true },
    date: { type: Date, required: true, index: true },
    generalPrediction: { type: String, required: true },
    lovePrediction: { type: String, required: true },
    careerPrediction: { type: String, required: true },
    financePrediction: { type: String, required: true },
    luckyColor: { type: String, required: true },
    luckyNumber: { type: Number, required: true, min: 1, max: 99 }
  },
  { timestamps: true }
);

dailyHoroscopeSchema.index({ sign: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("DailyHoroscope", dailyHoroscopeSchema);
