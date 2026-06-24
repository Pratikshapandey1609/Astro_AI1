const DailyHoroscope = require("../models/DailyHoroscope.model");
const HoroscopeHistory = require("../models/HoroscopeHistory.model");
const { normalizeSign } = require("../utils/astrology.util");
const { ApiError } = require("../utils/ApiError");
const { getCache, setCache } = require("./cache.service");

const COLORS = ["Gold", "Blue", "Green", "White", "Red", "Silver", "Purple", "Orange"];

function startOfUtcDay(date = new Date()) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function buildFallbackDaily(sign, date) {
  const seed = date.toISOString().slice(0, 10).split("").reduce((sum, char) => sum + char.charCodeAt(0), sign.length);
  return {
    sign,
    date,
    generalPrediction: `${sign}, today rewards practical choices, calm communication, and a clear priority list.`,
    lovePrediction: "A gentle conversation can remove confusion and create warmer emotional ground.",
    careerPrediction: "Focus on one high-impact task before spreading energy across smaller work.",
    financePrediction: "Avoid impulse spending and review one recurring expense with fresh eyes.",
    luckyColor: COLORS[seed % COLORS.length],
    luckyNumber: (seed % 99) + 1
  };
}

async function getDailyHoroscope(sign, date = new Date()) {
  const normalizedSign = normalizeSign(sign);
  if (!normalizedSign) throw new ApiError(400, "Invalid zodiac sign");

  const day = startOfUtcDay(date);
  const cacheKey = `daily:${normalizedSign}:${day.toISOString()}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const horoscope = await DailyHoroscope.findOne({ sign: normalizedSign, date: day }).lean();
  return setCache(cacheKey, horoscope || buildFallbackDaily(normalizedSign, day), 60 * 60);
}

async function savePredictionHistory(userId, prediction) {
  if (!userId) return null;
  return HoroscopeHistory.create({ userId, prediction });
}

module.exports = { getDailyHoroscope, savePredictionHistory, startOfUtcDay };
