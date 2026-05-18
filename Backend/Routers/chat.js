const express = require("express");
const router = express.Router();
const Chat = require("../Models/Chat");

// Fetch messages
router.get("/:employeeId", async (req, res) => {
  try {
    const chat = await Chat.findOne({ employeeId: req.params.employeeId });
    res.json(chat ? chat.messages : []);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Send message
router.post("/:employeeId", async (req, res) => {
  try {
    const { text } = req.body;
    let chat = await Chat.findOne({ employeeId: req.params.employeeId });
    if (!chat) {
      chat = new Chat({ employeeId: req.params.employeeId, messages: [] });
    }
    chat.messages.push({ text });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
