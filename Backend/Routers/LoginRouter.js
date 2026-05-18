const express=require("express");
const Router=express.Router();
const jwt = require("jsonwebtoken");
const Employee=require("../Models/EmployeeSchema");
const HR_Schema = require("../Models/HR_Schema");


// Create JWT token
const createToken = (email, role) => {
    const payload = { email, role };
    const token = jwt.sign(payload, "Q$r2K6WBn!jCW%Zk", { expiresIn: "1h" });
    return token;
  };
  
  // Login endpoint
  Router.post("/", async (req, res) => {
    const { email, password, role } = req.body;
  
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Email, password, and role are required" });
    }
  
    try {
      // Find user in the database

      if(role=="Employee"){
        const user = await Employee.findOne({ email, password });
        console.log("h")
  
        if (user) {
        const token = createToken(user.email,role);
        return res.status(200).json({ token, role:role,user });
  
  
      } else {
        return res
          .status(404)
          .json({ message: "Invalid email, password" });
      }

      }

      else if(role=="HR"){
        const user = await HR_Schema.findOne({ email, password });
  
        if (user) {
          const token = createToken(user.email,role);
          return res.status(200).json({ token, role:role,user });
    
    
        } else {
          return res
            .status(404)
            .json({ message: "Invalid email, password" });
        }



      }

      
      
  
      
    } catch (error) {
      console.error("Error finding user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  

  module.exports=Router;