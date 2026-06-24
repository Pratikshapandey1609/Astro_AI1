const { normalizeSign } = require("../utils/astrology.util");
const { ApiError } = require("../utils/ApiError");

const remedies = {
  Aries: ["Finish one important task before noon.", "Use a warm red or coral accent for confidence."],
  Taurus: ["Choose comfort that supports focus, not delay.", "Keep a green detail near your workspace."],
  Gemini: ["Write down your top three thoughts before acting.", "Use a light yellow note for one clear priority."],
  Cancer: ["Protect a quiet pause before responding emotionally.", "A silver or white detail can support calm."],
  Leo: ["Share your work, then leave room for feedback.", "Gold is your confidence accent today."],
  Virgo: ["Improve one process instead of perfecting everything.", "Choose an earthy green for steadiness."],
  Libra: ["Make the small decision you have postponed.", "Soft pink can support a gentler conversation."],
  Scorpio: ["Name the boundary before the pressure builds.", "Deep maroon is a grounding accent."],
  Sagittarius: ["Turn one big idea into a short next step.", "Indigo supports thoughtful exploration."],
  Capricorn: ["Measure progress, then let yourself rest.", "Charcoal or slate can support discipline."],
  Aquarius: ["Share the unconventional idea with one trusted person.", "Electric blue adds inventive energy."],
  Pisces: ["Make one creative choice practical and visible.", "Sea green can support a balanced mood."]
};

function getPanchang(date = new Date(), location = "Your location") {
  const daySeed = date.getUTCDate() + date.getUTCMonth() * 3;
  const tithis = ["Shukla Panchami", "Shukla Shashthi", "Krishna Ashtami", "Shukla Ekadashi", "Krishna Trayodashi"];
  const nakshatras = ["Rohini", "Pushya", "Hasta", "Anuradha", "Shravana"];
  const muhuratStart = 9 + (daySeed % 3);
  return {
    date: date.toISOString().slice(0, 10),
    location,
    tithi: tithis[daySeed % tithis.length],
    nakshatra: nakshatras[daySeed % nakshatras.length],
    sunrise: "06:01",
    sunset: "18:42",
    rahuKalam: "13:30 - 15:00",
    shubhMuhurat: `${String(muhuratStart).padStart(2, "0")}:15 - ${String(muhuratStart + 1).padStart(2, "0")}:35`
  };
}

function getRemedies(sign) {
  const normalizedSign = normalizeSign(sign);
  if (!normalizedSign) throw new ApiError(400, "Invalid zodiac sign");
  return { sign: normalizedSign, remedies: remedies[normalizedSign] };
}

module.exports = { getPanchang, getRemedies };
