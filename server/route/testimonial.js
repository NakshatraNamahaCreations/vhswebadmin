const express = require("express");
const router = express.Router();
const testimonialController = require("../controller/testimonials");

router.post("/addtestimonial", testimonialController.postaddTestimonials);
router.get("/getalltestimonial", testimonialController.getallTestimonials);
router.post("/deletetestimonial/:id", testimonialController.postdeleteTestimonials);
router.put("/updatedtestimonial/:ccid", testimonialController.updateTestimonials);

module.exports = router;
