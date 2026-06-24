const { asyncHandler } = require("../utils/asyncHandler");
const { getChartbotReply } = require("../services/chartbot.service");

const sendMessage = asyncHandler(async (req, res) => {
  const reply = await getChartbotReply(req.validated.body);
  res.status(200).json({ reply, createdAt: new Date().toISOString() });
});

module.exports = { sendMessage };
