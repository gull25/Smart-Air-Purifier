const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Define routes for dashboard endpoints
router.get('/status', dashboardController.getStatus);
router.get('/ai-insight', dashboardController.getAiInsight);
router.get('/chart-data', dashboardController.getChartData);
router.get('/hardware', dashboardController.getHardwareInfo);
router.get('/alerts', dashboardController.getAlerts);
router.post('/fan-control', dashboardController.updateFanControl);

module.exports = router;
