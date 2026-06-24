const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { env } = require("../config/env");
const { ApiError } = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");

const requireAuth = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new ApiError(401, "Authentication token is required");
  }

  const payload = jwt.verify(token, env.JWT_SECRET);
  const user = await User.findById(payload.sub).select("_id name email role");
  if (!user) throw new ApiError(401, "User no longer exists");

  req.user = user;
  next();
});

function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ApiError(403, "You do not have permission to access this resource"));
    }
    return next();
  };
}

module.exports = { requireAuth, requireRole };
