const router = require("express").Router();
const trackerRoutes = require("./tracker");

// Book routes
router.use("/userData", trackerRoutes);

module.exports = router;
