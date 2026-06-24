const SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces"
];

const NAKSHATRAS = [
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashira",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshtha",
  "Mula",
  "Purva Ashadha",
  "Uttara Ashadha",
  "Shravana",
  "Dhanishta",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revati"
];

const COMPATIBILITY = {
  Aries: ["Leo", "Sagittarius", "Gemini", "Aquarius"],
  Taurus: ["Virgo", "Capricorn", "Cancer", "Pisces"],
  Gemini: ["Libra", "Aquarius", "Aries", "Leo"],
  Cancer: ["Scorpio", "Pisces", "Taurus", "Virgo"],
  Leo: ["Aries", "Sagittarius", "Gemini", "Libra"],
  Virgo: ["Taurus", "Capricorn", "Cancer", "Scorpio"],
  Libra: ["Gemini", "Aquarius", "Leo", "Sagittarius"],
  Scorpio: ["Cancer", "Pisces", "Virgo", "Capricorn"],
  Sagittarius: ["Aries", "Leo", "Libra", "Aquarius"],
  Capricorn: ["Taurus", "Virgo", "Scorpio", "Pisces"],
  Aquarius: ["Gemini", "Libra", "Aries", "Sagittarius"],
  Pisces: ["Cancer", "Scorpio", "Taurus", "Capricorn"]
};

function normalizeSign(sign) {
  const found = SIGNS.find((item) => item.toLowerCase() === String(sign).toLowerCase());
  return found || null;
}

function calculateZodiacSign(dob) {
  const birthDate = new Date(dob);
  const month = birthDate.getUTCMonth() + 1;
  const day = birthDate.getUTCDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  return "Pisces";
}

function deterministicIndex(input, modulo) {
  let hash = 0;
  for (const char of input) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return hash % modulo;
}

function calculateMoonSign({ dob, tob, pob }) {
  const key = `${dob}|${tob}|${pob}`.toLowerCase();
  return SIGNS[deterministicIndex(key, SIGNS.length)];
}

function calculateNakshatra({ dob, tob, pob }) {
  const key = `${pob}|${tob}|${dob}`.toLowerCase();
  return NAKSHATRAS[deterministicIndex(key, NAKSHATRAS.length)];
}

function calculateCompatibility(sign1, sign2) {
  const normalizedSign1 = normalizeSign(sign1);
  const normalizedSign2 = normalizeSign(sign2);

  if (!normalizedSign1 || !normalizedSign2) {
    return null;
  }

  if (normalizedSign1 === normalizedSign2) {
    return {
      score: 82,
      level: "High",
      summary: `${normalizedSign1} with ${normalizedSign2} creates strong familiarity, shared instincts, and clear emotional mirroring.`
    };
  }

  const isStrongMatch = COMPATIBILITY[normalizedSign1].includes(normalizedSign2);
  return {
    score: isStrongMatch ? 88 : 62,
    level: isStrongMatch ? "High" : "Moderate",
    summary: isStrongMatch
      ? `${normalizedSign1} and ${normalizedSign2} usually balance each other well across attraction, communication, and long-term rhythm.`
      : `${normalizedSign1} and ${normalizedSign2} can work well with patience, direct communication, and respect for different emotional styles.`
  };
}

module.exports = {
  SIGNS,
  normalizeSign,
  calculateZodiacSign,
  calculateMoonSign,
  calculateNakshatra,
  calculateCompatibility
};
