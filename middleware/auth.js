const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isAuthenticated = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token missing",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );

    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(404).json({
        message: "User not found. Please login again",
      });
    }

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid token. Please login again",
    });
  }
};
