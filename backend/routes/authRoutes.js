const express = require("express");
const { sendOTP, verifyOTP, getProfile, updateEmail } = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// 🟢 1️⃣ Send OTP
router.post("/send-otp", sendOTP);

// 🟢 2️⃣ Verify OTP & Login/Register
router.post("/verify-otp", verifyOTP);

// 🟢 3️⃣ Get User Profile
router.get("/profile", verifyToken, getProfile);

// 🟢 4️⃣ Update Email
router.put("/update-email", verifyToken, updateEmail);

module.exports = router;
