const router = require("express").Router();

router.use("/auth", require("./auth.routes"));
router.use("/profile", require("./profile.routes"));
router.use("/astrology", require("./astrology.routes"));
router.use("/horoscope", require("./horoscope.routes"));
router.use("/personality", require("./personality.routes"));
router.use("/compatibility", require("./compatibility.routes"));
router.use("/blogs", require("./blog.routes"));
router.use("/discovery", require("./discovery.routes"));
router.use("/chartbot", require("./chartbot.routes"));
router.use("/user", require("./user.routes"));
router.use("/admin", require("./admin.routes"));
router.use("/rashi", require("./rashi.routes"));

module.exports = router;
