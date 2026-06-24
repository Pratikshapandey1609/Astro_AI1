const { asyncHandler } = require("../utils/asyncHandler");
const astrologerService = require("../services/astrologer.service");
const insightService = require("../services/insight.service");

const listAstrologers = asyncHandler(async (req, res) => {
  const items = await astrologerService.listAstrologers(req.validated.query);
  res.status(200).json({ items });
});

const getPanchang = asyncHandler(async (req, res) => {
  res.status(200).json({ panchang: insightService.getPanchang(new Date(), req.validated.query.location) });
});

const getRemedies = asyncHandler(async (req, res) => {
  res.status(200).json(insightService.getRemedies(req.validated.params.sign));
});

module.exports = { listAstrologers, getPanchang, getRemedies };
