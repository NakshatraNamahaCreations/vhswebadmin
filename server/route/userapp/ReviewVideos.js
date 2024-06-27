const express = require("express");
const router = express.Router();
const ReviewVideosController = require("../../controller/userapp/ReviewVideos");


router.post(
  "/addReviewVideos",
  ReviewVideosController.postaddReviewVideos
);
router.get("/getallReviewVideos", ReviewVideosController.getallReviewVideos);
router.post("/deleteReviewVideos/:id", ReviewVideosController.postdeleteReviewVideos);

module.exports = router;
