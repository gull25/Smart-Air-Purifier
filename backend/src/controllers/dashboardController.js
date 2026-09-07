const svc = require('../services/dashboardService');

exports.getStatus = async (req, res, next) => {
  try {
    const data = await svc.getDashboardStatus();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getAiInsight = async (req, res, next) => {
  try {
    const data = await svc.getDashboardAiInsight();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getChartData = async (req, res, next) => {
  try {
    const data = await svc.getDashboardChartData();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getHardwareInfo = async (req, res, next) => {
  try {
    const data = await svc.getDashboardHardware();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getAlerts = async (req, res, next) => {
  try {
    const data = await svc.getDashboardAlerts();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.updateFanControl = async (req, res, next) => {
  try {
    const { speed, autoMode } = req.body;
    const data = await svc.updateFanControl(speed, autoMode);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
