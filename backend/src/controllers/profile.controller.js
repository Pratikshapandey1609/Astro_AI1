const profileService = require("../services/profile.service");
const { asyncHandler } = require("../utils/asyncHandler");

const createOrUpdateProfile = asyncHandler(async (req, res) => {
  const profile = await profileService.upsertProfile(req.user._id, req.validated.body);
  res.status(201).json({ profile });
});

module.exports = { createOrUpdateProfile };
