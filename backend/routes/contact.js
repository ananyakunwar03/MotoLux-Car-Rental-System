const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

// POST route for contact form submission
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Basic validation (trim inputs and check required fields)
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required" });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    // Create and save new contact message
    const newContact = new Contact({
      name: name.trim(),
      email: email.toLowerCase(),
      phone: phone ? phone.trim() : undefined,  // Optional
      message: message.trim(),
    });
    await newContact.save();

    res.status(201).json({ message: "Your details have reached us, we will get back to you." });
  } catch (error) {
    console.error("Contact submission error:", error);
    res.status(500).json({ message: "Error submitting contact form. Please try again." });
  }
});

module.exports = router;