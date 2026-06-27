// models/Car.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  type: { type: String, required: true }, // two-seater, five-seater, seven-seater
  transmission: { type: String, required: true }, // Automatic, Manual, Hybrid
  seater: { type: Number, required: true }, // 2, 5, 7
  category: { type: String, default: "Sports Car" }, // for icon text
  pricePerDay: { type: Number, required: true },
  available: { type: Boolean, default: true },
  image: { type: String, required: true }, // absolute path
});

module.exports = mongoose.model('Car', carSchema);
