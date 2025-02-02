// backend/models/Bike.js
const mongoose = require('mongoose');

const BikeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  pricePerRide: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const Bike = mongoose.model('Bike', BikeSchema);

module.exports = Bike;
