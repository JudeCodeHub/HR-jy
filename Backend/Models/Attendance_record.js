
const mongoose=require('mongoose')

const Attendance_record=new mongoose.Schema(
    {


        AttendanceID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Attendences',
            required:true
            
        },
        
        Date:{

            type:Date,
            default:null
        },

    

        Checkin:{
            type:String,
            required:true,
            default:null
        },
        
        Checkout:{
            type:String,
            default:null


        },

        status:{
            type:String,
            enum:['present','absent'],
            required:true
        }




    

    }

  
   


)

module.exports=mongoose.model("Attendance_record",Attendance_record)