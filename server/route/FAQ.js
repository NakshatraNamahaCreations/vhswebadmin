const express = require("express");
const router = express.Router();
const FAQController = require("../controller/FAQ");

router.post("/addvhsfaq", FAQController.postaddFAQ);
router.get("/getallvhsfaq", FAQController.getallFAQ);
router.post("/deletevhsfaq/:id", FAQController.postdeleteFAQ);
router.put("/updatevhsfaq/:ccid", FAQController.updateFAQ);

module.exports = router;
