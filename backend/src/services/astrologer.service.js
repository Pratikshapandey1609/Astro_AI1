const Astrologer = require("../models/Astrologer.model");

const fallbackAstrologers = [
  { name: "Anaya Sharma", specialties: ["Vedic", "Tarot"], languages: ["Hindi", "English"], rating: 4.96, orders: 18000, experienceYears: 12, ratePerMinute: 42, availability: "chat", isOnline: true },
  { name: "Ritvik Rao", specialties: ["Kundli", "Career"], languages: ["English", "Telugu"], rating: 4.91, orders: 12000, experienceYears: 9, ratePerMinute: 35, availability: "call", isOnline: true },
  { name: "Meera Iyer", specialties: ["Love", "Numerology"], languages: ["Tamil", "English"], rating: 4.98, orders: 21000, experienceYears: 15, ratePerMinute: 55, availability: "chat", isOnline: true },
  { name: "Dev Malhotra", specialties: ["Vastu", "Finance"], languages: ["Hindi", "Punjabi"], rating: 4.89, orders: 9000, experienceYears: 8, ratePerMinute: 31, availability: "call", isOnline: true }
];

function filterExperts(items, { specialty, availability }) {
  return items.filter((item) => {
    const specialtyMatch = !specialty || item.specialties.some((value) => value.toLowerCase() === specialty.toLowerCase());
    const availabilityMatch = !availability || item.availability === availability || item.availability === "both";
    return specialtyMatch && availabilityMatch;
  });
}

async function listAstrologers(filters) {
  const query = { isOnline: true };
  if (filters.specialty) query.specialties = new RegExp(`^${filters.specialty}$`, "i");
  if (filters.availability) query.availability = { $in: [filters.availability, "both"] };

  const experts = await Astrologer.find(query).sort({ rating: -1, orders: -1 }).limit(40).lean();
  return experts.length ? experts : filterExperts(fallbackAstrologers, filters);
}

module.exports = { listAstrologers };
