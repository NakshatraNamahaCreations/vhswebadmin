const express = require("express");
const router = express.Router();
const webcreationController = require("../controller/thoughtfullcreation");

router.post("/addwebcreation", webcreationController.postaddcreations);
router.get("/getallwebcreation", webcreationController.getallcreations);
router.post(
  "/deletewebcreation/:id",
  webcreationController.postdeletecreations
);
router.put("/updatecreation/:ccid", webcreationController.updatecreation);

module.exports = router;
