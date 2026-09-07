const express = require('express');
const router = express.Router();
const aiPredictionsController = require('../controllers/aiPredictionsController');

// Define routes for AI predictions endpoints
router.get('/metrics', aiPredictionsController.getMetrics);
router.get('/chart', aiPredictionsController.getChart);
router.get('/trajectory', aiPredictionsController.getTrajectory);
router.get('/xai', aiPredictionsController.getXai);
router.get('/header', aiPredictionsController.getHeader);

module.exports = router;
