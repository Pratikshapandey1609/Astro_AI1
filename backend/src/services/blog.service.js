const BlogArticle = require("../models/BlogArticle.model");
const { normalizeSign } = require("../utils/astrology.util");
const { ApiError } = require("../utils/ApiError");

async function getBlogsBySign(sign, { page = 1, limit = 10 }) {
  const normalizedSign = normalizeSign(sign);
  if (!normalizedSign) throw new ApiError(400, "Invalid zodiac sign");

  const safePage = Math.max(Number(page), 1);
  const safeLimit = Math.min(Math.max(Number(limit), 1), 50);
  const query = { sign: normalizedSign };

  const [items, total] = await Promise.all([
    BlogArticle.find(query)
      .sort({ createdAt: -1 })
      .skip((safePage - 1) * safeLimit)
      .limit(safeLimit)
      .lean(),
    BlogArticle.countDocuments(query)
  ]);

  return {
    items,
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      pages: Math.ceil(total / safeLimit)
    }
  };
}

module.exports = { getBlogsBySign };
