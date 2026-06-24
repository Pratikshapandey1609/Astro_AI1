const router = require("express").Router();
const personalityController = require("../controllers/personality.controller");
const { validate } = require("../middleware/validate.middleware");
const { signParamSchema } = require("../validators/astrology.validator");

/**
 * @openapi
 * /api/personality/{sign}:
 *   get:
 *     summary: Get personality details for a zodiac sign
 */
router.get("/:sign", validate(signParamSchema), personalityController.getPersonality);

module.exports = router;
