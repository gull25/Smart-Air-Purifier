const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const data = await authService.registerUser(name, email, password);
    res.status(201).json(data);
  } catch (error) {
    if (error.message === 'User already exists') {
      return res.status(409).json({ error: error.message });
    }
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const data = await authService.loginUser(email, password);
    res.status(200).json(data);
  } catch (error) {
    if (error.message === 'Invalid email or password') {
      return res.status(401).json({ error: error.message });
    }
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getMe = async (req, res) => {
  try {
    const data = await authService.getUserById(req.user.userId);
    res.status(200).json(data);
  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { avatarBase64 } = req.body;
    if (!avatarBase64) {
      return res.status(400).json({ error: 'Avatar data is required' });
    }
    const data = await authService.updateUserAvatar(req.user.userId, avatarBase64);
    res.status(200).json(data);
  } catch (error) {
    console.error('Update avatar error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateAvatar
};
