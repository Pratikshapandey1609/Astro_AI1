const router = require("express").Router();
const controller = require("../controllers/discovery.controller");
const { validate } = require("../middleware/validate.middleware");
const { astrologerQuerySchema, panchangQuerySchema, remedyParamSchema } = require("../validators/discovery.validator");

router.get("/astrologers", validate(astrologerQuerySchema), controller.listAstrologers);
router.get("/panchang/today", validate(panchangQuerySchema), controller.getPanchang);
router.get("/remedies/:sign", validate(remedyParamSchema), controller.getRemedies);

module.exports = router;
