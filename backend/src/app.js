const express = require('express');
const cors    = require('cors');
const { CLIENT_URL } = require('./config/env');   // also calls dotenv.config() + validates vars
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const simulatorService = require('./integrations/simulator/simulatorService');

const app = express();

// Start Simulator
simulatorService.start();

// Connect to MongoDB — exits process if connection fails
connectDB();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin:         CLIENT_URL,
  methods:        ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth',             require('./routes/authRoutes'));
app.use('/api/dashboard',        require('./routes/dashboardRoutes'));
app.use('/api/air-quality',      require('./routes/airQualityRoutes'));
app.use('/api/ai-predictions',   require('./routes/aiPredictionsRoutes'));
app.use('/api/fan-recommendation', require('./routes/fanRecommendationRoutes'));
app.use('/api/analytics',        require('./routes/analyticsRoutes'));
app.use('/api/device',           require('./routes/deviceRoutes'));
app.use('/api/telemetry',        require('./routes/telemetryRoutes'));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'OK', db: 'connected', message: 'Backend is running' });
});

// ─── Centralized Error Handler (must be last) ─────────────────────────────────
app.use(require('./middleware/errorMiddleware'));

module.exports = app;
