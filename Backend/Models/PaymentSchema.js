const mongoose=require("mongoose");


const Payment=new mongoose.Schema(
    {
       employee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employeees',
        required:true
       },

       Basicsalary:{
        type:Number,
        required:true
       },

       Costofliving:{
        type:Number,
        required:true

       },

       Foodallowance:{
        type:Number,
        required:true

       },
       Medicalallowance:{
        type:Number,
        required:true

       },
       Otherallowance:{
        type:Number,
        required:true

       }
       



    }




);

module.exports=mongoose.model("Payment",Payment)