const mongoose = require("mongoose");

const webannerSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  title: {
    type: String,
  },
  discription: {
    type: String,
  },

 
});


const webBannermodel = mongoose.model("whychoose", webannerSchema);
module.exports = webBannermodel;
