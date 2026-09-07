const axios = require('axios');

// Configuration
const BACKEND_URL = 'http://localhost:5000/api/telemetry';
const INTERVAL_MS = 5000; // Send telemetry every 5 seconds

// Initial State
let currentAQI = 50;
let fanStatus = false;
let isAutoMode = true;
let aqiThreshold = 100;

console.log('🌱 Starting ESP32 Hardware Simulator...');
console.log(`📡 Sending telemetry to ${BACKEND_URL} every ${INTERVAL_MS / 1000} seconds.\n`);

// Function to simulate environmental changes
const simulateEnvironment = () => {
  // Randomly fluctuate AQI by -5 to +10 to simulate dust/smoke occasionally
  const change = Math.floor(Math.random() * 16) - 5; 
  currentAQI = Math.max(10, Math.min(500, currentAQI + change));

  // Auto Mode Logic (exactly matching the C++ firmware)
  if (isAutoMode) {
    if (currentAQI > aqiThreshold && !fanStatus) {
      fanStatus = true;
      console.log('🤖 Auto Mode: High AQI detected. Fan turned ON.');
    } else if (currentAQI <= aqiThreshold && fanStatus) {
      fanStatus = false;
      console.log('🤖 Auto Mode: AQI normal. Fan turned OFF.');
    }
  }
};

// Function to send telemetry to backend
const sendTelemetry = async () => {
  simulateEnvironment();

  const payload = {
    aqi: currentAQI,
    fanStatus: fanStatus,
    mode: isAutoMode ? 'auto' : 'manual'
  };

  try {
    const response = await axios.post(BACKEND_URL, payload);
    console.log(`✅ [${new Date().toLocaleTimeString()}] Sent Telemetry: AQI=${currentAQI}, Fan=${fanStatus ? 'ON' : 'OFF'}, Mode=${payload.mode}`);
  } catch (error) {
    console.error(`❌ Failed to send telemetry: ${error.message}`);
  }
};

// Start the loop
setInterval(sendTelemetry, INTERVAL_MS);

// Send the first reading immediately
sendTelemetry();
