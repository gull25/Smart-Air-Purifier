const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');

// @route   GET /api/device/status
// @desc    Get device status
// @access  Public
router.get('/status', deviceController.getStatus);

// @route   GET /api/device/node-profile
// @desc    Get device node profile
// @access  Public
router.get('/node-profile', deviceController.getNodeProfile);

// @route   GET /api/device/peripherals
// @desc    Get device peripherals
// @access  Public
router.get('/peripherals', deviceController.getPeripherals);

// @route   GET /api/device/gateway-config
// @desc    Get device gateway config
// @access  Public
router.get('/gateway-config', deviceController.getGatewayConfig);

// @route   GET /api/device/diagnostics
// @desc    Get device diagnostics
// @access  Public
router.get('/diagnostics', deviceController.getDiagnostics);

// @route   GET /api/device/config
// @desc    Get device configuration
// @access  Public
router.get('/config', deviceController.getConfig);
// @route   POST /api/device/fan
// @desc    Control the fan state
// @access  Public
router.post('/fan', deviceController.controlFan);

// @route   POST /api/device/mode
// @desc    Control the auto mode
// @access  Public
router.post('/mode', deviceController.controlMode);

// @route   PATCH /api/device/config
// @desc    Update device AI settings
// @access  Public
router.patch('/config', deviceController.updateConfig);

module.exports = router;
