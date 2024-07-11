const mongoose = require("mongoose");

const webannerSchema = new mongoose.Schema(
  {
    banner: {
      type: String,
    },
  },
  { timestamps: true }
);

const webBannermodel = mongoose.model("paintingbanner", webannerSchema);
module.exports = webBannermodel;
