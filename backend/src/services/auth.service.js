const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { env } = require("../config/env");
const { ApiError } = require("../utils/ApiError");

function signToken(userId) {
  return jwt.sign({ sub: userId }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}

async function signup(payload) {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new ApiError(409, "Email is already registered");
  }

  const user = await User.create(payload);
  return {
    token: signToken(user._id),
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  };
}

async function login({ email, password }) {
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  return {
    token: signToken(user._id),
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  };
}

module.exports = { signup, login };
