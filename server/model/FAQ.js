const mongoose = require("mongoose");

const webannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    title: {
      type: String,
    },

    category: {
      type: String,
    },
    discription: {
      type: String,
    },
  },
  { timestamps: true }
);

const webBannermodel = mongoose.model("faq", webannerSchema);
module.exports = webBannermodel;
