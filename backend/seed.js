require('dotenv').config();
const mongoose = require('mongoose');
const Car = require('./models/Car');
const carsData = require('./cars.json'); // Adjust path if needed (e.g., if cars.json is in backend/)

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Car.deleteMany(); // Clear existing data (optional)
    await Car.insertMany(carsData);
    console.log('Cars seeded successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();