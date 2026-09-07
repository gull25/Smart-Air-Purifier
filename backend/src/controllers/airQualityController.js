const svc = require('../services/airQualityService');

exports.getMasterGauge = async (req, res, next) => {
  try {
    const data = await svc.getMasterGaugeData();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getGasBreakdown = async (req, res, next) => {
  try {
    const data = await svc.getGasBreakdownData();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getAmbientDynamics = async (req, res, next) => {
  try {
    const data = await svc.getAmbientDynamicsData();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getFiltrationHealth = async (req, res, next) => {
  try {
    const data = await svc.getFiltrationHealthData();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
