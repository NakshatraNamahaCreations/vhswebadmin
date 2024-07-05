const mongoose = require("mongoose");

const webannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

const webBannermodel = mongoose.model("popupbaner", webannerSchema);
module.exports = webBannermodel;
