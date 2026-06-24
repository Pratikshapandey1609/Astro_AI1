const router = require("express").Router();
const { validate } = require("../middleware/validate.middleware");
const { rashiDashboardSchema } = require("../validators/discovery.validator");
const controller = require("../controllers/rashi.controller");

router.get("/:sign/dashboard", validate(rashiDashboardSchema), controller.getDashboard);

module.exports = router;
