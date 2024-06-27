const mongoose = require("mongoose");

const serviceVideoModal = new mongoose.Schema(
    {
        categoryName: {
            type: String,
        },
        serviceName: {
            type: String,
        },
        serviceVideo: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const serviceVideo = mongoose.model("servicevideo", serviceVideoModal);
module.exports = serviceVideo;
