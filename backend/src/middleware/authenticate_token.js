const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware to verify JWT and attach user to request
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from Authorization header

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }

    try {
      const user = await User.findByPk(decoded.userId); // Find user by ID from the decoded JWT
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      req.user = user; // Attach user to request object for access in subsequent routes
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });
};

module.exports = authenticateToken;
