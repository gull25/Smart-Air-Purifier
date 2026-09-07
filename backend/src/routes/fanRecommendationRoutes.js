const express = require('express');
const router = express.Router();
const fanRecommendationController = require('../controllers/fanRecommendationController');

// @route   GET /api/fan-recommendation/ai-decision
// @desc    Get AI decision target speed and context
// @access  Public
router.get('/ai-decision', fanRecommendationController.getAIDecision);

// @route   GET /api/fan-recommendation/telemetry
// @desc    Get live mechanical telemetry
// @access  Public
router.get('/telemetry', fanRecommendationController.getTelemetry);

// @route   GET /api/fan-recommendation/hardware-flow
// @desc    Get hardware control flow stats
// @access  Public
router.get('/hardware-flow', fanRecommendationController.getHardwareFlow);

module.exports = router;
