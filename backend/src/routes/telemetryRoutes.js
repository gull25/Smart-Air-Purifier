const express = require('express');
const router = express.Router();
const telemetryController = require('../controllers/telemetryController');

// @route   POST /api/telemetry
// @desc    Receive telemetry from ESP32
// @access  Public (should be protected in prod)
router.post('/', telemetryController.receiveTelemetry);

module.exports = router;
