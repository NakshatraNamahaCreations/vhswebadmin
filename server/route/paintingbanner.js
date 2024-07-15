const express = require("express");
const router = express.Router();
const paintingbannerController = require("../controller/paintingbanner");



router.post(
  "/addwebpainbanner",
  paintingbannerController.postAddNewPaintingBanner
);

router.get(
  "/getallpaintingbanner",
  paintingbannerController.getallPaintingBanner
);
router.post(
  "/deletepaintingbanner/:id",
  paintingbannerController.postdeletePaintingBanner
);

// by hema
router.put("/updatebanner/:ccid", paintingbannerController.updatebanner);

module.exports = router;
