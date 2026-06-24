const { env } = require("../../config/env");
const { logger } = require("../../config/logger");
const { ApiError } = require("../../utils/ApiError");
const { getCache, setCache } = require("../cache.service");
const { buildPersonalizedPrompt } = require("./promptBuilder.service");
const { generateWithMock } = require("./providers/mockProvider");
const { generateWithOpenAI } = require("./providers/openAiProvider");

const REQUIRED_KEYS = [
  "personalityInsight",
  "careerPrediction",
  "lovePrediction",
  "compatibilityAdvice",
  "dailyGuidance"
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function validatePredictionShape(prediction) {
  if (!prediction || typeof prediction !== "object") return false;
  return REQUIRED_KEYS.every((key) => typeof prediction[key] === "string" && prediction[key].trim().length > 0);
}

async function callProvider(prompt) {
  if (env.AI_SERVICE_URL) {
    const response = await fetch(`${env.AI_SERVICE_URL.replace(/\/$/, "")}/v1/predictions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(env.AI_SERVICE_API_KEY ? { "x-service-api-key": env.AI_SERVICE_API_KEY } : {})
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new ApiError(response.status, "AI service generation failed", await response.text());
    }

    const payload = await response.json();
    return payload.prediction;
  }

  if (env.AI_PROVIDER === "openai") return generateWithOpenAI(prompt);
  if (env.AI_PROVIDER === "gemini") throw new ApiError(501, "Gemini provider adapter is not implemented yet");
  if (env.AI_PROVIDER === "claude") throw new ApiError(501, "Claude provider adapter is not implemented yet");
  return generateWithMock(prompt);
}

async function generatePersonalizedPrediction(input) {
  const cacheKey = `ai:${JSON.stringify(input)}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const prompt = buildPersonalizedPrompt(input);
  let lastError;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const prediction = await callProvider(prompt);
      if (!validatePredictionShape(prediction)) {
        throw new ApiError(502, "AI provider returned an invalid prediction shape");
      }

      return setCache(cacheKey, prediction, 60 * 10);
    } catch (error) {
      lastError = error;
      logger.warn("AI prediction attempt failed", { attempt, message: error.message });
      if (attempt < 3) await sleep(250 * attempt);
    }
  }

  logger.error("AI prediction failed after retries", { message: lastError.message });
  const fallback = await generateWithMock(prompt);
  return setCache(cacheKey, fallback, 60 * 5);
}

module.exports = { generatePersonalizedPrediction };
