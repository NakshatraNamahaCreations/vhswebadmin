const mongoose=require("mongoose");

const SpotlightSPSchema=new mongoose.Schema({
    img:{
        type:String
    },
    service:{
        type:String
    }
});

const SpotlightSPmodel=mongoose.model("SpotlightSP",SpotlightSPSchema);
module.exports=SpotlightSPmodel;