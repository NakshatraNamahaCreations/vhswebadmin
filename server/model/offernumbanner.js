const mongoose = require("mongoose");

const webannerSchema = new mongoose.Schema(
  {
    offerNumbanner: {
      type: String,
    },
  },
  { timestamps: true }
);

const webBannermodel = mongoose.model("offerannoucemnet", webannerSchema);
module.exports = webBannermodel;
