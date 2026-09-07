require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/smart-air-purifier',
  DATA_SOURCE: process.env.DATA_SOURCE || 'simulation',
  SIMULATION_ENABLED: process.env.SIMULATION_ENABLED === 'true',
};
