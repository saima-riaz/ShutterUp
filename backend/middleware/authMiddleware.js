/*module.exports = (req, res, next) => {
   // Simulate an authenticated user
  req.user = { 
    id: "6614a5879f06d5e06d874b1d", // <-- user id of DB
  };
  next(); // proceed to next midleware 
}; */

/*const jwt = require('jsonwebtoken');

// Middleware to protect routes using JWT
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Extract the token from the header
  const token = authHeader.split(' ')[1];

  try {
     // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to the request
    req.user = { id: decoded.id };

    // Proceed to the next middleware or route
    next();
  } catch (err) {
    
    // Token is invalid or expired
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};*/

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

     // Verify token + check expiry
     const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: false }); // ✅ Force expiry check
    
    // 3. Find user and attach to request
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid token, user not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Authentication error:', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;