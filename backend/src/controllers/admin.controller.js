const User = require("../models/User.model");
const UserProfile = require("../models/UserProfile.model");
const HoroscopeHistory = require("../models/HoroscopeHistory.model");
const Astrologer = require("../models/Astrologer.model");
const { ApiError } = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");

const getDashboard = asyncHandler(async (_req, res) => {
  const [users, profiles, predictions, experts, onlineExperts] = await Promise.all([
    User.countDocuments({ role: "user" }),
    UserProfile.countDocuments(),
    HoroscopeHistory.countDocuments(),
    Astrologer.countDocuments(),
    Astrologer.countDocuments({ isOnline: true })
  ]);
  res.status(200).json({ users, profiles, predictions, experts, onlineExperts });
});

const listExperts = asyncHandler(async (_req, res) => {
  const items = await Astrologer.find().sort({ createdAt: -1 }).lean();
  res.status(200).json({ items });
});

const createExpert = asyncHandler(async (req, res) => {
  const expert = await Astrologer.create(req.validated.body);
  res.status(201).json({ expert });
});

const updateExpert = asyncHandler(async (req, res) => {
  const expert = await Astrologer.findByIdAndUpdate(req.validated.params.id, req.validated.body, { new: true, runValidators: true });
  if (!expert) throw new ApiError(404, "Astrologer not found");
  res.status(200).json({ expert });
});

module.exports = { getDashboard, listExperts, createExpert, updateExpert };
