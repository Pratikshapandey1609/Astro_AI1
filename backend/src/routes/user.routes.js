const router = require("express").Router();
const { requireAuth } = require("../middleware/auth.middleware");
const controller = require("../controllers/user.controller");

router.get("/me", requireAuth, controller.getMe);
router.get("/history", requireAuth, controller.getHistory);

module.exports = router;
