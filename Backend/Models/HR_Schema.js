const mongoose=require("mongoose");

const HR=new mongoose.Schema(
    {
        Name:{
            type:String,
            required:true
        },
      

        email:{
            type:String,
            required:true
        },

        password:{
            type:String,
            required:true
        },

        companyname:{
            type:String,
            required:true

        }

    

    }
);



module.exports=mongoose.model("HR",HR)