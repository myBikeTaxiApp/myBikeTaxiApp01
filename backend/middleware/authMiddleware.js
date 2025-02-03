const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Get token from Authorization header (Bearer Token)
  const token = req.header("Authorization")?.split(" ")[1]; // Using optional chaining to safely access the header

  // If there's no token, log the error and send a 401 response
  if (!token) {
    console.error("Authorization header is missing the token");
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify the token with the JWT_SECRET from the environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "Gurrnaat3792$");

    // Add user from payload to request object
    req.user = decoded.user;

    // Log the user info for debugging (optional)
    console.log("Decoded user:", req.user);

    // Move to the next middleware/route handler
    next();
  } catch (err) {
    // Log detailed error message if token verification fails
    console.error("Token verification failed:", err.message);  // Log the error message for better debugging
    res.status(401).json({ msg: "Token is not valid", error: err.message });
  }
};

// ✅ Export the function correctly
module.exports = { verifyToken };
