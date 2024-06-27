const express = require("express");
const router = express.Router();
const vendornumbersController = require("../controller/vendorNumber");

router.post("/addvendorNumbers", vendornumbersController.addvendorNumbers);
router.get("/getwhatsvendorNumbers", vendornumbersController.getAllvendorNumbers);
router.put("/updateWhatsAppvendorNumber/:id", vendornumbersController.updatevendorNumbers);
router.delete("/deletevendornumbers/:id", vendornumbersController.deletevendorNumbers);

module.exports = router;