const { env } = require("../../../config/env");
const { ApiError } = require("../../../utils/ApiError");

async function generateWithOpenAI(prompt) {
  if (!env.OPENAI_API_KEY) {
    throw new ApiError(500, "OPENAI_API_KEY is not configured");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: env.OPENAI_MODEL,
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You produce concise JSON astrology guidance for a consumer app." },
        { role: "user", content: prompt }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new ApiError(response.status, "OpenAI generation failed", errorText);
  }

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}

module.exports = { generateWithOpenAI };
