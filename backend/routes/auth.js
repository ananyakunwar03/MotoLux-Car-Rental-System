const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
// JWT Secret (add to .env: JWT_SECRET=your_secret_key_here)
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

const requireAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token
  if (!token) return res.status(401).json({ message: "Access denied" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.isAdmin) return res.status(403).json({ message: "Admin access required" });
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Basic validation with trimming
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // NAME VALIDATION — only alphabets & spaces
    if (!/^[A-Za-z ]+$/.test(name)) {
      return res.status(400).json({ message: "Name must contain only alphabets" });
    }

    // PHONE VALIDATION — exactly 10 digits
    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ message: "Phone number must be exactly 10 digits" });
    }

    // PASSWORD VALIDATION — min 6 characters + alphanumeric compulsory
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
      return res.status(400).json({ 
        message: "Password must be at least 6 characters and alphanumeric"
      });
    }

    // Check if user exists already (email OR phone)
    const existingUser = await User.findOne({ $or: [{ email: email.toLowerCase() }, { phone }] });
    if (existingUser) {
      const field = existingUser.email === email.toLowerCase() ? 'email' : 'phone';
      return res.status(400).json({ message: `Account with this ${field} already exists` });
    }

    // CREATE NEW USER
    const newUser = new User({ name: name.trim(), email: email.toLowerCase(), phone, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    // Find user by email (case-insensitive)
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Block normal users from logging into admin panel
    if (req.body.isAdminLogin && !user.isAdmin) {
      return res.status(403).json({ message: "Access denied: Not an admin" });
    }
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: "1h" });
    // Success
    res.status(200).json({ message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = { router, requireAdmin };
