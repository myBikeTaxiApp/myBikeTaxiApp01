const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');
const { verifyToken } = require('../middleware/authMiddleware');

// Booking a ride (create a new ride request)
router.post('/book', verifyToken, async (req, res) => {
  const { bikeId, startLocation, endLocation, price } = req.body;

  try {
    // Validate request body
    if (!bikeId || !startLocation || !endLocation || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new ride
    const newRide = new Ride({
      user: req.user?.id, // Ensure req.user exists
      bike: bikeId,
      startLocation,
      endLocation,
      price,
      rideStatus: 'pending', // Default status for new ride
      acceptedByDriver: false, // Initially, no driver has accepted
    });

    // Save ride to database
    await newRide.save();

    // Send response with ride details
    res.status(201).json({ message: 'Ride booked successfully', ride: newRide });

  } catch (error) {
    console.error("🚨 Error booking ride:", error);  // Improved logging
    res.status(500).json({ message: 'Error booking ride', error: error.toString() });
  }
});

// Export routes
module.exports = router;
