const mongoose=require("mongoose");

const ReviewVideosSchema=new mongoose.Schema({
    Links:{
        type:String
    },
    Subcategory:{
        type:String
    }
});

const ReviewVideosmodel=mongoose.model("ReviewVideos",ReviewVideosSchema);
module.exports=ReviewVideosmodel;