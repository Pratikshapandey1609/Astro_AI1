const SignInfo = require("../models/SignInfo.model");
const { signInfoSeed } = require("../constants/signInfo.seed");
const { ApiError } = require("../utils/ApiError");
const { normalizeSign, calculateCompatibility } = require("../utils/astrology.util");
const { getCache, setCache } = require("./cache.service");

async function getSignInfo(sign) {
  const normalizedSign = normalizeSign(sign);
  if (!normalizedSign) throw new ApiError(400, "Invalid zodiac sign");

  const cacheKey = `sign:${normalizedSign}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const dbInfo = await SignInfo.findOne({ signName: normalizedSign }).lean();
  const fallbackInfo = signInfoSeed.find((item) => item.signName === normalizedSign);
  const result = dbInfo || fallbackInfo;

  if (!result) throw new ApiError(404, "Sign information not found");
  return setCache(cacheKey, result, 60 * 60);
}

async function getCompatibility(sign1, sign2) {
  const compatibility = calculateCompatibility(sign1, sign2);
  if (!compatibility) throw new ApiError(400, "Invalid zodiac sign");

  return {
    sign1: normalizeSign(sign1),
    sign2: normalizeSign(sign2),
    ...compatibility
  };
}

module.exports = { getSignInfo, getCompatibility };
