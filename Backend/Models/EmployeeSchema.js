const mongoose=require("mongoose");

const Employee=new mongoose.Schema(

    {

        HR:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'HR',
            required:true
           },

        Name:{
            type:String,
            required:true
        },
        
        image:{
            type:String,
            required:true
            
            
        },


        Job:{
            type:String,
            required:true

        },
        mobile:String,

        gender:String,

        email:{
            type:String,
            unique: true,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            default:null
        }



    }
);

module.exports=mongoose.model("Employeees",Employee)