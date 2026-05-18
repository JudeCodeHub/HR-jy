const express=require("express");
const Router=express.Router();
const Payment=require("../Models/PaymentSchema")


Router.post("/",(req,res)=>{
    
    const PaymentData={employee,Basicsalary,Costofliving,Medicalallowance,Otherallowance}=req.body;
    const NewPayment=new Payment(PaymentData)

    NewPayment.save().then(()=>{
        res.status(200).json({message:"Payment Created"})
    })
    .catch((err)=>{res.status(500).json({message:"Error"})})

})

Router.get("/",(req,res)=>{
     Payment.find().then((Payments)=>{
        res.status(200).json(Payments)
    })
    .catch((err)=>{
        res.status(500).json({message:"internal server Error"})
    })

})

Router.get('/:employeeId', async (req, res) => {
    const employeeId = req.params.employeeId;

    try {
        const PaymentData = await Payment.find({ employee: employeeId });

        if (PaymentData && PaymentData.length > 0) {
            res.status(200).json(PaymentData);
        } else {
            res.status(404).json({ message: 'Payment data not found' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

Router.delete('/:id',async (req,res)=>{

    const {id}=req.params
 
    try{
       await Payment.findByIdAndDelete(id)
       res.status(200).json({message:"Payment Deleted"})
 
    }
    catch(err){
       res.status(500).json({message:"Error deleting employee"})
    }
 
    
   
 
 
 })
module.exports = Router;