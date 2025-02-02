// backend/routes/rideRoutes.js

const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');

// Booking a ride
router.post('/book', async (req, res) => {
  const { userId, bikeId, startLocation, endLocation, price } = req.body;

  try {
    const newRide = new Ride({
      user: userId,
      bike: bikeId,
      startLocation,
      endLocation,
      price
    });

    await newRide.save();
    res.status(201).json({ message: 'Ride booked successfully', ride: newRide });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error booking ride' });
  }
});

module.exports = router;
