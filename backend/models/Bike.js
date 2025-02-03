const mongoose = require("mongoose");

// Define the bike schema
const bikeSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true, // Ensure a model name is provided
  },
  status: {
    type: String,
    enum: ["available", "booked", "in-use"],
    default: "available", // Bikes default to 'available' status
  },
  pricePerHour: {
    type: Number,
    required: true, // Ensure a price per hour is provided
  },
});

// Create a model from the schema
const Bike = mongoose.model("Bike", bikeSchema);

// Export the Bike model to be used elsewhere in your application
module.exports = Bike;
