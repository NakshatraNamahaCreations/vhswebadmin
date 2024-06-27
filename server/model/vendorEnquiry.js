const mongoose = require("mongoose");

const VendoreNQUIRYsCHEMA = new mongoose.Schema(
  {
    
    EnquiryId: {
      
      type: Number,
      default: 0,
    },
    date: {
      
      type: String,
    },
    Time: {
      type: String,
    },
    executive: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    mobile: {
      type: String,
      require: true,
    },
    contact2: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    reference1: {
      type: String,
    },
    reference2: {
      type: String,
    },
    reference3: {
      type: String,
    },
    comment: {
      type: String,
      require: true,
    },
   
    comment: {
      type: String,
    },
    folldate: {
      type: String,
    },
    staffname: {
      type: String,
    },
    response: {
      type: String,
    },
    desc: {
      type: String,
    },
    type: {
        type: String,
      },
    
  },
  {
    timestamps: true,
  }
);

const VendorEnquiryModel = mongoose.model("Vendorenquiry", VendoreNQUIRYsCHEMA);
module.exports = VendorEnquiryModel;
