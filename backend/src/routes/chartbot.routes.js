const router = require("express").Router();
const { aiLimiter } = require("../middleware/rateLimit.middleware");
const { validate } = require("../middleware/validate.middleware");
const { chartbotSchema } = require("../validators/discovery.validator");
const controller = require("../controllers/chartbot.controller");

router.post("/message", aiLimiter, validate(chartbotSchema), controller.sendMessage);

module.exports = router;
