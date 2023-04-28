const express = require("express");
const router = express.Router();
const userRoutes = require("./user.js");
const saucesRoutes = require("./sauces.js");

router.use("/auth", userRoutes);
router.use("/sauces", saucesRoutes);

module.exports = router;
