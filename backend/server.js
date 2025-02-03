// Load environment variables 
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json()); // Body parser for JSON data
app.use(cors()); // Enable Cross-Origin Resource Sharing (for frontend integration)

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/rides", require("./routes/rideRoutes"));
app.use("/api/bikes", require("./routes/bikeRoutes")); // Register bike routes here

// Root Route (For Testing)
app.get("/", (req, res) => {
    res.send("🚀 Welcome to My Bike Taxi App Backend!");
});

// Handle Undefined Routes (404)
app.use((req, res) => {
    res.status(404).json({ msg: "Route Not Found" });
});

// Error Handling Middleware (500)
app.use((err, req, res, next) => {
    console.error("Server Error:", err.message); // Log the error
    res.status(500).json({ msg: "Internal Server Error", error: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
