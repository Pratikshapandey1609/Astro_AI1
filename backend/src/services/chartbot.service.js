const { env } = require("../config/env");

function fallbackReply({ message, zodiacSign = "your sign", mood = "balanced" }) {
  const normalizedMessage = message.toLowerCase();
  if (/(job|career|interview|work|promotion)/.test(normalizedMessage)) {
    return `${zodiacSign} career guidance: use your ${mood} energy to prepare one visible proof of your work today. Update your resume or portfolio, practise a two-minute introduction, and reach out to one relevant person. This is preparation guidance, not a guarantee of a job date.`;
  }
  if (/(love|relationship|partner|marriage|dating)/.test(normalizedMessage)) {
    return `${zodiacSign} relationship guidance: choose one honest conversation over guessing. State what you need calmly, ask one open question, and leave room for the other person to respond.`;
  }
  if (/(health|stress|anxious|wellbeing|sleep)/.test(normalizedMessage)) {
    return `${zodiacSign} wellbeing guidance: keep today gentle and practical. Take a short screen break, hydrate, and choose one manageable task. For health concerns, use professional medical support rather than astrology alone.`;
  }
  return `${zodiacSign} ChartBot guidance: use your ${mood} energy for one clear next step. Name the smallest useful action, take it, and review the result after you act.`;
}

async function getChartbotReply(payload) {
  if (!env.AI_SERVICE_URL) return fallbackReply(payload);

  const response = await fetch(`${env.AI_SERVICE_URL.replace(/\/$/, "")}/v1/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(env.AI_SERVICE_API_KEY ? { "x-service-api-key": env.AI_SERVICE_API_KEY } : {})
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) return fallbackReply(payload);
  const data = await response.json();
  return data.reply || fallbackReply(payload);
}

module.exports = { getChartbotReply };
