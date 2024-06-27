const mongoose=require("mongoose");

const offerAnnouncementSchema=new mongoose.Schema({
    img:{
        type:String
    },
    type:{
        type:String
    }
});

const offerAnnouncementmodel=mongoose.model("offerAnnouncement",offerAnnouncementSchema);
module.exports=offerAnnouncementmodel;