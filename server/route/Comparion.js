const express = require("express");
const router = express.Router();
const VHSComparison = require("../controller/Comparison");

router.post("/addvhscomparison", VHSComparison.postaddComparison);
router.get("/getallvhscomparison", VHSComparison.getallComparison);
router.post(
  "/deletevhscomparison/:id",
  VHSComparison.postdeleteComparison
);
router.put("/updatevhscomparison/:ccid", VHSComparison.updateComparison);

module.exports = router;



