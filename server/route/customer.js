const express = require("express");
const router = express.Router();
const customercontroller = require("../controller/customer");


router.get(
  "/getcustomerdatapagewise",
  customercontroller.getcustomerdatapagewise
);

router.get(
  "/gettotalcustomerlength",
  customercontroller.gettotalcustomerlength
);

router.get(
  "/getbywebsite",
  customercontroller.getcustomerdatabywebsite
);
module.exports = router;
