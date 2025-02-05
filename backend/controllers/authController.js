const User = require("../models/User"); // User Model 
const OTPService = require("../services/OTPService"); // OTP Service
const jwt = require("jsonwebtoken");

// 🟢 1️⃣ Send OTP to User's Mobile Number
exports.sendOTP = async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    if (!mobileNumber) {
      return res.status(400).json({ success: false, message: "Mobile number is required" });
    }

    let user = await User.findOne({ mobileNumber });
    let userName = user ? user.name : "";

    // Send OTP using OTP Service
    const otpSent = await OTPService.sendOTP(mobileNumber);
    if (!otpSent) {
      return res.status(500).json({ success: false, message: "Failed to send OTP" });
    }

    return res.json({ success: true, message: "OTP sent!", userName });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🟢 2️⃣ Verify OTP & Authenticate User
exports.verifyOTP = async (req, res) => {
  try {
    const { mobileNumber, otp, name } = req.body;

    if (!mobileNumber || !otp) {
      return res.status(400).json({ success: false, message: "Mobile number and OTP are required" });
    }

    // Check OTP validity
    const isValidOTP = await OTPService.verifyOTP(mobileNumber, otp);
    if (!isValidOTP) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    // Check if user exists
    let user = await User.findOne({ mobileNumber });

    if (!user) {
      if (!name) {
        return res.status(400).json({ success: false, message: "Name is required for new users" });
      }
      user = new User({ name, mobileNumber, isVerified: true });
      await user.save();
    } else if (!user.isVerified) {
      user.isVerified = true;
      await user.save();
    }

    // Generate JWT token
    const payload = { user: { id: user.id, mobileNumber: user.mobileNumber } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.json({ success: true, message: "OTP verified", token, user });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🟢 3️⃣ Get User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-__v");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🟢 4️⃣ Update Email for Account Recovery
exports.updateEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.email = email;
    await user.save();

    return res.json({ success: true, message: "Email updated successfully!" });
  } catch (error) {
    console.error("Error updating email:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
