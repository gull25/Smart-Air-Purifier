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

/** Returns forecast chart data. */
exports.getChart = async () => {
  const p = await Prediction.findOne().sort({ createdAt: -1 }).lean();
  if (!p) throw new Error('No prediction data found.');

  return {
    peakAqi:       p.peakAqi,
    currentAqi:    p.currentAqi,
    peakTime:      p.peakTime,
    dampenPercent: p.dampenPercent,
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
