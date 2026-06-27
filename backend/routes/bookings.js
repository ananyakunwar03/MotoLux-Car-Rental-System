const express = require('express');
const Booking = require('../models/Booking');
const Car = require('../models/Car'); // To check availability
const router = express.Router();

// POST /api/bookings - Create a new booking
router.post('/', async (req, res) => {
  try {
    const { userId, carId, pickupLocation, dropLocation, pickupDate, pickupTime, returnDate, returnTime } = req.body;

    // Validation
    if (!userId || !carId || !pickupLocation || !dropLocation || !pickupDate || !pickupTime || !returnDate || !returnTime) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if car exists and is available
    const car = await Car.findById(carId);
    if (!car || !car.available) {
      return res.status(400).json({ message: 'Selected car is not available' });
    }

    // Create booking
    const newBooking = new Booking({
      user: userId,
      car: carId,
      pickupLocation,
      dropLocation,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime
    });
    await newBooking.save();

    res.status(201).json({ message: 'Booking confirmed successfully' });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

module.exports = router;