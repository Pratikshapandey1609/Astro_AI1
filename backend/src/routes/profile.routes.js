const router = require("express").Router();
const profileController = require("../controllers/profile.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const { validate } = require("../middleware/validate.middleware");
const { profileSchema } = require("../validators/profile.validator");

/**
 * @openapi
 * /api/profile:
 *   post:
 *     summary: Create or update the authenticated user's astrology profile
 *     security:
 *       - bearerAuth: []
 */
router.post("/", requireAuth, validate(profileSchema), profileController.createOrUpdateProfile);

module.exports = router;
