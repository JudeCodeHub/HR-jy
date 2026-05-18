const express=require("express");
const Router=express.Router();

const Location = require("../Models/LocationSchema");


Router.post("/", async (req, res) => {
    const { HR, locationName, polygonPoints } = req.body;

    // Validation: A polygon must have at least 3 points
    if (!polygonPoints || !Array.isArray(polygonPoints) || polygonPoints.length < 3) {
        return res.status(400).json({ 
            message: "Validation Error: A polygon must have at least 3 coordinates." 
        });
    }

    try {
        const newLocation = new Location({
            HR,
            locationName,
            polygonPoints,
        });

        await newLocation.save();
        res.status(200).json({ message: "Polygon Location Added Successfully" });
    } catch (err) {
        console.error("Error saving location:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});




Router.get('/hr/:HR',async (req,res)=>{

  const{HR}=req.params

  try{
     const location=await Location.find({HR})
     console.log(location)
     if(!location){
        return res.status(404).json({message:"No location found"})
     }
     res.status(200).json(location)


  }
  catch(err){
     res.status(500).json({message:"Error fetching location"})
     console.log(err)
  }
})




module.exports=Router;