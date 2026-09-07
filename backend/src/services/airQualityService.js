const SensorReading = require('../models/SensorReading');
const Device        = require('../models/Device');

/** Returns master AQI gauge data for the Air Quality page. */
exports.getMasterGaugeData = async () => {
  const latest = await SensorReading.findOne().sort({ createdAt: -1 }).lean();
  if (!latest) throw new Error('No sensor data found.');

  // In a real system, min/max/avg would come from a 24h aggregation.
  // For now we derive them from the seed values.
  return {
    value:     latest.aqiValue,
    category:  latest.aqiCategory,
    min24h:    38,
    minTime:   '04:12 AM',
    max24h:    89,
    maxTime:   '12:35 PM',
    avg24h:    54,
    avgStatus: 'Balanced',
  };
};

/** Returns gas breakdown panel data. */
exports.getGasBreakdownData = async () => {
  const latest = await SensorReading.findOne().sort({ createdAt: -1 }).lean();
  if (!latest) throw new Error('No sensor data found.');

  return {
    adc:     latest.adcValue,
    voltage: latest.analogVoltage,
    co2:     { value: latest.co2Ppm,  status: latest.co2Status,  limit: 800 },
    tvoc:    { value: latest.tvocPpb, status: latest.tvocStatus, limit: 0.50 },
    smoke:   { value: latest.smokePpm, status: latest.smokePpm < 0.1 ? 'CLEAN' : 'MODERATE' },
  };
};

/** Returns ambient dynamics panel data. */
exports.getAmbientDynamicsData = async () => {
  const latest = await SensorReading.findOne().sort({ createdAt: -1 }).lean();
  if (!latest) throw new Error('No sensor data found.');

  return {
    temperature: { value: latest.temperature, target: 22.0 },
    humidity:    { value: latest.humidity,    dewPoint: latest.dewPoint },
    ach:         { value: latest.ach,         rpm: latest.fanRpm },
  };
};

/** Returns filtration health panel data. */
exports.getFiltrationHealthData = async () => {
  const device = await Device.findOne().lean();
  if (!device) throw new Error('No device found.');

  return {
    overallEfficiency: device.filterLifePercent,
    preFilter:         device.filterLifePercent,
    hepa:              device.hepaFilterLife,
    carbon:            device.carbonFilterLife,
    diffPressure:      parseFloat(device.filterDifferentialPressure) || 14.2,
  };
};
