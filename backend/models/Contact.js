const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    lowercase: true, 
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'] 
  },
  phone: { type: String, trim: true },  // Optional, as per your HTML
  message: { type: String, required: true, trim: true },
  submittedAt: { type: Date, default: Date.now },  // Timestamp for tracking
});

module.exports = mongoose.model("Contact", contactSchema);