
const mongoose = require("mongoose");

const wallertSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId
    },
    wAmt: {
      type: Number
    },
    desc: {
      type: String
    },
    sName: {
      type: String
    },
  }
  ,{ timestamps: true }


)

const walletModel = mongoose.model("Vendorwallet", wallertSchema);
module.exports = walletModel;


