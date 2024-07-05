const express = require("express");
const router = express.Router();
const ReviewController = require("../controller/Review");

router.post("/addvhsreview", ReviewController.postaddReview);
router.get("/getallvhsreview", ReviewController.getallReview);
router.post("/deletevhsreview/:id", ReviewController.postdeleteReview);
router.put("/updatevhsreview/:ccid", ReviewController.updateReview);

module.exports = router;
