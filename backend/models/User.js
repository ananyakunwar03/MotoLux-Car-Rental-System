// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true, 
    match: [/^[A-Za-z\s]+$/, 'Name must contain only alphabets'] 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'] 
  },
  phone: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, 
    match:/^[0-9]{10}$/},
  password: { 
    type: String, 
    required: true,     
    minlength: 6,
    match: [/^(?=.*[A-Za-z])(?=.*\d).+$/, "Password must contain letters and numbers"]
 },
  isAdmin: { type: Boolean, default: false }, 
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);