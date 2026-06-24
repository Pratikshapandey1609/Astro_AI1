const profileService = require("../services/profile.service");
const signService = require("../services/sign.service");
const { asyncHandler } = require("../utils/asyncHandler");

const calculateAstrology = asyncHandler(async (req, res) => {
  const result = profileService.calculateBirthChart(req.validated.body);
  res.status(200).json(result);
});

const getCompatibility = asyncHandler(async (req, res) => {
  const result = await signService.getCompatibility(req.validated.params.sign1, req.validated.params.sign2);
  res.status(200).json(result);
});

module.exports = { calculateAstrology, getCompatibility };
