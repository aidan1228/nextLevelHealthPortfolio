const router = require("express").Router();
const userDataRoutes = require("./userData");

// userData routes
console.log("userDataRoutes: ", userDataRoutes);
router.use("/userData", userDataRoutes);

module.exports = router;
