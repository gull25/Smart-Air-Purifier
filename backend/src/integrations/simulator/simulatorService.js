const Device = require('../../models/Device');
const SensorReading = require('../../models/SensorReading');
const env = require('../../config/env');
const telemetryPipeline = require('../../services/telemetryPipeline');

let simulatorInterval = null;
let currentAQI = 45;
let fanStatus = false;
let isAutoMode = true;
let currentScenario = 'NORMAL'; 
let scenarioSteps = 0;

// Config
const INTERVAL_MS = 5000;
const SCENARIO_DURATION_STEPS = 60; // 5 mins per scenario

const generateRealisticReading = () => {
  // Scenario transition
  if (scenarioSteps >= SCENARIO_DURATION_STEPS) {
    const scenarios = ['NORMAL', 'NORMAL', 'POLLUTION_SPIKE', 'IMPROVING'];
    currentScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    scenarioSteps = 0;
    console.log(`[Simulator] Shifting to scenario: ${currentScenario}`);
  }
  scenarioSteps++;

  // Apply scenario drift
  let drift = 0;
  switch (currentScenario) {
    case 'POLLUTION_SPIKE':
      drift = (Math.random() * 5) + 2; // Rapid increase
      break;
    case 'IMPROVING':
      drift = -(Math.random() * 3) - 1; // Steady decrease
      break;
    case 'NORMAL':
    default:
      drift = (Math.random() * 6) - 3; // Fluctuate around current
      break;
  }

  currentAQI = Math.max(10, Math.min(500, currentAQI + drift));

  return {
    aqi: Math.round(currentAQI),
    fanStatus: fanStatus,
    mode: isAutoMode ? 'auto' : 'manual'
  };
};

exports.start = async () => {
  if (!env.SIMULATION_ENABLED || env.DATA_SOURCE !== 'simulation') {
    console.log('[Simulator] Disabled by configuration.');
    return;
  }

  const device = await Device.findOne();
  if (!device) {
    console.warn('[Simulator] No device found. Waiting for seed...');
    return;
  }

  // Set device to simulated status
  device.status = 'SIMULATED';
  await device.save();

  console.log(`[Simulator] Started virtual ESP32 for device ${device.name}`);
  
  simulatorInterval = setInterval(async () => {
    const rawData = generateRealisticReading();
    
    // Inject the source tag
    rawData.source = 'simulation';

    // Route to the central pipeline
    await telemetryPipeline.processIncomingTelemetry(device._id, rawData).catch(err => {
      console.error('[Simulator] Pipeline Error:', err.message);
    });
  }, INTERVAL_MS);
};

exports.stop = () => {
  if (simulatorInterval) {
    clearInterval(simulatorInterval);
    console.log('[Simulator] Stopped.');
  }
};

// Virtual Fan interface
exports.setFanSpeed = (speed) => {
  if (speed > 0) fanStatus = true;
  else fanStatus = false;
  // In a real system, you'd calculate RPM, but for now we just acknowledge.
  console.log(`[Virtual Fan] Speed set to ${speed}%`);
};

exports.setMode = (mode) => {
  isAutoMode = mode === 'auto';
  console.log(`[Virtual Fan] Mode set to ${mode}`);
};
