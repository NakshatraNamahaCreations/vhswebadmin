const express = require("express");
const router = express.Router();
const CertificateController = require("../controller/certificate");

router.post("/addcertificate", CertificateController.postaddCertificate);
router.get("/getallcertificate", CertificateController.getallCertificate);
router.post(
  "/deletecertificate/:id",
  CertificateController.postdeleteCertificate
);
router.put("/updatecertificate/:ccid", CertificateController.updateCertificate);

module.exports = router;
