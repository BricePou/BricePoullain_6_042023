const express = require("experss");
const router = express.Router();
const userRoutes = require("./user.js");

router.use("/auth", userRoutes);

module.export = router;
