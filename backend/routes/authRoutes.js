const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User"); // Import User model
const { verifyToken } = require("../middleware/authMiddleware"); // ✅ Corrected import

const router = express.Router();

// 🟢 User Registration Route (POST /api/auth/register)
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 6 characters, include one uppercase, one lowercase, and one number"
    )
      .isLength({ min: 6 })
      .matches(/[A-Z]/) // At least one uppercase letter
      .matches(/[a-z]/) // At least one lowercase letter
      .matches(/[0-9]/), // At least one number
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      user = new User({ name, email, password: hashedPassword });
      await user.save();

      // Generate JWT Token
      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.status(201).json({ token, msg: "User registered successfully" });
    } catch (err) {
      console.error("Error in Register Route:", err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// 🟢 User Login Route (POST /api/auth/login)
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      // Generate JWT Token
      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.json({ token, msg: "Login successful" });
    } catch (err) {
      console.error("Error in Login Route:", err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// 🟢 User Profile Route (GET /api/auth/profile)
router.get("/profile", verifyToken, async (req, res) => { // ✅ Corrected middleware usage
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error in Profile Route:", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
