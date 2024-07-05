const mongoose = require("mongoose");

const webannerSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  review: {
    type: String,
  },
  videolink: {
    type: String,
  },
  Testimonialname:{
    type:String
  }
 
},
{ timestamps: true });

const webBannermodel = mongoose.model("testimonial", webannerSchema);
module.exports = webBannermodel;
