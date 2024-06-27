const mongoose=require("mongoose");

const walletDescSchema=new mongoose.Schema({
    Discount:{
        type:String
    },
   
});

const walletDescmodel=mongoose.model("walletDesc",walletDescSchema);
module.exports=walletDescmodel;