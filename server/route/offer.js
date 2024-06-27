const express = require("express");
const router = express.Router();
const webdofferController = require("../controller/websitedoffer");

router.post("/addwebdoffer", webdofferController.postaddOffer);
router.get("/getallwebdoffer", webdofferController.getallOffer);
router.post("/deletewebdoffer/:id", webdofferController.postdeleteOffer);
router.put("/updatedoffer/:ccid", webdofferController.updateOffer);

module.exports = router;
