const express = require("express");
const router = express.Router();

const saucesCtrl = require("../controllers/sauces");
const likeCtrl = require("../controllers/like");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", auth, saucesCtrl.getAllSauces);
router.post("/", auth, multer, saucesCtrl.createSauce);
router.get("/:id", auth, saucesCtrl.getOneSauce);
router.put("/:id", auth, multer, saucesCtrl.modifySauce);
router.delete("/:id", auth, saucesCtrl.deleteSauce);
router.post("/:id/like", auth, likeCtrl.likeSauce);

module.exports = router;
