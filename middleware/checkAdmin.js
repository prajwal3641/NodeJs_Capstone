const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();

let jwtSecretKey = process.env.JWT_SECRET_KEY;

const checkAdmin = (req, res, next) => {
  const token = req.headers[process.env.TOKEN_HEADER_KEY]; // Use your custom header key

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    if (!decoded.admin) {
      return res
        .status(403)
        .json({ error: "Forbidden: Admin access required" });
    }
    req.user = decoded; // Attach user data to the request object
    next(); // Allow the request to proceed
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = checkAdmin;
