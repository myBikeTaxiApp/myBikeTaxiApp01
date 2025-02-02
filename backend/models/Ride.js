// backend/models/Ride.js

const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bike: { type: mongoose.Schema.Types.ObjectId, ref: 'Bike', required: true },
  startLocation: { type: String, required: true },
  endLocation: { type: String, required: true },
  rideStatus: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;
