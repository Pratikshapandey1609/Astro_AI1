const signService = require("../services/sign.service");
const { asyncHandler } = require("../utils/asyncHandler");

const getPersonality = asyncHandler(async (req, res) => {
  const signInfo = await signService.getSignInfo(req.validated.params.sign);
  res.status(200).json({ signInfo });
});

module.exports = { getPersonality };
