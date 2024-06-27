const express = require("express");
const router = express.Router();
const SpotlightSPController = require("../../controller/userapp/spotLightsSp");

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/spotlightSP");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addSpotlightSP",
  upload.single("img"),
  SpotlightSPController.postaddSpotlightSP
);
router.get("/getallSpotlightSP", SpotlightSPController.getallSpotlightSP);
router.post("/deleteSpotlightSP/:id", SpotlightSPController.postdeleteSpotlightSP);

module.exports = router;
