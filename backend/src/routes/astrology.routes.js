const router = require("express").Router();
const astrologyController = require("../controllers/astrology.controller");
const { validate } = require("../middleware/validate.middleware");
const { calculateAstrologySchema } = require("../validators/astrology.validator");

/**
 * @openapi
 * /api/astrology/calculate:
 *   post:
 *     summary: Calculate zodiac sign, moon sign, and nakshatra from birth data
 */
router.post("/calculate", validate(calculateAstrologySchema), astrologyController.calculateAstrology);

module.exports = router;
