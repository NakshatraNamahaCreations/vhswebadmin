const mongoose = require("mongoose");

const webannerSchema = new mongoose.Schema(
  {
   
    question: {
      type: String,
    },

    category: {
      type: String,
    },
    answer: {
      type: String,
    },
  },
  { timestamps: true }
);

const webBannermodel = mongoose.model("faq", webannerSchema);
module.exports = webBannermodel;
