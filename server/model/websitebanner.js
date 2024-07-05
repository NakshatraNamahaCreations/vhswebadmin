const mongoose = require("mongoose");

const webannerSchema = new mongoose.Schema({
  banner: {
    type: String,
  },
  category: {
    type: String,
  },
  webbanner: {
    type: String,
  },
},
{ timestamps: true });

const webBannermodel = mongoose.model("websitebanner", webannerSchema);
module.exports = webBannermodel;
