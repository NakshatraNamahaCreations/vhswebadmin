const express=require("express");
const router=express.Router();
const walletDisccontroller=require("../../controller/userapp/walletDesc");

router.post("/addwalletDisc",walletDisccontroller.addwalletDisc);
router.get("/getwalletDisc",walletDisccontroller.getwalletDisc);
router.post("/deletewalletDisc/:id",walletDisccontroller.deletewalletDisc);
router.post("/editwalletDisc/:id",walletDisccontroller.editwalletDisc);

module.exports=router;

 