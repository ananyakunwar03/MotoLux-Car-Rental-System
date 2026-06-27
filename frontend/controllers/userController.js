const User = require("../models/User");
const Booking = require("../models/Booking");

exports.getUserDashboard = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId).select("name email phone");
        if (!user) return res.status(404).json({ message: "User not found" });

        const bookings = await Booking.find({ user: userId })
        .populate("car", "name")
        .sort({ createdAt: -1 }); 

        res.json({ user, bookings });
    } 
    catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};
