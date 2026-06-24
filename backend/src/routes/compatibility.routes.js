const router = require("express").Router();
const astrologyController = require("../controllers/astrology.controller");
const { validate } = require("../middleware/validate.middleware");
const { compatibilityParamSchema } = require("../validators/astrology.validator");

/**
 * @openapi
 * /api/compatibility/{sign1}/{sign2}:
 *   get:
 *     summary: Get compatibility between two zodiac signs
 */
router.get("/:sign1/:sign2", validate(compatibilityParamSchema), astrologyController.getCompatibility);

module.exports = router;
