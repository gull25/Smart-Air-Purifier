const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const { requireAuth } = require('../middleware/authMiddleware');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', authController.register);

// @route   POST /api/auth/login
// @desc    Login user and get token
// @access  Public
router.post('/login', authController.login);

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', requireAuth, authController.getMe);

// @route   POST /api/auth/avatar
// @desc    Upload avatar (base64)
// @access  Private
router.post('/avatar', requireAuth, authController.updateAvatar);

module.exports = router;
