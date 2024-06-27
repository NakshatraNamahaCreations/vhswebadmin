const express = require("express");
const router = express.Router();
const VenodrEnquirycontroller = require("../controller/vendorEnquiry");

router.post("/CreateVendorenquiry", VenodrEnquirycontroller.Addvendorenquiry);
router.put("/updateStatus/:id", VenodrEnquirycontroller.updatevendor);
router.get("/getVendorEnquiry", VenodrEnquirycontroller.getallvendorenquiry);



module.exports = router;
