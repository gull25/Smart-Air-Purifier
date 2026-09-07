const mongoose = require('mongoose');

/**
 * Prediction — output of the AI inference engine.
 *
 * One document per inference run. The AI Predictions page queries
 * the most recent document. A new document is inserted each time
 * the model re-runs (every N minutes in a real system).
 */
const predictionSchema = new mongoose.Schema(
  {
    device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },

    // Core metrics
    observedAqi:       { type: Number, required: true },
    predictedAqi:      { type: Number, required: true },
    predictedDelta:    { type: Number },
    timeToPeak:        { type: Number },           // minutes
    zenithTime:        { type: String },           // e.g. '14:48 PM'
    confidence:        { type: Number },           // 0–100
    errorMargin:       { type: Number },
    recommendedAction: { type: String },
    recommendedSpeed:  { type: Number },

    // Chart data
    peakAqi:        { type: Number },
    currentAqi:     { type: Number },
    peakTime:       { type: String },
    dampenPercent:  { type: Number },

    // Trajectory probabilities (%)
    goodProb:       { type: Number },
    moderateProb:   { type: Number },
    sensitiveProb:  { type: Number },
    unhealthyProb:  { type: Number },

    // XAI feature importance
    mq135Slope:     { type: Number },
    factor1Weight:  { type: Number },
    factor2Weight:  { type: Number },
    factor3Weight:  { type: Number },
    factor4Weight:  { type: Number },
    factor5Weight:  { type: Number },

    // Model metadata
    retrainTime: { type: String },
    latency:     { type: String },
  },
  { timestamps: true }
);

predictionSchema.index({ createdAt: -1 });
predictionSchema.index({ device: 1, createdAt: -1 });

module.exports = mongoose.model('Prediction', predictionSchema);
