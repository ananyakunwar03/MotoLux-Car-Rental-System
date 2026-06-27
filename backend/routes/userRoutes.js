// routes/userRoute.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Booking = require("../models/Booking");

// GET USER DASHBOARD DATA
router.get("/dashboard/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).select("name email phone");

        const bookings = await Booking.find({ user: userId })
            .populate("car", "name") // get car name
            .sort({ createdAt: -1 }); // latest first

        res.json({ user, bookings });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
