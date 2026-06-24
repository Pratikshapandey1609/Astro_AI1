const router = require("express").Router();
const blogController = require("../controllers/blog.controller");
const { validate } = require("../middleware/validate.middleware");
const { blogQuerySchema } = require("../validators/astrology.validator");

/**
 * @openapi
 * /api/blogs/{sign}:
 *   get:
 *     summary: Get paginated articles for a zodiac sign
 */
router.get("/:sign", validate(blogQuerySchema), blogController.getBlogsBySign);

module.exports = router;
