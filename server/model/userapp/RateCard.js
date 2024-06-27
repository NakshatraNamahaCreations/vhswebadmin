const mongoose = require("mongoose");

const RateCardSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      require: true,
    },
    desc: {
      type: Array,
    },
    header: {
      type: String,
    },
 
  },
  {
    timestamps: true,
  }
);

const RateCardmodel = mongoose.model("RateCard", RateCardSchema);
module.exports = RateCardmodel;
