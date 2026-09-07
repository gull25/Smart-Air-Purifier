const SensorReading = require('../models/SensorReading');
const Device = require('../models/Device');
const aiInferenceService = require('./aiInferenceService');

exports.processIncomingTelemetry = async (deviceId, rawData) => {
  const { aqi, fanStatus, mode, source } = rawData;

  // Validate
  if (aqi == null) throw new Error('AQI is required');

  const reading = new SensorReading({
    device: deviceId,
    aqiValue: aqi,
    aqiCategory: aqi < 50 ? 'Good' : aqi < 100 ? 'Moderate' : aqi < 150 ? 'Sensitive' : 'Unhealthy',
    fanSpeedPercentage: fanStatus ? 65 : 0, // Placeholder mapping
    fanMode: mode,
    hepaFilterLife: 84,
    carbonFilterLife: 76,
    lastUpdatedText: 'Just now',
    source: source || 'hardware'
  });
  
  await reading.save();

  // Trigger AI Pipeline independent of source
  await aiInferenceService.runInference(deviceId).catch(console.error);

  // Update Device
  await Device.findByIdAndUpdate(deviceId, {
    lastSeen: new Date(),
    fanSpeedPercentage: fanStatus ? 65 : 0,
    isAutoMode: mode === 'auto'
  });
};
