const TestimonialsModal = require("../model/testimonial");

class Testimonials {
  async postaddTestimonials(req, res) {
    let { title, review, videolink ,Testimonialname} = req.body;

    try {
      let newtestimonial = new TestimonialsModal({
        title,
        review,
        videolink,Testimonialname
      });

      let save = newtestimonial.save();

      if (save) {
        return res.json({ success: "testimonial added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateTestimonials(req, res) {
    try {
      const whyChooseId = req.params.ccid;
      const { title, review, videolink ,Testimonialname} = req.body;

      const findTestimonials = await TestimonialsModal.findOne({
        _id: whyChooseId,
      });
      if (!findTestimonials) {
        return res.json({ error: "No such record found" });
      }

      findTestimonials.title = title || findTestimonials.title;
      findTestimonials.review = review || findTestimonials.review;
      findTestimonials.videolink = videolink || findTestimonials.videolink;
      findTestimonials.Testimonialname = Testimonialname || findTestimonials.Testimonialname;
      
      const updateCategory = await TestimonialsModal.findOneAndUpdate(
        { _id: whyChooseId },
        findTestimonials,
        { new: true }
      );
      return res.json({
        message: "Updated successfully",
        date: updateCategory,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ error: "Unable to update the Category" });
    }
  }

  async getallTestimonials(req, res) {
    let testimonial = await TestimonialsModal.find({}).sort({ _id: -1 });

    if (testimonial) {
      return res.json({ data: testimonial });
    } else {
      return res.status(403).json({ error: "not able find banner" });
    }
  }

  async postdeleteTestimonials(req, res) {
    let id = req.params.id;
    const data = await TestimonialsModal.deleteOne({ _id: id });

    return res.json({ success: "Successfully", data: data });
  }
}

const TestimonialsController = new Testimonials();
module.exports = TestimonialsController;
