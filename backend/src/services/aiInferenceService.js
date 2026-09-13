const Prediction = require('../models/Prediction');
const SensorReading = require('../models/SensorReading');
const FanActivity = require('../models/FanActivity');

/**
 * Runs a heuristic "AI" inference based on the latest sensor data.
 * @param {ObjectId} deviceId 
 */
exports.runInference = async (deviceId) => {
  // Fetch device settings
  const device = await require('../models/Device').findById(deviceId).lean();
  const aggMode = device?.aiAggressiveness || 'Balanced';
  const nightMode = device?.nightModeEnabled ?? true;
  const sensitivity = device?.aqiSensitivity || 55;

  // 1. Get the last 10 sensor readings to calculate the trend (derivative)
  const readings = await SensorReading.find({ device: deviceId })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  if (readings.length < 2) return; // Not enough data to predict

  const currentReading = readings[0];
  const oldestReading = readings[readings.length - 1];

  // Calculate the slope (change in AQI over the number of readings)
  const aqiDelta = currentReading.aqiValue - oldestReading.aqiValue;
  const slope = aqiDelta / readings.length;

  // 2. Heuristics for Prediction
  let predictedAqi = currentReading.aqiValue;
  let timeToPeak = 0;
  let recommendedAction = 'Maintain current speed';
  let recommendedSpeed = currentReading.fanSpeedPercentage || 50;

  // Aggressiveness tuning
  const rampUpMultiplier = aggMode === 'Rapid' ? 1.5 : (aggMode === 'Eco' ? 0.7 : 1.0);
  const rampDownMultiplier = aggMode === 'Rapid' ? 0.8 : (aggMode === 'Eco' ? 1.5 : 1.0);

  if (slope > 0 && currentReading.aqiValue > sensitivity * 0.8) {
    // AQI is rising. 
    predictedAqi = currentReading.aqiValue + (slope * 20 * rampUpMultiplier);
    timeToPeak = 15; // 15 mins
    
    if (slope > 2 * (1 / rampUpMultiplier)) {
      recommendedAction = 'Boost Fan to Turbo';
      recommendedSpeed = 100;
    } else if (slope > 0.5 * (1 / rampUpMultiplier)) {
      recommendedAction = 'Increase Fan to Standard';
      recommendedSpeed = aggMode === 'Rapid' ? 85 : (aggMode === 'Eco' ? 55 : 65);
    }
  } else if (slope <= 0) {
    // AQI is dropping or stable
    predictedAqi = Math.max(10, currentReading.aqiValue + (slope * 20));
    timeToPeak = 0; // Already peaked
    
    if (currentReading.aqiValue < sensitivity) {
      recommendedAction = 'Reduce Fan to Eco';
      recommendedSpeed = aggMode === 'Rapid' ? 50 : (aggMode === 'Eco' ? 25 : 40);
    }
  }

  // Night Mode Override (22:00 to 07:00)
  const nowHour = new Date().getHours();
  const isNight = nowHour >= 22 || nowHour < 7;
  
  if (nightMode && isNight) {
    if (currentReading.aqiValue < 150) {
      recommendedSpeed = Math.min(recommendedSpeed, 30);
      recommendedAction = 'Night Mode (Capped at 30%)';
    } else {
      recommendedAction = 'Hazard Override (Night Mode bypassed)';
    }
  }

  // 3. Probabilities based on current AQI and slope
  let goodProb = 0, moderateProb = 0, sensitiveProb = 0, unhealthyProb = 0;
  
  if (predictedAqi < 50) {
    goodProb = 85; moderateProb = 10; sensitiveProb = 5; unhealthyProb = 0;
  } else if (predictedAqi < 100) {
    goodProb = 10; moderateProb = 75; sensitiveProb = 10; unhealthyProb = 5;
  } else if (predictedAqi < 150) {
    goodProb = 0; moderateProb = 15; sensitiveProb = 60; unhealthyProb = 25;
  } else {
    goodProb = 0; moderateProb = 0; sensitiveProb = 20; unhealthyProb = 80;
  }

  // 4. Calculate Zenith Time (just current time + timeToPeak)
  const zenithDate = new Date(Date.now() + timeToPeak * 60000);
  const zenithTime = `${zenithDate.getHours()}:${zenithDate.getMinutes().toString().padStart(2, '0')}`;

  // Calculate dynamic XAI Feature Weights
  // Base weights
  let w1 = Math.abs(slope * 10) + 10; // Slope weight (higher when slope is steep)
  let w2 = isNight ? 10 : 25; // Time of day (less important at night)
  let w3 = 15; // Ambient equilibrium (temp/humidity)
  let w4 = currentReading.fanSpeedPercentage > 70 ? 25 : 10; // High fan speed = higher factor
  let w5 = 10; // External weather baseline
  
  // Normalize weights to sum to 100
  const totalWeight = w1 + w2 + w3 + w4 + w5;
  const factor1Weight = Math.round((w1 / totalWeight) * 100);
  const factor2Weight = Math.round((w2 / totalWeight) * 100);
  const factor3Weight = Math.round((w3 / totalWeight) * 100);
  const factor4Weight = Math.round((w4 / totalWeight) * 100);
  const factor5Weight = 100 - (factor1Weight + factor2Weight + factor3Weight + factor4Weight);

  // 5. Create new Prediction document
  const prediction = new Prediction({
    device: deviceId,
    observedAqi: currentReading.aqiValue,
    predictedAqi: Math.round(predictedAqi),
    predictedDelta: Math.round(predictedAqi - currentReading.aqiValue),
    timeToPeak: timeToPeak,
    zenithTime: zenithTime,
    confidence: 85 - Math.abs(Math.round(slope * 5)), // Lower confidence if slope is crazy
    errorMargin: Math.abs(Math.round(slope * 2)),
    recommendedAction: recommendedAction,
    recommendedSpeed: recommendedSpeed,
    peakAqi: Math.round(predictedAqi),
    currentAqi: currentReading.aqiValue,
    peakTime: timeToPeak.toString(),
    dampenPercent: 15,
    goodProb,
    moderateProb,
    sensitiveProb,
    unhealthyProb,
    mq135Slope: Number(slope.toFixed(2)),
    factor1Weight,
    factor2Weight,
    factor3Weight,
    factor4Weight,
    factor5Weight,
    retrainTime: 'Continuous (Heuristic)',
    latency: '12ms'
  });

  await prediction.save();

  // 6. Update FanActivity for the UI widget
  const projectedRpm = Math.round((recommendedSpeed / 100) * 3920); // 3920 is max RPM
  const currentRpm = Math.round(((currentReading.fanSpeedPercentage || 50) / 100) * 3920);
  const rpmDelta = projectedRpm - currentRpm;

  await FanActivity.findOneAndUpdate(
    {}, 
    {
      targetSpeed: recommendedSpeed,
      projectedRpm: projectedRpm,
      rpmDelta: rpmDelta,
      confidenceScore: 85 - Math.abs(Math.round(slope * 5)),
      predictedAqiPeak: Math.round(predictedAqi),
      peakTimeMins: timeToPeak,
      recoveryTimeMins: Math.round(timeToPeak * 1.5), // Estimate recovery time
      energySavedPercent: Math.round((100 - recommendedSpeed) / 2) // Estimate energy savings
    },
    { sort: { createdAt: -1 } }
  );
};
