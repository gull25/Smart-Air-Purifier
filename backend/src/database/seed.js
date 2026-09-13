/**
 * Database Seed Script
 *
 * Populates all MongoDB collections with realistic initial data
 * that matches what mockDataService.js previously returned.
 *
 * Usage:
 *   npm run seed
 *
 * This script is idempotent — it clears all collections before
 * inserting, so it can be safely re-run to reset to a clean state.
 */

require('dotenv').config();
const mongoose = require('mongoose');

const Device       = require('../models/Device');
const SensorReading = require('../models/SensorReading');
const FanActivity  = require('../models/FanActivity');
const Prediction   = require('../models/Prediction');
const Notification = require('../models/Notification');
const AQIHistory   = require('../models/AQIHistory');
const User         = require('../models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/smart-air-purifier';

// ─── Seed Data ────────────────────────────────────────────────────────────────

const deviceData = {
  name:           'AeroPulse ESP32 Core',
  nodeId:         'Node 0x7F4A',
  location:       'Cleanroom Tier-1',
  microcontroller: 'ESP32-WROOM-32D',
  microSpecs:     'Dual-Core 240MHz • 520KB SRAM',
  ipAddress:      '192.168.1.142 (Static)',
  macAddress:     '3C:71:BF:4E:91:AA',
  ssid:           'AeroNet-IoT-Secure',
  wifiSpecs:      '98% Link • -54 dBm (WPA3)',
  rssi:           -54,
  signalStrength: '98%',
  latency:        '18ms',
  firmware:       'v2.4.12-rc Stable',
  firmwareSpecs:  'SHA: c9b2f7a • Sync 10m ago',
  uptime:         '14d 6h 22m',
  uptimeSpecs:    '0 packet loss (100% SLA)',
  isOnline:       true,
  fanSpeedPercentage: 65,
  isAutoMode:     true,
  hepaFilterLife: 84,
  carbonFilterLife: 76,
  mq135ZeroBaseline: '1.42 V',
  mq135Drift:     '+0.02%',
  filterDifferentialPressure: '14.2 Pa',
  filterLifePercent: 92,
  filterEstDays:  142,
  fanMotorTemp:   '38°C',
  mqttEndpoint:   'mqtt://broker.aeropulse.internal:8883',
  mqttTopics: [
    { name: 'aeropulse/node-04/telemetry', type: 'Publish',   color: 'primary' },
    { name: 'aeropulse/node-04/fan/pwm',   type: 'Subscribe', color: 'secondary' },
    { name: 'aeropulse/node-04/alerts',    type: 'Publish',   color: 'error' },
  ],
  mqttTlsEnabled:      true,
  diagnosticsVerified: true,
  diagnosticsMessage:  'No sensor degradation or clock skew detected across 336 consecutive operational hours. Zero-point calibration recommended again in 5 days.',
};

const sensorReadingData = (deviceId) => ({
  device:      deviceId,
  aqiValue:    61,
  aqiCategory: 'Moderate',
  analogVoltage: 1.42,
  adcValue:    1840,
  co2Ppm:      680,
  co2Status:   'GOOD',
  tvocPpb:     0.32,
  tvocStatus:  'MODERATE',
  smokePpm:    0.04,
  temperature: 23.4,
  humidity:    48.2,
  dewPoint:    11.8,
  ach:         4.8,
  fanSpeedPercentage: 65,
  fanRpm:      Math.round(600 + 65 * 18.8),
  fanMode:     'AI Auto',
  hepaFilterLife:   84,
  carbonFilterLife: 76,
  lastUpdatedText:  '12s ago',
});

const fanActivityData = (deviceId) => ({
  device:          deviceId,
  speedPercentage: 65,
  rpm:             Math.round(600 + 65 * 18.8),
  mode:            'AI Auto',
  targetSpeed:     70,
  currentRpm:      1400,
  projectedRpm:    1960,
  rpmDelta:        560,
  confidenceScore: 91,
  predictedAqiPeak: 78,
  peakTimeMins:    25,
  recoveryTimeMins: 18,
  energySavedPercent: 22,
  motorTemp:    '38°C',
  powerDraw:    '24.5',
  vibration:    '<0.2',
  pressureDrop: 120,
  vocLevel:     '0.28',
  inferenceLoss: '0.014',
  targetRpm:    '1,960',
  cfmOutput:    185,
});

const predictionData = (deviceId) => ({
  device:          deviceId,
  observedAqi:     61,
  predictedAqi:    78,
  predictedDelta:  17,
  timeToPeak:      28,
  zenithTime:      '14:48 PM',
  confidence:      87,
  errorMargin:     4.2,
  recommendedAction: 'Boost Fan to 70%',
  recommendedSpeed:  70,
  peakAqi:         78,
  currentAqi:      61,
  peakTime:        '28',
  dampenPercent:   14.6,
  goodProb:        14,
  moderateProb:    84,
  sensitiveProb:   4,
  unhealthyProb:   2,
  mq135Slope:      3.2,
  factor1Weight:   38,
  factor2Weight:   24,
  factor3Weight:   18,
  factor4Weight:   12,
  factor5Weight:   8,
  retrainTime:     'Today, 12:00 UTC',
  latency:         '42ms',
});

const notificationsData = (deviceId) => [
  {
    device:      deviceId,
    title:       'Unusual VOC spike detected',
    timeText:    '14:18 (12 mins ago)',
    description: 'Surge of +15 AQI in 4 min registered by MQ135 cell. Autonomous escalation adjusted brushless fan to 65%.',
    type:        'warning',
  },
  {
    device:      deviceId,
    title:       'HEPA filtration performance certified',
    timeText:    '13:45 (45 mins ago)',
    description: 'HEPA filter efficiency running at optimal 99.97% particulate arrest benchmark. Static differential pressure nominal.',
    type:        'success',
  },
  {
    device:      deviceId,
    title:       'ESP32 Telemetry Calibration complete',
    timeText:    '12:00 (2.5 hrs ago)',
    description: 'Analog baseline updated: 1.42V normal voltage reading at 23.4°C ambient lab temperature.',
    type:        'info',
  },
];

const aqiHistoryData = (deviceId) => ({
  device: deviceId,
  date:   new Date(),
  avgBaseline:     '48.2',
  purityRating:    '94.8%',
  purityBreakdown: { good: '78%', mod: '16.8%', spike: '5.2%' },
  purifierRuntime: '164.5',
  runtimeBreakdown: { purge: '42h', eco: '112h', idle: '10.5h' },
  fanModulation:   '48%',
  powerConsumption: '9.8',
  powerCost:       '1.42',
  mitigatedMass:   '3.48',
  timeSavedMins:   '11.4',
  peakSpikeResponse: '3.8',
  meanAirClearance:  '19.2',
  diurnalStability:  '98.4%',
  goodPercent:      78.0,
  goodHrs:          131.0,
  modPercent:       16.8,
  modHrs:           28.2,
  sensitivePercent:  5.2,
  sensitiveHrs:      8.7,
  gasMatrix: {
    morning:   { eco2: '540', tvoc: '118', drift: '+0.014V' },
    afternoon: { eco2: '620', tvoc: '242', drift: '+0.022V' },
    night:     { eco2: '412', tvoc: '42',  drift: '±0.002V' },
  },
  anomalies: [
    {
      timestamp:       'Oct 24, 15:42:10',
      location:        'Shift B • Zone 2',
      trigger:         'Solvent Vapor Spike',
      triggerColor:    'error',
      description:     'IPA 99% surface cleaning surge',
      peakAqi:         142,
      remediationMode: 'AI Autopilot Turbo 85%',
      remediationColor: 'error-container',
      duration:        '14m 20s',
      resolutionAqi:   38,
    },
    {
      timestamp:       'Oct 23, 12:18:04',
      location:        'Shift A • Cafeteria Adjacency',
      trigger:         'Cooking Aerosol Influx',
      triggerColor:    'primary-container',
      description:     'High PM2.5 particulate drift',
      peakAqi:         88,
      remediationMode: 'AI Autopilot Mode 2 (65%)',
      remediationColor: 'primary-fixed',
      duration:        '21m 45s',
      resolutionAqi:   42,
    },
    {
      timestamp:       'Oct 21, 09:05:32',
      location:        'Shift A • HVAC Intake 04',
      trigger:         'Filter Load Warning',
      triggerColor:    'secondary',
      description:     'Differential pressure micro-delta',
      peakAqi:         64,
      remediationMode: 'Manual Purge Routine',
      remediationColor: 'surface-container-highest',
      duration:        '35m 10s',
      resolutionAqi:   44,
    },
    {
      timestamp:       'Oct 19, 23:14:18',
      location:        'Night Shift • Maintenance Bay',
      trigger:         'Late Night Paint Cure',
      triggerColor:    'error',
      description:     'Hydrocarbon & Xylene presence',
      peakAqi:         178,
      remediationMode: 'AI Autopilot Turbo 100%',
      remediationColor: 'error-container',
      duration:        '28m 05s',
      resolutionAqi:   35,
    },
  ],
});

// ─── Seed Runner ─────────────────────────────────────────────────────────────

const seed = async () => {
  console.log('\n🌱  Smart Air Purifier — Database Seeder');
  console.log('─'.repeat(50));

  try {
    await mongoose.connect(MONGO_URI);
    console.log(`✅  Connected to MongoDB: ${MONGO_URI}\n`);

    // 1. Clear all collections
    console.log('🗑   Clearing existing data...');
    await Promise.all([
      Device.deleteMany({}),
      SensorReading.deleteMany({}),
      FanActivity.deleteMany({}),
      Prediction.deleteMany({}),
      Notification.deleteMany({}),
      AQIHistory.deleteMany({}),
      User.deleteMany({}),
    ]);
    console.log('    All collections cleared.\n');

    // 2. Insert Device
    console.log('📟  Seeding Device...');
    const device = await Device.create({
      ...deviceData,
      status: 'SIMULATED'
    });
    console.log(`    ✓ Device: "${device.name}" (${device.nodeId})`);

    // 3. Seed historical SensorReadings (last 7 days, 1 reading per hour)
    console.log('\n📊  Seeding 7 days of historical sensor readings...');
    const readings = [];
    const now = Date.now();
    let currentAqi = 40;
    
    // Start filters at 100%
    let hepaLife = 100;
    let carbonLife = 100;
    
    for (let i = 0; i < (7 * 24); i++) {
      // Go back in time 7 days, step forward hour by hour
      const timestamp = new Date(now - (7 * 24 * 60 * 60 * 1000) + (i * 60 * 60 * 1000));
      
      // Add realistic drift (more pollution during the day)
      const hour = timestamp.getHours();
      if (hour >= 8 && hour <= 18) {
        currentAqi += (Math.random() * 15) - 5; // Tend to rise
      } else {
        currentAqi += (Math.random() * 10) - 8; // Tend to fall
      }
      currentAqi = Math.max(10, Math.min(300, currentAqi));

      const fanSpeedPercentage = currentAqi > 100 ? 100 : currentAqi > 50 ? 50 : 25;

      // Accelerated degradation formula for seed
      const hepaBaseDecay = 0.05; // 0.05% per hour
      const carbonBaseDecay = 0.08; // 0.08% per hour
      
      const fanMultiplier = Math.max(0.5, fanSpeedPercentage / 50);
      const aqiMultiplier = Math.max(0.5, currentAqi / 50);

      hepaLife = Math.max(0, hepaLife - (hepaBaseDecay * fanMultiplier * aqiMultiplier));
      carbonLife = Math.max(0, carbonLife - (carbonBaseDecay * fanMultiplier * aqiMultiplier));

      readings.push({
        device: device._id,
        aqiValue: Math.round(currentAqi),
        aqiCategory: currentAqi < 50 ? 'Good' : currentAqi < 100 ? 'Moderate' : 'Unhealthy',
        fanSpeedPercentage,
        fanMode: 'auto',
        hepaFilterLife: Math.round(hepaLife * 10) / 10,
        carbonFilterLife: Math.round(carbonLife * 10) / 10,
        source: 'simulation',
        createdAt: timestamp,
        updatedAt: timestamp
      });
    }

    await SensorReading.insertMany(readings);

    // Update the device with final degraded values
    await Device.findByIdAndUpdate(device._id, {
       hepaFilterLife: Math.round(hepaLife * 10) / 10,
       carbonFilterLife: Math.round(carbonLife * 10) / 10,
       filterLifePercent: Math.round(((hepaLife + carbonLife) / 2) * 10) / 10
    });

    const [fan, prediction, notifications, history, adminUser] = await Promise.all([
      FanActivity.create(fanActivityData(device._id)),
      Prediction.create(predictionData(device._id)),
      Notification.insertMany(notificationsData(device._id)),
      AQIHistory.create(aqiHistoryData(device._id)),
      User.create({
        name: 'Admin User',
        email: 'admin@aeropulse.com',
        password: 'password123'
      })
    ]);

    console.log(`    ✓ ${readings.length} SensorReadings inserted`);
    console.log(`    ✓ Notifications — ${notifications.length} entries inserted`);
    console.log(`    ✓ User account created (admin@aeropulse.com / password123)`);

    console.log('\n─'.repeat(50));
    console.log('🎉  Seeding complete! Database is ready.\n');
  } catch (err) {
    console.error('\n❌  Seeding failed:', err.message);
    if (err.name === 'ValidationError') {
      Object.values(err.errors).forEach((e) => console.error(`   • ${e.path}: ${e.message}`));
    }
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌  Disconnected from MongoDB.');
  }
};

seed();
