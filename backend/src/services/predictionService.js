const Prediction = require('../models/Prediction');

/** Returns the latest AI prediction metrics. */
exports.getMetrics = async () => {
  const p = await Prediction.findOne().sort({ createdAt: -1 }).lean();
  if (!p) throw new Error('No prediction data found.');

  return {
    observedAqi:       p.observedAqi,
    predictedAqi:      p.predictedAqi,
    predictedDelta:    p.predictedDelta,
    timeToPeak:        p.timeToPeak,
    zenithTime:        p.zenithTime,
    confidence:        p.confidence,
    errorMargin:       p.errorMargin,
    recommendedAction: p.recommendedAction,
    recommendedSpeed:  p.recommendedSpeed,
  };
};

/** Returns forecast chart data based on timeframe. */
exports.getChart = async (timeframe = '1H') => {
  const p = await Prediction.findOne().sort({ createdAt: -1 }).lean();
  if (!p) throw new Error('No prediction data found.');

  // Parse timeframe to get total historical minutes we want to show
  let historyMinutes = 60;
  if (timeframe === '4H') historyMinutes = 240;
  if (timeframe === '12H') historyMinutes = 720;
  if (timeframe === '24H') historyMinutes = 1440;

  // Generate historical data points (mocking based on currentAqi for simplicity, 
  // or fetch from SensorReading if preferred. Let's fetch real history if available)
  const SensorReading = require('../models/SensorReading');
  const now = new Date();
  const startTime = new Date(now.getTime() - historyMinutes * 60000);
  
  const readings = await SensorReading.find({
    createdAt: { $gte: startTime, $lte: now }
  }).sort({ createdAt: 1 }).lean();

  const dataPoints = [];

  // Downsample to manageable points (e.g. max 10 historical points)
  const maxHistPoints = 10;
  const step = Math.max(1, Math.floor(readings.length / maxHistPoints));
  
  for (let i = 0; i < readings.length; i += step) {
    const reading = readings[i];
    const timeStr = new Date(reading.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    dataPoints.push({
      time: timeStr,
      aqiHistorical: reading.aqiValue,
      aqiForecast: null,
      aqiLower: null,
      aqiUpper: null,
      isNow: false
    });
  }

  // Ensure "NOW" is the last historical point
  const currentAqi = p.currentAqi || (readings.length > 0 ? readings[readings.length - 1].aqiValue : 40);
  const nowTimeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  dataPoints.push({
    time: nowTimeStr,
    aqiHistorical: currentAqi,
    aqiForecast: currentAqi, // Connects the two lines
    aqiLower: currentAqi,
    aqiUpper: currentAqi,
    isNow: true
  });

  // Generate Forecast data points
  const peakTimeMinutes = parseInt(p.peakTime) || 30; // Minutes into the future
  const peakAqi = p.peakAqi;
  const numForecastPoints = 4;
  
  for (let i = 1; i <= numForecastPoints; i++) {
    const futureMinutes = (peakTimeMinutes / numForecastPoints) * i;
    const futureTime = new Date(now.getTime() + futureMinutes * 60000);
    const timeStr = futureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Simple linear interpolation to peak
    const forecastAqi = currentAqi + ((peakAqi - currentAqi) * (i / numForecastPoints));
    
    // Widen confidence band as we go further out
    const margin = i * 2 + 5; 

    dataPoints.push({
      time: timeStr,
      aqiHistorical: null,
      aqiForecast: Math.round(forecastAqi),
      aqiLower: Math.max(0, Math.round(forecastAqi - margin)),
      aqiUpper: Math.round(forecastAqi + margin),
      isNow: false
    });
  }

  return {
    peakAqi: p.peakAqi,
    currentAqi: p.currentAqi,
    peakTime: p.peakTime,
    dampenPercent: p.dampenPercent,
    series: dataPoints
  };
};

/** Returns probability trajectory matrix data. */
exports.getTrajectory = async () => {
  const p = await Prediction.findOne().sort({ createdAt: -1 }).lean();
  if (!p) throw new Error('No prediction data found.');

  return {
    goodProb:      p.goodProb,
    moderateProb:  p.moderateProb,
    sensitiveProb: p.sensitiveProb,
    unhealthyProb: p.unhealthyProb,
  };
};

/** Returns XAI feature importance data. */
exports.getXai = async () => {
  const p = await Prediction.findOne().sort({ createdAt: -1 }).lean();
  if (!p) throw new Error('No prediction data found.');

  return {
    mq135Slope:   p.mq135Slope,
    factor1Weight: p.factor1Weight,
    factor2Weight: p.factor2Weight,
    factor3Weight: p.factor3Weight,
    factor4Weight: p.factor4Weight,
    factor5Weight: p.factor5Weight,
  };
};

/** Returns model metadata for the predictions header. */
exports.getHeader = async () => {
  const p = await Prediction.findOne().sort({ createdAt: -1 }).lean();
  if (!p) throw new Error('No prediction data found.');

  return {
    retrainTime: p.retrainTime,
    latency:     p.latency,
  };
};
