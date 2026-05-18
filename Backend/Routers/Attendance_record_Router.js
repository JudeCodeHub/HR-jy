const express=require('express');
const Attendance_record = require('../Models/Attendance_record');
const router=express.Router();




router.post('/',async (req,res)=>{

    const  {AttendanceID,Checkin,status,Date}=req.body;
    
    try {
        const existingRecord = await Attendance_record.findOne({ Date, AttendanceID });
        if (existingRecord) {
            return res.status(400).json({ message: "Attendance already marked for this date" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Error checking existing record", err });
    }

    const AttendanceRecord=new Attendance_record({AttendanceID,Checkin,status,Date});
     AttendanceRecord.save().then((Atten)=>{
        res.status(200).json({message:"Attendence Marked",id:Atten._id})
    })
    .catch((err)=>{res.status(500).json({message:"Error",err})})
})




router.post("/:id", async (req, res) => {
  const { Checkout } = req.body;
  const{id}=req.params
 
  try {

    const  existingRecord= await Attendance_record.findOne({_id:id})
    const existingRecord2=await Attendance_record.findOne({_id:id,Checkout:null})
    console.log(existingRecord2)

   if(existingRecord){

    if(existingRecord2){
      await Attendance_record.updateOne(
        { _id: id},
        {
          $set: {
            Checkout:Checkout
          },
        }
      );
      return res.send({status:"Ok",message:`You checkout at ${Checkout}`}
      )
   
    }

    else{
      res.send({message:"You Already Checkout"})

    }   
   }
   else{
    console.log("byr")
    return res.send({message:"Oops!Please Checkin"})
   
   
   
    }} catch (error) {
     console.log(error)
    return res.send({ error: error });
  }
});





router.get('/workingdays/:AttendanceId', async (req, res) => {

  const {startDate,endDate}=req.query;

    try {
      const AttendanceId = req.params.AttendanceId;

        const record = await Attendance_record.find({ 
          AttendanceID: AttendanceId, 
          status: 'present',
          Date:{$gte:new Date(startDate),$lte:new Date(endDate)} });
       
        const Totalpresent=record.length

        function timeTohrs(timeStr) {
          let [hours, minutes, seconds] = timeStr.split(":").map(Number);  // Split and convert to numbers
          return (hours) + (minutes/60) + seconds/3600;  // Convert to total seconds
      }

       
        
         
        //Working Hours
        let totalhrs=0
        let workinghrs
        
        for(let i=0;i<record.length;i++){
          let checkinTime = timeTohrs(record[i].Checkin)
          if (record[i].Checkout==null){
            workinghrs=0
          }
          else{
            let checkoutTime = timeTohrs(record[i].Checkout)
            let checkinTime = timeTohrs(record[i].Checkin)

            workinghrs=checkoutTime-checkinTime

          }
      
           totalhrs=totalhrs+workinghrs
        }
      //  console.log(totalhrs)
        //console.log(Totalpresent); 

      res.status(200).json({totalhrs,Totalpresent});

    } catch (err) {
      res.status(500).json({ message: "Error retriving total counts", error: err });
    }
  });
  
  

  module.exports=router