const express=require("express");
const router=express.Router();
const ServiceVideoController=require("../../controller/userapp/sVideo");
const multer=require("multer");
 
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/sVideo");
    },
    filename: function (req, file, cb) {
		cb(null, Date.now() + "_" + file.originalname);
	},
});
const upload = multer({ 
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB (adjust as needed)
    },
  });
router.post("/addservicevideo",upload.single("serviceVideo"),ServiceVideoController.addServiceVideo);
router.get("/getservicevideo",ServiceVideoController.getServiceVideo);
router.post("/postservicevideo",ServiceVideoController.postServiceVideo);
router.post("/deleteservicevideo/:id",ServiceVideoController.deleteServiceVideo);
router.post("/editservicevideo/:id",upload.any(),ServiceVideoController.editServiceVideo);

module.exports=router;

 