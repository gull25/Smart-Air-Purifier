const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Ensure JWT_SECRET is set in .env, otherwise use a fallback for dev
const JWT_SECRET = process.env.JWT_SECRET || 'aero_pulse_secret_super_key_2026';

const registerUser = async (name, email, password) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Create new user
  const user = new User({
    name,
    email,
    password
  });

  await user.save();

  // Generate token
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

  return { user: { id: user._id, name: user.name, email: user.email }, token };
};

const loginUser = async (email, password) => {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Verify password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  // Generate token
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

  return { user: { id: user._id, name: user.name, email: user.email }, token };
};

module.exports = {
  registerUser,
  loginUser
};
