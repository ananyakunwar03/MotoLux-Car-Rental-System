const express = require('express');
const Car = require('../models/Car');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { type, limit, ids } = req.query;

    let query = {};
    if (type) query.type = type;

    let cars;
    if (ids) {
      // If ids are provided, fetch specific cars by _id
      const idArray = ids.split(',').map(id => id.trim());
      query._id = { $in: idArray };
      cars = await Car.find(query); // No limit, fetch all matching IDs
    } else {
      // Default behavior: fetch by type with limit
      const max = limit === "0" ? 0 : parseInt(limit) || 3;
      cars = max === 0 ? await Car.find(query) : await Car.find(query).limit(max);
    }

    res.json(cars);
  } catch (err) {
    console.error('Error fetching cars:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;