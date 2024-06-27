const mongoose = require("mongoose");

const webannerSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  creationslink: {
    type: String,
  },
});

const webBannermodel = mongoose.model("creation", webannerSchema);
module.exports = webBannermodel;
