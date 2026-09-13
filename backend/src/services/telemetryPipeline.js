const SensorReading = require('../models/SensorReading');
const Device = require('../models/Device');
const FanActivity = require('../models/FanActivity');
const aiInferenceService = require('./aiInferenceService');

exports.processIncomingTelemetry = async (deviceId, rawData) => {
  const { aqi, fanStatus, mode, source } = rawData;

  // Validate
  if (aqi == null) throw new Error('AQI is required');

  const device = await Device.findById(deviceId);
  if (!device) throw new Error('Device not found');

  const fanSpeedPercentage = fanStatus ? 65 : 0; // Placeholder mapping

  // Algorithmic micro-degradation for 5-second interval
  // 5 seconds is 1/720 of an hour.
  const hepaBaseDecay = 0.05 / 720; 
  const carbonBaseDecay = 0.08 / 720;
  
  const fanMultiplier = Math.max(0.5, fanSpeedPercentage / 50);
  const aqiMultiplier = Math.max(0.5, aqi / 50);

  const newHepaLife = Math.max(0, device.hepaFilterLife - (hepaBaseDecay * fanMultiplier * aqiMultiplier));
  const newCarbonLife = Math.max(0, device.carbonFilterLife - (carbonBaseDecay * fanMultiplier * aqiMultiplier));
  const newFilterPercent = (newHepaLife + newCarbonLife) / 2;

  const reading = new SensorReading({
    device: deviceId,
    aqiValue: aqi,
    aqiCategory: aqi < 50 ? 'Good' : aqi < 100 ? 'Moderate' : aqi < 150 ? 'Sensitive' : 'Unhealthy',
    fanSpeedPercentage,
    fanMode: mode,
    hepaFilterLife: Math.round(newHepaLife * 10) / 10,
    carbonFilterLife: Math.round(newCarbonLife * 10) / 10,
    lastUpdatedText: 'Just now',
    source: source || 'hardware'
  });
  
  await reading.save();

  // Trigger AI Pipeline independent of source
  await aiInferenceService.runInference(deviceId).catch(console.error);

  // Update Device
  await Device.findByIdAndUpdate(deviceId, {
    lastSeen: new Date(),
    fanSpeedPercentage,
    isAutoMode: mode === 'auto',
    hepaFilterLife: newHepaLife,
    carbonFilterLife: newCarbonLife,
    filterLifePercent: newFilterPercent
  });

  // Update FanActivity currentRpm based on real hardware data
  const currentRpm = Math.round((fanSpeedPercentage / 100) * 3920);
  await FanActivity.findOneAndUpdate(
    {}, 
    { $set: { currentRpm: currentRpm } },
    { sort: { createdAt: -1 } }
  );
};
