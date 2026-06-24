const blogService = require("../services/blog.service");
const { asyncHandler } = require("../utils/asyncHandler");

const getBlogsBySign = asyncHandler(async (req, res) => {
  const result = await blogService.getBlogsBySign(req.validated.params.sign, req.validated.query);
  res.status(200).json(result);
});

module.exports = { getBlogsBySign };
