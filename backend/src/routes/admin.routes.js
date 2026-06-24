const router = require("express").Router();
const { requireAuth, requireRole } = require("../middleware/auth.middleware");
const { validate } = require("../middleware/validate.middleware");
const { createExpertSchema, updateExpertSchema } = require("../validators/admin.validator");
const controller = require("../controllers/admin.controller");

router.use(requireAuth, requireRole("admin"));
router.get("/dashboard", controller.getDashboard);
router.get("/astrologers", controller.listExperts);
router.post("/astrologers", validate(createExpertSchema), controller.createExpert);
router.patch("/astrologers/:id", validate(updateExpertSchema), controller.updateExpert);

module.exports = router;
