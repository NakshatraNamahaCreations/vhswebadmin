const express = require("express");
const router = express.Router();
const HowItworksController = require("../controller/howItWorks");

router.post("/addhowitworks", HowItworksController.postaddHowItworks);
router.get("/getallhowitworks", HowItworksController.getallHowItworks);
router.post("/deletehowitworks/:id", HowItworksController.postdeleteHowItworks);
router.put("/updatehowitworks/:ccid", HowItworksController.updateHowItworks);

module.exports = router;
