const svc = require('../services/predictionService');

exports.getMetrics = async (req, res, next) => {
  try {
    const data = await svc.getMetrics();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getChart = async (req, res, next) => {
  try {
    const timeframe = req.query.timeframe || '1H';
    const data = await svc.getChart(timeframe);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getTrajectory = async (req, res, next) => {
  try {
    const data = await svc.getTrajectory();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getXai = async (req, res, next) => {
  try {
    const data = await svc.getXai();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getHeader = async (req, res, next) => {
  try {
    const data = await svc.getHeader();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
