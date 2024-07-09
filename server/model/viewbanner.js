const mongoose = require("mongoose");

const webannerSchema = new mongoose.Schema(
  {
    ViewBanner: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

const webBannermodel = mongoose.model("viewdbanner", webannerSchema);
module.exports = webBannermodel;
