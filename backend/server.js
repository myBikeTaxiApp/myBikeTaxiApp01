// backend/server.js
const express = require('express');
const connectDB = require('./config/db'); // Import the database connection setup

const app = express();
app.use(express.json());

// Connect to MongoDB using the connectDB function
connectDB();

// Import and Use Authentication Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Test API Route
app.get('/', (req, res) => {
    res.send('🚀 Welcome to My Bike Taxi App Backend!');
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
