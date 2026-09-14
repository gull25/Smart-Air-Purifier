const express = require('express');
const cors    = require('cors');
const { CLIENT_URL } = require('./config/env');   // also calls dotenv.config() + validates vars
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const simulatorService = require('./integrations/simulator/simulatorService');
const mqttClient = require('./integrations/mqtt/mqttClient');

const app = express();

// Start Simulator (if enabled)
simulatorService.start();

// Start MQTT Client (if enabled)
mqttClient.start();

// Connect to MongoDB — exits process if connection fails
connectDB();

// ─── Middleware ───────────────────────────────────────────────────────────────
// Parse CLIENT_URL into an array if it contains commas, and always allow localhost for local testing
const allowedOrigins = CLIENT_URL ? CLIENT_URL.split(',').map(url => url.trim()) : [];
if (!allowedOrigins.includes('http://localhost:5173')) allowedOrigins.push('http://localhost:5173');

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the origin matches any of the allowed origins or if it's a Vercel preview URL
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    
    // If we get here, the origin isn't allowed
    callback(new Error('Not allowed by CORS'));
  },
  methods:        ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '5mb' }));

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
