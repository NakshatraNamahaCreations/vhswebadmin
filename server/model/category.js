const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      // require:true
    },
    categoryImg: {
      type: String,
    },
    imglink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const categorymodel = mongoose.model("category", categorySchema);
module.exports = categorymodel;
