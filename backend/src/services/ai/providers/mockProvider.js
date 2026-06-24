async function generateWithMock(prompt) {
  const contextMatch = prompt.match(/Context: (.*)$/m);
  const context = contextMatch ? JSON.parse(contextMatch[1]) : {};
  const sign = context.zodiacSign || "your sign";

  return {
    personalityInsight: `${sign} energy is strongest when confidence is paired with patience and self-awareness.`,
    careerPrediction: "A focused plan and one visible deliverable can create useful momentum today.",
    lovePrediction: "Honest communication is favored, especially when expectations are expressed gently.",
    compatibilityAdvice: "Look for people who respect your rhythm while encouraging your growth.",
    dailyGuidance: "Choose clarity over speed and make one decision that your future self will thank you for."
  };
}

module.exports = { generateWithMock };
