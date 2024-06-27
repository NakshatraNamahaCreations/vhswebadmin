const express = require("express");
const router = express.Router();
const webWhyChoose = require("../controller/whychoose");

router.post("/addwhychoose", webWhyChoose.postaddWhyChoose);
router.get("/getallwhychoose", webWhyChoose.getallWhyChoose);
router.post("/deletewhychoose/:id", webWhyChoose.postdeleteWhyChoose);
router.put("/updatewhychoose/:ccid", webWhyChoose.updateWhyChoose);

module.exports = router;
