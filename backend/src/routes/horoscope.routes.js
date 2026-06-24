const router = require("express").Router();
const horoscopeController = require("../controllers/horoscope.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const { aiLimiter } = require("../middleware/rateLimit.middleware");
const { validate } = require("../middleware/validate.middleware");
const { signParamSchema, personalizedPredictionSchema } = require("../validators/astrology.validator");

/**
 * @openapi
 * /api/horoscope/daily/{sign}:
 *   get:
 *     summary: Get today's daily horoscope for a sign
 */
router.get("/daily/:sign", validate(signParamSchema), horoscopeController.getDailyHoroscope);

/**
 * @openapi
 * /api/horoscope/personalized:
 *   post:
 *     summary: Generate authenticated AI-enhanced personalized prediction
 *     security:
 *       - bearerAuth: []
 */
router.post(
  "/personalized",
  requireAuth,
  aiLimiter,
  validate(personalizedPredictionSchema),
  horoscopeController.generatePersonalizedPrediction
);

module.exports = router;
