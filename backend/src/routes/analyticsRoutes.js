const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// @route   GET /api/analytics/kpi-summary
// @desc    Get analytics KPI summary
// @access  Public
router.get('/kpi-summary', analyticsController.getKpiSummary);

// @route   GET /api/analytics/ai-diagnostic
// @desc    Get AI diagnostic banner data
// @access  Public
router.get('/ai-diagnostic', analyticsController.getAiDiagnostic);

// @route   GET /api/analytics/aqi-trends
// @desc    Get AQI trends chart data
// @access  Public
router.get('/aqi-trends', analyticsController.getAqiTrends);

// @route   GET /api/analytics/compliance
// @desc    Get compliance donut chart data
// @access  Public
router.get('/compliance', analyticsController.getCompliance);

// @route   GET /api/analytics/gas-matrix
// @desc    Get gas matrix composition data
// @access  Public
router.get('/gas-matrix', analyticsController.getGasMatrix);

// @route   GET /api/analytics/historical-anomalies
// @desc    Get historical anomalies table data
// @access  Public
router.get('/historical-anomalies', analyticsController.getHistoricalAnomalies);

// @route   GET /api/analytics/historical-telemetry
// @desc    Get historical telemetry data for Recharts
// @access  Public
router.get('/historical-telemetry', analyticsController.getHistoricalTelemetry);

module.exports = router;
