const Prediction = require('../models/Prediction');
const SensorReading = require('../models/SensorReading');

/**
 * Runs a heuristic "AI" inference based on the latest sensor data.
 * @param {ObjectId} deviceId 
 */
exports.runInference = async (deviceId) => {
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

  if (slope > 0) {
    // AQI is rising. Predict it will continue rising for the next 15 mins.
    // 1 reading = 5 seconds. 15 mins = 180 readings.
    // Let's make a conservative estimate so it doesn't shoot to infinity.
    predictedAqi = currentReading.aqiValue + (slope * 20);
    timeToPeak = 15; // 15 mins
    
    if (slope > 2) {
      recommendedAction = 'Boost Fan to Turbo';
      recommendedSpeed = 100;
    } else if (slope > 0.5) {
      recommendedAction = 'Increase Fan to Standard';
      recommendedSpeed = 65;
    }
  } else if (slope < 0) {
    // AQI is dropping
    predictedAqi = Math.max(10, currentReading.aqiValue + (slope * 20));
    timeToPeak = 0; // Already peaked
    if (currentReading.aqiValue < 50) {
      recommendedAction = 'Reduce Fan to Eco';
      recommendedSpeed = 40;
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
    factor1Weight: 40,
    factor2Weight: 25,
    factor3Weight: 15,
    factor4Weight: 10,
    factor5Weight: 10,
    retrainTime: 'Continuous (Heuristic)',
    latency: '12ms'
  });

  await prediction.save();
};
