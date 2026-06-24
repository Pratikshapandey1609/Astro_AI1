const mongoose = require("mongoose");

const blogArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, index: "text" },
    content: { type: String, required: true },
    category: { type: String, required: true, index: true },
    sign: { type: String, required: true, index: true }
  },
  { timestamps: true }
);

blogArticleSchema.index({ sign: 1, createdAt: -1 });

module.exports = mongoose.model("BlogArticle", blogArticleSchema);
