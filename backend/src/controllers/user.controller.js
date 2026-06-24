const UserProfile = require("../models/UserProfile.model");
const HoroscopeHistory = require("../models/HoroscopeHistory.model");
const { asyncHandler } = require("../utils/asyncHandler");

const getMe = asyncHandler(async (req, res) => {
  const profile = await UserProfile.findOne({ userId: req.user._id }).lean();
  res.status(200).json({ user: req.user, profile });
});

const getHistory = asyncHandler(async (req, res) => {
  const items = await HoroscopeHistory.find({ userId: req.user._id }).sort({ createdAt: -1 }).limit(30).lean();
  res.status(200).json({ items });
});

module.exports = { getMe, getHistory };
