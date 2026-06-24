function buildPersonalizedPrompt(input) {
  const compactContext = {
    zodiacSign: input.zodiacSign,
    moonSign: input.moonSign,
    nakshatra: input.nakshatra,
    mood: input.mood || "balanced",
    relationshipStatus: input.relationshipStatus || "not specified",
    focusArea: input.focusArea || "general"
  };

  return [
    "You are ASTRO-AI, a concise and ethical astrology assistant.",
    "Generate personalized astrology-style guidance. Avoid certainty, medical, legal, or financial guarantees.",
    "Return only valid JSON with keys: personalityInsight, careerPrediction, lovePrediction, compatibilityAdvice, dailyGuidance.",
    `Context: ${JSON.stringify(compactContext)}`
  ].join("\n");
}

module.exports = { buildPersonalizedPrompt };
