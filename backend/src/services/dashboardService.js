const Device        = require('../models/Device');
const SensorReading = require('../models/SensorReading');
const Notification  = require('../models/Notification');

const FAN_BASE_RPM = 600;
const FAN_RPM_PER_PERCENT = 18.8;
const calcFanRpm = (pct) => Math.round(FAN_BASE_RPM + pct * FAN_RPM_PER_PERCENT);

/** Returns all data required by the Dashboard page. */
exports.getDashboardStatus = async () => {
  const [latest, device] = await Promise.all([
    SensorReading.findOne().sort({ createdAt: -1 }).lean(),
    Device.findOne().lean(),
  ]);

  if (!latest || !device) throw new Error('No sensor data found. Run the seed script first.');

  return {
    aqi: {
      value:           latest.aqiValue,
      category:        latest.aqiCategory,
      analogVoltage:   latest.analogVoltage,
      adcValue:        latest.adcValue,
      lastUpdatedText: latest.lastUpdatedText,
    },
    device: {
      temperature: latest.temperature,
      humidity:    latest.humidity,
      wifiRssi:    device.rssi,
      status:      device.isOnline ? 'ONLINE' : 'OFFLINE',
    },
    fan: {
      speedPercentage:  device.fanSpeedPercentage,
      rpm:              calcFanRpm(device.fanSpeedPercentage),
      mode:             device.isAutoMode ? 'AI Auto' : 'Manual',
      hepaFilterLife:   device.hepaFilterLife,
      carbonFilterLife: device.carbonFilterLife,
    },
  };
};

/** Returns AI insight card data for the Dashboard. */
exports.getDashboardAiInsight = async () => {
  const Prediction = require('../models/Prediction');
  const p = await Prediction.findOne().sort({ createdAt: -1 }).lean();
  if (!p) throw new Error('No prediction data found.');

  return {
    currentIndex:         p.observedAqi,
    predictedIndex:       p.predictedAqi,
    horizonMinutes:       p.timeToPeak,
    confidencePercentage: p.confidence,
    surgePercentage:      parseFloat(((p.predictedAqi - p.observedAqi) / p.observedAqi * 100).toFixed(1)),
    surgeValue:           p.predictedDelta,
    recommendationTitle:  'Autonomous Recommendation & Forecast',
    recommendationMessage:`Air quality is gradually worsening. The system predicts a moderate increase in AQI over the next ${p.timeToPeak} minutes. AI recommends increasing fan speed to ${p.recommendedSpeed}%.`,
    recommendedSpeed:     p.recommendedSpeed,
    reasoning:            'Driven by VOC accumulation slope',
    reasoningFactors:     `Input factors: MQ135 VOC baseline slope (+1.8V/hr), 24h diurnal HVAC patterns, room humidity (${48}%), ambient temperature (${23.4}°C).`,
  };
};

/** Returns 24h chart summary data for the Dashboard. */
exports.getDashboardChartData = async () => {
  const latest = await SensorReading.findOne().sort({ createdAt: -1 }).lean();
  if (!latest) throw new Error('No sensor data found.');

  // Fetch the last 30 readings for the chart
  const history = await SensorReading.find()
    .sort({ createdAt: -1 })
    .limit(30)
    .lean();
    
  // Reverse to get chronological order
  history.reverse();

  const series = history.map(h => {
    const d = new Date(h.createdAt);
    return {
      time: `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`,
      aqi: h.aqiValue,
      predictedAqi: null // We will populate the last point with prediction later
    };
  });

  // Get the latest prediction for the dotted line
  const Prediction = require('../models/Prediction');
  const p = await Prediction.findOne().sort({ createdAt: -1 }).lean();

  if (p && series.length > 0) {
    // Add prediction as a future data point connected to the last point
    const lastPoint = series[series.length - 1];
    
    // Convert timeToPeak to future timestamp
    const futureDate = new Date(latest.createdAt);
    futureDate.setMinutes(futureDate.getMinutes() + (p.timeToPeak || 15));
    
    // Set the last point's predictedAqi to equal its actual AQI so the line connects seamlessly
    lastPoint.predictedAqi = lastPoint.aqi;

    series.push({
      time: `${futureDate.getHours()}:${futureDate.getMinutes().toString().padStart(2, '0')}`,
      aqi: null, // No actual reading yet
      predictedAqi: p.predictedAqi
    });
  }

  return {
    series, // time-series for Recharts
    gas:  { value: parseFloat((latest.adcValue / 100 || 0).toFixed(1)), unit: 'PPM', name: 'MQ135 Gas' },
    co2:  { value: latest.co2Ppm || 400,  unit: 'PPM',   name: 'CO2 Equivalent' },
    pm25: { value: Math.round(latest.aqiValue / 4), unit: 'µg/m³', name: 'PM2.5 Estimate' },
  };
};

/** Returns hardware snapshot for the Dashboard. */
exports.getDashboardHardware = async () => {
  const device = await Device.findOne().lean();
  if (!device) throw new Error('No device found.');

  return {
    firmwareVersion: device.firmware,
    macAddress:      device.macAddress,
    uptime:          device.uptime,
    deviceName:      `${device.name} ${device.location}`,
    statusText:      device.isOnline ? 'Active Purge' : 'Offline',
  };
};

/** Returns recent alerts for the Dashboard. */
exports.getDashboardAlerts = async () => {
  return Notification.find().sort({ createdAt: -1 }).limit(5).lean();
};

/**
 * Updates the fan speed and auto mode on the Device document.
 * This is the single source of truth for fan state in MongoDB.
 */
exports.updateFanControl = async (speed, autoMode) => {
  const update = {};
  if (speed !== undefined)    update.fanSpeedPercentage = speed;
  if (autoMode !== undefined) update.isAutoMode = autoMode;

  const device = await Device.findOneAndUpdate({}, update, { new: true, lean: true });
  if (!device) throw new Error('No device found to update.');

  return { speed: device.fanSpeedPercentage, autoMode: device.isAutoMode };
};
