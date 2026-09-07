const mongoose = require('mongoose');

/**
 * FanActivity — current fan state and motor telemetry.
 *
 * One document per device (upserted on each fan event).
 * The dashboard's fan control PATCH updates this document.
 * Motor telemetry (temp, power, vibration) is refreshed on each push.
 */
const fanActivitySchema = new mongoose.Schema(
  {
    device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },

    // Current operating state
    speedPercentage: { type: Number, required: true, min: 0, max: 100 },
    rpm:             { type: Number },
    mode:            { type: String, enum: ['AI Auto', 'Manual'], default: 'AI Auto' },

    // AI decision context
    targetSpeed:        { type: Number },
    currentRpm:         { type: Number },
    projectedRpm:       { type: Number },
    rpmDelta:           { type: Number },
    confidenceScore:    { type: Number },
    predictedAqiPeak:   { type: Number },
    peakTimeMins:       { type: Number },
    recoveryTimeMins:   { type: Number },
    energySavedPercent: { type: Number },

    // Live motor telemetry
    motorTemp:    { type: String },
    powerDraw:    { type: String },             // watts e.g. "24.5"
    vibration:    { type: String },             // e.g. "<0.2"
    pressureDrop: { type: Number },             // Pa

    // Hardware flow data
    vocLevel:       { type: String },
    inferenceLoss:  { type: String },
    targetRpm:      { type: String },
    cfmOutput:      { type: Number },
  },
  { timestamps: true }
);

fanActivitySchema.index({ device: 1 });

module.exports = mongoose.model('FanActivity', fanActivitySchema);
