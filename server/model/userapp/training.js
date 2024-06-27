const mongoose = require("mongoose");

const trainingCenterSchema = new mongoose.Schema(
  {
    category: {
      type: String,
    },
    header: {
      type: String,
    },
    desc: {
      type: String,
    },
    trainingVideo: {
      type: String,
    },
    videolink: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const trainingCenterModel = mongoose.model("trainingCenter", trainingCenterSchema);
module.exports = trainingCenterModel;
