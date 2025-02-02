const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from Authorization header (Bearer Token)
  const token = req.header("Authorization") && req.header("Authorization").split(" ")[1];

  // If there's no token, send a 401 error
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, "your_jwt_secret");

    // Add user from payload to request object
    req.user = decoded.user;

    // Move to the next middleware/route handler
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
