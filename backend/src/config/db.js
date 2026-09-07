const mongoose = require('mongoose');
const { MONGO_URI, NODE_ENV } = require('./env');

/**
 * Connects to MongoDB using Mongoose.
 * Exits the process if the initial connection fails —
 * the app cannot serve real data without a database.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`[MongoDB] Connected: ${conn.connection.host} / ${conn.connection.name}`);
  } catch (err) {
    console.error(`[MongoDB] Connection failed: ${err.message}`);
    process.exit(1);
  }
};

// Log disconnection events so they appear in the console
mongoose.connection.on('disconnected', () => {
  if (NODE_ENV !== 'test') {
    console.warn('[MongoDB] Disconnected');
  }
});

module.exports = connectDB;
