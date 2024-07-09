const express = require("express");
const router = express.Router();
const ViewDetailsBannerController = require("../controller/offernumbanner");

router.post(
  "/addoffernumbanner",
  ViewDetailsBannerController.postAddNewoffernumbanner
);

router.get(
  "/getalloffernumbanner",
  ViewDetailsBannerController.getalloffernumbanner
);
router.post(
  "/deleteoffernumbanner/:id",
  ViewDetailsBannerController.postdeleteoffernumbanner
);

// by hema
router.put(
  "/updateoffernumbanner/:ccid",
  ViewDetailsBannerController.updatebanner
);

module.exports = router;
