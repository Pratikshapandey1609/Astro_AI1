const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const { validate } = require("../middleware/validate.middleware");
const { signupSchema, loginSchema } = require("../validators/auth.validator");

/**
 * @openapi
 * /api/auth/signup:
 *   post:
 *     summary: Create a user account
 */
router.post("/signup", validate(signupSchema), authController.signup);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login and receive a JWT
 */
router.post("/login", validate(loginSchema), authController.login);

module.exports = router;
