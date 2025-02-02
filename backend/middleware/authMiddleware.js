const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from Authorization header (Bearer Token)
  const token = req.header("Authorization")?.split(" ")[1]; // Optional chaining ensures we don't get an error if the header is missing

  // If there's no token, send a 401 error
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify the token with the JWT_SECRET from the environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");

    // Add user from payload to request object
    req.user = decoded.user;

    // Move to the next middleware/route handler
    next();
  } catch (err) {
    console.error(err); // Logging the error for better debugging
    res.status(401).json({ msg: "Token is not valid" });
  }
};
