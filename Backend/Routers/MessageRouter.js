
const express=require("express");
const Router=express.Router();
Message=require("../Models/ChatSchema")


// Endpoint to send a message
Router.post("/sendMessage", async (req, res) => {
    const { sender, receiver, message } = req.body;
  
    if (!sender || !receiver || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const newMessage = new Message({ sender, receiver, message });
      await newMessage.save();
      return res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
      console.error("Error sending message:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  


  // Endpoint to get chat history
  Router.get("/getMessages", async (req, res) => {
    const { user1, user2 } = req.query;
  
 


    try {
      const messages = await Message.find({
        $or: [
          { sender: user1, receiver: user2 },
          { sender: user2, receiver: user1 },
        ],
      }).sort({ timestamp: 1 });
  
      return res.status(200).json(messages);
    } catch (error) {
      console.error("Error retrieving messages:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  

  module.exports=Router;