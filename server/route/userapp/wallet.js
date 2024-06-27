const express = require("express");
const router = express.Router();
const walletController = require("../../controller/userapp/wallet");





router.post("/RechargeWalletAmount",walletController.AddWalletamt);
router.get("/getwalletDetails", walletController.getwalletData);
router.get("/walletHistorybyid/:id", walletController.findwithuserId);




module.exports = router;