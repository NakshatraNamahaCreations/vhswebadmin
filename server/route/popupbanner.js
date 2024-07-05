const express = require("express");
const router = express.Router();
const PopUpBannerController = require("../controller/PopupBanner");

router.post("/addpopupbanner", PopUpBannerController.postaddPopUpBanner);
router.get("/getallpopupbanner", PopUpBannerController.getallPopUpBanner);
router.post("/deletepopupbanner/:id", PopUpBannerController.postdeletePopUpBanner);
router.put("/updatepopupbanner/:ccid", PopUpBannerController.updatePopUpBanner);

module.exports = router;
