const mongoose=require("mongoose");


const Attendence=new mongoose.Schema(
    {
       employee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employeees',
        required:true
       },

       WorkingDays:{
        type:Number,
        required:true
       },

       AllowedLeaves:{
        type:Number,
        required:true

       }
    }




);

module.exports=mongoose.model("Attendence",Attendence)