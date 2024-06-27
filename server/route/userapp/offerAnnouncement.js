const express = require("express");
const router = express.Router();
const offerAnnouncementController = require("../../controller/userapp/offerAnnouncement");

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/userofferAnnouncement");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addofferAnnouncement",
  upload.single("img"),
  offerAnnouncementController.postaddofferAnnouncement
);
router.get("/getallofferAnnouncement", offerAnnouncementController.getallofferAnnouncement);
router.post("/deleteofferAnnouncement/:id", offerAnnouncementController.postdeleteofferAnnouncement);

module.exports = router;
