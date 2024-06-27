const mongoose = require("mongoose");

const NumbersSchema = new mongoose.Schema({
  numbersCategory: {
    type: String,
  },
  whatsappNumber: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  city: {
    type: String,
  },
});

const vendorNumberModel = mongoose.model("vendorNumber", NumbersSchema);
module.exports = vendorNumberModel;