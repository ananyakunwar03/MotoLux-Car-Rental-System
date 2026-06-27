const express = require('express');
const Feedback = require('../models/Feedback');
const router = express.Router();

// POST /api/feedback - Submit feedback
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      bookingId,
      carModel,
      overallExp,
      carCondition,
      easeBooking,
      pickupDrop,
      customerSupport,
      valueMoney,
      issuesCar,
      improve,
      recommend
    } = req.body;

    // Basic validation
    if (!name || !email || !bookingId || !carModel || !overallExp || !carCondition || !easeBooking || !pickupDrop || !customerSupport || !valueMoney || !issuesCar || !recommend) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email' });
    }

    // Create and save feedback
    const newFeedback = new Feedback({
      name: name.trim(),
      email: email.toLowerCase(),
      bookingId: bookingId.trim(),
      carModel: carModel.trim(),
      overallExp: parseInt(overallExp),
      carCondition: parseInt(carCondition),
      easeBooking: parseInt(easeBooking),
      pickupDrop: parseInt(pickupDrop),
      customerSupport: parseInt(customerSupport),
      valueMoney: parseInt(valueMoney),
      issuesCar,
      improve: improve ? improve.trim() : undefined,
      recommend: parseInt(recommend)
    });
    await newFeedback.save();

    res.status(201).json({ message: 'Thank you for your feedback! We appreciate your input.' });
  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({ message: 'Error submitting feedback. Please try again.' });
  }
});

module.exports = router;