const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");
const carsRoutes = require("./routes/cars"); 
const feedbackRoutes = require("./routes/feedback"); 
const adminRoutes = require("./routes/admin"); 
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors({
  origin: ["http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:3000"],
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
}));

app.use(express.json());
connectDB();

// Serve static files from frontend at /frontend (fixes admin path issues)
app.use('/frontend', express.static(path.join(__dirname, "../frontend")));
app.use('/assests', express.static(path.join(__dirname, "../frontend/assests")));

// API Routes (after static, so /api/* doesn't conflict)
app.use("/api/auth", authRoutes.router);  // Correct: Use .router
app.use("/api/contact", contactRoutes);
app.use("/api/cars", carsRoutes);
app.use("/api/feedback", feedbackRoutes); 
app.use("/api/admin", adminRoutes);
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/user", userRoutes);

// Catch-all route (Express v5 compatible) - must be last
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);