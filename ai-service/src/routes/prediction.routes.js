const router = require("express").Router();
const { z } = require("zod");
const { generatePrediction, generateChatReply } = require("../services/prediction.service");

const requestSchema = z.object({ prompt: z.string().min(20).max(8000) });

router.post("/predictions", async (req, res, next) => {
  try {
    const { prompt } = requestSchema.parse(req.body);
    const prediction = await generatePrediction(prompt);
    res.status(200).json({ prediction, provider: process.env.AI_PROVIDER || "mock" });
  } catch (error) {
    next(error);
  }
});

router.post("/chat", async (req, res, next) => {
  try {
    const payload = z.object({
      message: z.string().trim().min(2).max(500),
      zodiacSign: z.string().min(2).max(20).optional(),
      moonSign: z.string().min(2).max(20).optional(),
      mood: z.string().min(2).max(40).optional()
    }).parse(req.body);
    const reply = await generateChatReply(payload);
    res.status(200).json({ reply, provider: process.env.AI_PROVIDER || "mock" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
