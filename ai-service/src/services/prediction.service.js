const { env } = require("../config/env");
const { logger } = require("../config/logger");

const requiredKeys = ["personalityInsight", "careerPrediction", "lovePrediction", "compatibilityAdvice", "dailyGuidance"];

function fallbackPrediction(prompt) {
  const sign = prompt.match(/zodiacSign\s*["']?\s*:\s*["']?([A-Za-z]+)/i)?.[1] || "your sign";
  return {
    personalityInsight: `${sign} energy works best when confidence is paired with reflection.`,
    careerPrediction: "Choose one meaningful task and make steady progress before changing direction.",
    lovePrediction: "A clear, kind conversation can strengthen trust and reduce assumptions.",
    compatibilityAdvice: "Look for people who make room for your pace while inviting your growth.",
    dailyGuidance: "Set one intention, protect time for it, and let the rest of the day become simpler."
  };
}

function isValidPrediction(value) {
  return value && requiredKeys.every((key) => typeof value[key] === "string" && value[key].trim());
}

async function generateWithOpenAI(prompt) {
  if (!env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not configured");
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: env.OPENAI_MODEL,
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "Return safe, concise astrology-style guidance as JSON only." },
        { role: "user", content: prompt }
      ]
    })
  });
  if (!response.ok) throw new Error(`OpenAI request failed with ${response.status}`);
  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}

async function generatePrediction(prompt) {
  if (env.AI_PROVIDER === "mock") return fallbackPrediction(prompt);
  try {
    const prediction = await generateWithOpenAI(prompt);
    if (!isValidPrediction(prediction)) throw new Error("Provider returned incomplete JSON");
    return prediction;
  } catch (error) {
    logger.warn("AI provider failed; serving deterministic fallback", { message: error.message });
    return fallbackPrediction(prompt);
  }
}

function mockChatReply({ message, zodiacSign, mood }) {
  const normalizedMessage = message.toLowerCase();
  if (/(job|career|interview|work|promotion)/.test(normalizedMessage)) {
    return `${zodiacSign} ChartBot career note: prepare one concrete work sample, rehearse your introduction, and contact one person who can give useful feedback. Let your ${mood} mood support preparation, not rushed conclusions.`;
  }
  if (/(love|relationship|partner|marriage|dating)/.test(normalizedMessage)) {
    return `${zodiacSign} ChartBot relationship note: move from assumptions to one calm question. Share your intention clearly and give the conversation time to unfold.`;
  }
  return `${zodiacSign} ChartBot: choose one practical next step around your question, then reassess after you have acted rather than deciding everything at once.`;
}

async function generateChatReply({ message, zodiacSign = "your sign", moonSign, mood = "balanced" }) {
  if (env.AI_PROVIDER === "mock") return mockChatReply({ message, zodiacSign, mood });
  try {
    const prompt = `You are ChartBot, a concise, warm astrology companion. Give one thoughtful paragraph of non-deterministic guidance. Context: zodiac=${zodiacSign}; moon=${moonSign || "unknown"}; mood=${mood}; user message=${message}`;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: env.OPENAI_MODEL, temperature: 0.7, max_tokens: 220, messages: [{ role: "user", content: prompt }] })
    });
    if (!response.ok) throw new Error(`OpenAI chat failed with ${response.status}`);
    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    logger.warn("ChartBot provider failed; serving deterministic fallback", { message: error.message });
    return mockChatReply({ message, zodiacSign, mood });
  }
}

module.exports = { generatePrediction, generateChatReply };
