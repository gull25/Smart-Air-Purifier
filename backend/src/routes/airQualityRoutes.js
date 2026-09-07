const express = require('express');
const router = express.Router();
const airQualityController = require('../controllers/airQualityController');

// Define routes for air quality endpoints
router.get('/master-gauge', airQualityController.getMasterGauge);
router.get('/gas-breakdown', airQualityController.getGasBreakdown);
router.get('/ambient-dynamics', airQualityController.getAmbientDynamics);
router.get('/filtration-health', airQualityController.getFiltrationHealth);

module.exports = router;
