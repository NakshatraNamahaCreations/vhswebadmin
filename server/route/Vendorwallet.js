const express = require("express");
const router = express.Router();
const VendorwalletController = require("../controller/Vendorwallet");





router.post("/RechargeVendorWalletAmount",VendorwalletController.AddVendorwalletamt);
router.get("/getVendorwalletDetails", VendorwalletController.getVendorwalletData);
router.get("/VendorwalletHistorybyid/:id", VendorwalletController.findwithuserId);




module.exports = router;