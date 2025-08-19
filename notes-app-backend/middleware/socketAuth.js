const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) {
      throw new Error('Authentication error: No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      throw new Error('Authentication error: User not found');
    }

    socket.user = user;
    next();
  } catch (err) {
    next(new Error('Authentication error: ' + err.message));
  }
};