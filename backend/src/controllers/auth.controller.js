const authService = require("../services/auth.service");
const { asyncHandler } = require("../utils/asyncHandler");

const signup = asyncHandler(async (req, res) => {
  const result = await authService.signup(req.validated.body);
  res.status(201).json(result);
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.validated.body);
  res.status(200).json(result);
});

module.exports = { signup, login };
