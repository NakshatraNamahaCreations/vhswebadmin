const express=require("express");
const router=express.Router();
const trainingCentercontroller=require("../../controller/userapp/training");
const multer=require("multer");
 
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/trainingCenter");
    },
    filename: function (req, file, cb) {
		cb(null, Date.now() + "_" + file.originalname);
	},
});
const  upload =multer({storage:storage});

router.post("/addtrainingCenter",upload.single("trainingVideo"),trainingCentercontroller.addtrainingCenter);
router.get("/gettrainingCenter",trainingCentercontroller.gettrainingCenter);
router.post("/posttrainingCenter",trainingCentercontroller.posttrainingCenter);
router.post("/deletetrainingCenter/:id",trainingCentercontroller.deletetrainingCenter);
router.post("/edittrainingCenter/:id",upload.any(),trainingCentercontroller.edittrainingCenter);

module.exports=router;

 