const svc = require('../services/fanService');

exports.getAIDecision = async (req, res, next) => {
  try {
    const data = await svc.getAIDecision();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getTelemetry = async (req, res, next) => {
  try {
    const data = await svc.getTelemetry();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getHardwareFlow = async (req, res, next) => {
  try {
    const data = await svc.getHardwareFlow();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
