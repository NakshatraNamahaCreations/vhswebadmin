const mongoose = require("mongoose");

const webannerSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  offer: {
    type: String,
  },
},
{ timestamps: true });

const webBannermodel = mongoose.model("weboffer", webannerSchema);
module.exports = webBannermodel;
