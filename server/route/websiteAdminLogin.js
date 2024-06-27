const express=require("express");
const router=express.Router();

const adminlogincontroller =require("../controller/Websiteuser/Auth");

router.post("/webadminsignup",adminlogincontroller.signup);
router.post("/webadminsignin",adminlogincontroller.postSignin);

module.exports=router;
