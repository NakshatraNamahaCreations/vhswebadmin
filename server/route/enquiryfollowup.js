const express = require("express");
const router = express.Router();
const enquiryfollowupcontroller = require("../controller/enquiryfollowup");




router.post("/getsurveyaggredata", enquiryfollowupcontroller.getallagreedata);


module.exports = router;
