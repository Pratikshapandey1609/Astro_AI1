const { env } = require("../config/env");

function serviceAuth(req, res, next) {
  if (!env.SERVICE_API_KEY || req.get("x-service-api-key") === env.SERVICE_API_KEY) return next();
  return res.status(401).json({ message: "Invalid AI service key" });
}

module.exports = { serviceAuth };
