const svc = require('../services/analyticsService');

exports.getKpiSummary = async (req, res, next) => {
  try {
    const data = await svc.getKpiSummary(req.query.dateRange);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getAiDiagnostic = async (req, res, next) => {
  try {
    const data = await svc.getAiDiagnostic(req.query.dateRange);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getAqiTrends = async (req, res, next) => {
  try {
    const data = await svc.getAqiTrends(req.query.dateRange);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getCompliance = async (req, res, next) => {
  try {
    const data = await svc.getCompliance(req.query.dateRange);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getGasMatrix = async (req, res, next) => {
  try {
    const data = await svc.getGasMatrix(req.query.dateRange);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getHistoricalAnomalies = async (req, res, next) => {
  try {
    const data = await svc.getHistoricalAnomalies(req.query.dateRange);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
