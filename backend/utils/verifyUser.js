import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // Adjust the path to your User model

export const verifyToken = async (req, res, next) => {
  try {
    // Check if token is present in cookies
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ message: 'Token not found. Please log in.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the token
    const user = await User.findById(decoded.id).select('email username'); // Fetch only necessary fields
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Attach the user to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session expired. Please log in again.' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    // Log unexpected errors for debugging purposes
    console.error('Unexpected error in verifyToken:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


// Helper function to extract userId from token
export const extractUserIdFromToken = (req) => {
  const token = req.cookies.access_token;
  if (!token) {
    throw new Error('Unauthorized: No token found in cookies');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id; // Assuming the token contains the user ID in the `id` field
};