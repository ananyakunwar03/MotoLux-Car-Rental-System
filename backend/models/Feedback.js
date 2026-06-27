const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    lowercase: true, 
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'] 
  },
  bookingId: { type: String, required: true, trim: true }, // Booking ID / Rental ID
  carModel: { type: String, required: true, trim: true }, // Car Model Rented
  overallExp: { type: Number, required: true, min: 1, max: 5 }, // Overall Experience (1-5)
  carCondition: { type: Number, required: true, min: 1, max: 5 }, // Car Condition (1-5)
  easeBooking: { type: Number, required: true, min: 1, max: 5 }, // Ease of Booking Process (1-5)
  pickupDrop: { type: Number, required: true, min: 1, max: 5 }, // Pickup & Dropoff (1-5)
  customerSupport: { type: Number, required: true, min: 1, max: 5 }, // Customer Support (1-5)
  valueMoney: { type: Number, required: true, min: 1, max: 5 }, // Value for Money (1-5)
  issuesCar: { type: String, required: true, enum: ['Yes', 'No'] }, // Did You Face Any Issues With the Car?
  improve: { type: String, trim: true }, // What Can We Improve? (optional)
  recommend: { type: Number, required: true, min: 1, max: 5 }, // Likelihood to Recommend Us (1-5)
  submittedAt: { type: Date, default: Date.now } // Timestamp
});

module.exports = mongoose.model('Feedback', feedbackSchema);