const AQIHistory = require('../models/AQIHistory');
const SensorReading = require('../models/SensorReading');

/** Gets the most recent AQIHistory document but overlays dynamic calculations. */
const getLatest = async (dateRange = '7d') => {
  const h = await AQIHistory.findOne().sort({ date: -1 }).lean();
  if (!h) throw new Error('No analytics history found. Run the seed script first.');
  
  // Parse date range
  let hours = 24 * 7; // default 7d
  if (dateRange === '1d') hours = 24;
  else if (dateRange === '7d') hours = 24 * 7;
  else if (dateRange === '30d') hours = 24 * 30;
  else if (dateRange === '90d') hours = 24 * 90;
  
  const since = new Date(Date.now() - hours * 60 * 60 * 1000);
  
  // Real dynamic calculation:
  const readings = await SensorReading.find({ createdAt: { $gte: since } }).sort({ createdAt: -1 }).lean();
  
  if (readings.length > 0) {
     // Calculate real average baseline from recent data
     const sumAqi = readings.reduce((sum, r) => sum + r.aqiValue, 0);
     const avgAqi = (sumAqi / readings.length).toFixed(1);
     
     // Calculate real Fan Modulation
     const sumFan = readings.reduce((sum, r) => sum + (r.fanSpeedPercentage || 0), 0);
     const avgFan = (sumFan / readings.length).toFixed(1);
     
     // Calculate Purity breakdown (count categories)
     let good = 0, mod = 0, spike = 0;
     readings.forEach(r => {
        if(r.aqiValue < 50) good++;
        else if(r.aqiValue < 100) mod++;
        else spike++;
     });
     
     const total = readings.length;
     
     h.avgBaseline = avgAqi.toString();
     h.fanModulation = avgFan + '%';
     h.purityRating = ((good/total)*100).toFixed(1) + '%';
     h.purityBreakdown = {
       good: ((good/total)*100).toFixed(1) + '%',
       mod: ((mod/total)*100).toFixed(1) + '%',
       spike: ((spike/total)*100).toFixed(1) + '%'
     };
  }

  return h;
};

exports.getKpiSummary = async (dateRange) => {
  const h = await getLatest(dateRange);
  return {
    avgBaseline:      h.avgBaseline,
    purityRating:     h.purityRating,
    purityBreakdown:  h.purityBreakdown,
    purifierRuntime:  h.purifierRuntime,
    runtimeBreakdown: h.runtimeBreakdown,
    fanModulation:    h.fanModulation,
    powerConsumption: h.powerConsumption,
    powerCost:        h.powerCost,
    mitigatedMass:    h.mitigatedMass,
  };
};

exports.getAiDiagnostic = async (dateRange) => {
  const h = await getLatest(dateRange);
  return { timeSavedMins: h.timeSavedMins };
};

exports.getAqiTrends = async (dateRange) => {
  const h = await getLatest(dateRange);
  return {
    peakSpikeResponse: h.peakSpikeResponse,
    meanAirClearance:  h.meanAirClearance,
    diurnalStability:  h.diurnalStability,
  };
};

exports.getCompliance = async (dateRange) => {
  const h = await getLatest(dateRange);
  return {
    goodPercent:      h.goodPercent,
    goodHrs:          h.goodHrs,
    modPercent:       h.modPercent,
    modHrs:           h.modHrs,
    sensitivePercent: h.sensitivePercent,
    sensitiveHrs:     h.sensitiveHrs,
  };
};

exports.getGasMatrix = async (dateRange) => {
  const h = await getLatest(dateRange);
  return h.gasMatrix;
};

exports.getHistoricalAnomalies = async (dateRange) => {
  const h = await getLatest(dateRange);
  return h.anomalies;
};

exports.getHistoricalTelemetry = async (timeframe) => {
  let hours = 24;
  if (timeframe === '1 Hour') hours = 1;
  else if (timeframe === '6 Hours') hours = 6;
  else if (timeframe === '24 Hours') hours = 24;
  else if (timeframe === '7 Days') hours = 24 * 7;
  
  const since = new Date(Date.now() - hours * 60 * 60 * 1000);
  
  const readings = await SensorReading.find({ createdAt: { $gte: since } }).sort({ createdAt: 1 }).lean();
  if (readings.length === 0) return [];

  const maxPoints = 100;
  const bucketSize = Math.max(1, Math.floor(readings.length / maxPoints));

  const chartData = [];
  for (let i = 0; i < readings.length; i += bucketSize) {
    const bucket = readings.slice(i, i + bucketSize);
    
    const avgAqi = bucket.reduce((sum, r) => sum + r.aqiValue, 0) / bucket.length;
    const avgMq135 = bucket.reduce((sum, r) => sum + (r.adcValue || 0), 0) / bucket.length;
    const avgFan = bucket.reduce((sum, r) => sum + (r.fanSpeedPercentage || 0), 0) / bucket.length;

    const date = new Date(bucket[bucket.length - 1].createdAt);
    
    let timeLabel;
    if (hours <= 24) {
      timeLabel = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    } else {
      timeLabel = `${date.getMonth()+1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    }

    const normalizedMq135 = (avgMq135 / 4095) * 150; 

    chartData.push({
      time: timeLabel,
      timestamp: date.getTime(),
      aqi: Math.round(avgAqi),
      mq135: Math.round(normalizedMq135),
      fanSpeed: Math.round(avgFan)
    });
  }

  return chartData;
};
