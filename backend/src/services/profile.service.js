const UserProfile = require("../models/UserProfile.model");
const {
  calculateZodiacSign,
  calculateMoonSign,
  calculateNakshatra
} = require("../utils/astrology.util");

function calculateBirthChart(input) {
  return {
    zodiacSign: calculateZodiacSign(input.dob),
    moonSign: calculateMoonSign(input),
    nakshatra: calculateNakshatra(input)
  };
}

async function upsertProfile(userId, input) {
  const calculated = calculateBirthChart(input);
  const profile = await UserProfile.findOneAndUpdate(
    { userId },
    { ...input, ...calculated, userId },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );

  return profile;
}

module.exports = { calculateBirthChart, upsertProfile };
