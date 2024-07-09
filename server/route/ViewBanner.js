const express = require("express");
const router = express.Router();
const ViewDetailsBannerController = require("../controller/ViewBanner");



router.post("/addviewbanner", ViewDetailsBannerController.postAddNewViewBanner);

router.get("/getallviewbanner", ViewDetailsBannerController.getallViewBanner);
router.post(
  "/deleteviewbanner/:id",
  ViewDetailsBannerController.postdeleteViewBanner
);

// by hema
router.put("/updateviewbanner/:ccid", ViewDetailsBannerController.updatebanner);

module.exports = router;
