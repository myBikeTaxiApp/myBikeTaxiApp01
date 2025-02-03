const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bike: { type: mongoose.Schema.Types.ObjectId, ref: 'Bike', required: true },
  startLocation: { type: String, required: true },
  endLocation: { type: String, required: true },
  rideStatus: { 
    type: String, 
    enum: ['pending', 'in-progress', 'completed'], 
    default: 'pending' 
  },
  price: { type: Number, required: true },
  driverId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    default: null 
  },  // Driver who accepts the ride
  acceptedByDriver: { 
    type: Boolean, 
    default: false 
  },  // Whether a driver has accepted the ride or not
  createdAt: { type: Date, default: Date.now },
});

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;
