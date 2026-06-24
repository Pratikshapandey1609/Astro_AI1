const horoscopeService = require("../services/horoscope.service");
const aiPredictionService = require("../services/ai/aiPrediction.service");
const { asyncHandler } = require("../utils/asyncHandler");

const getDailyHoroscope = asyncHandler(async (req, res) => {
  const horoscope = await horoscopeService.getDailyHoroscope(req.validated.params.sign);
  res.status(200).json({ horoscope });
});

const generatePersonalizedPrediction = asyncHandler(async (req, res) => {
  const prediction = await aiPredictionService.generatePersonalizedPrediction(req.validated.body);
  await horoscopeService.savePredictionHistory(req.user?._id, prediction);
  res.status(200).json({ prediction });
});

module.exports = { getDailyHoroscope, generatePersonalizedPrediction };
