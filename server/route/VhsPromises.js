const express = require("express");
const router = express.Router();
const VHSPromisesController = require("../controller/vhspromise");

router.post("/addvhspromise", VHSPromisesController.postaddVHSPromises);
router.get("/getallvhspromise", VHSPromisesController.getallVHSPromises);
router.post(
  "/deletevhspromise/:id",
  VHSPromisesController.postdeleteVHSPromises
);
router.put("/updatevhspromise/:ccid", VHSPromisesController.updateVHSPromises);

module.exports = router;
