const express=require("express");
const Router=express.Router();
const Attendence=require("../Models/AttendenceSchema")


Router.post("/",(req,res)=>{
    
    const{employee,WorkingDays,AllowedLeaves}=req.body;
    const NewAttendence=new Attendence({employee,WorkingDays,AllowedLeaves})

    NewAttendence.save().then(()=>{
        res.status(200).json({message:"Attendence Created"})
    })
    .catch((err)=>{res.status(500).json({message:"Error"})})

})

Router.get("/",(req,res)=>{
    Attendence.find().then((Attendences)=>{
        res.status(200).json(Attendences)
    })
    .catch((err)=>{
        res.status(500).json({message:"internal server Error"})
    })

})

Router.get('/:employeeId', async (req, res) => {
    const employeeId = req.params.employeeId;

    try {
        const attendanceData = await Attendence.find({ employee: employeeId });

        if (attendanceData && attendanceData.length > 0) {
            res.status(200).json(attendanceData);
        } else {
            res.status(404).json({ message: 'Attendance data not found' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

Router.delete('/:id',async (req,res)=>{

    const{id}=req.params
 
    try{
       await Attendence.findByIdAndDelete(id)
       res.status(200).json({message:"Employee Deleted"})
 
    }
    catch(err){
       res.status(500).json({message:"Error deleting employee"})
    }
 
    
   
 
 
 })

module.exports = Router;