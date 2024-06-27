const express = require("express");
const router = express.Router();
const RateCardController = require("../../controller/userapp/RateCard");





router.post("/addRateCard",RateCardController.addRateCard);
router.get("/getRateCard", RateCardController.getRateCard);
router.post("/deleteRateCard/:id", RateCardController.postdeleteRateCard);


module.exports = router;