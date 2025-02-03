const express = require("express"); 
const Bike = require("../models/Bike"); // Import the Bike model
const router = express.Router();

// POST route to add a new bike
router.post("/add", async (req, res) => {
  const { model, pricePerHour } = req.body;

  // Validate required fields
  if (!model || !pricePerHour) {
    return res.status(400).json({ message: "Model and pricePerHour are required" });
  }

  try {
    // Create a new bike
    const newBike = new Bike({
      model,
      pricePerHour,
    });

    // Save the bike to the database
    await newBike.save();
    
    res.status(201).json({ message: "Bike added successfully", bike: newBike });
  } catch (error) {
    console.error("Error adding bike:", error);
    res.status(500).json({ message: "Error adding bike", error: error.message });
  }
});

// GET route to fetch all bikes
router.get("/", async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.status(200).json(bikes);
  } catch (error) {
    console.error("Error fetching bikes:", error);
    res.status(500).json({ message: "Error fetching bikes", error: error.message });
  }
});

// PATCH route to update bike status (e.g., 'available', 'booked', 'in-use')
router.patch("/:id/status", async (req, res) => {
  const { status } = req.body;
  const allowedStatuses = ["available", "booked", "in-use"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const bike = await Bike.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!bike) {
      return res.status(404).json({ message: "Bike not found" });
    }

    res.status(200).json({ message: "Bike status updated", bike });
  } catch (error) {
    console.error("Error updating bike status:", error);
    res.status(500).json({ message: "Error updating bike status", error: error.message });
  }
});

module.exports = router;
