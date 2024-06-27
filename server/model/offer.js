const mongoose = require("mongoose");

const webannerSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  offer: {
    type: String,
  },
});

const webBannermodel = mongoose.model("weboffer", webannerSchema);
module.exports = webBannermodel;
