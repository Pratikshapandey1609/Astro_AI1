const { asyncHandler } = require("../utils/asyncHandler");
const { normalizeSign } = require("../utils/astrology.util");
const { ApiError } = require("../utils/ApiError");
const { getDailyHoroscope } = require("../services/horoscope.service");
const { getSignInfo } = require("../services/sign.service");
const { getRemedies, getPanchang } = require("../services/insight.service");

const getDashboard = asyncHandler(async (req, res) => {
  const rashi = normalizeSign(req.validated.params.sign);
  if (!rashi) throw new ApiError(400, "Invalid rashi");

  const [daily, personality, remedyData] = await Promise.all([
    getDailyHoroscope(rashi),
    getSignInfo(rashi),
    Promise.resolve(getRemedies(rashi))
  ]);

  res.status(200).json({
    rashi,
    daily,
    personality,
    remedies: remedyData.remedies,
    panchang: getPanchang(new Date(), req.validated.query.location),
    generatedAt: new Date().toISOString()
  });
});

module.exports = { getDashboard };
