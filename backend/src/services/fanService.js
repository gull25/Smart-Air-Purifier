const FanActivity = require('../models/FanActivity');

/** Returns AI fan decision data. */
exports.getAIDecision = async () => {
  const fan = await FanActivity.findOne().sort({ createdAt: -1 }).lean();
  if (!fan) throw new Error('No fan activity data found.');

  return {
    targetSpeed:        fan.targetSpeed,
    currentRpm:         fan.currentRpm,
    projectedRpm:       fan.projectedRpm,
    rpmDelta:           fan.rpmDelta,
    confidenceScore:    fan.confidenceScore,
    predictedAqiPeak:   fan.predictedAqiPeak,
    peakTimeMins:       fan.peakTimeMins,
    recoveryTimeMins:   fan.recoveryTimeMins,
    energySavedPercent: fan.energySavedPercent,
  };
};

/** Returns live motor telemetry with slight random variance to simulate live data. */
exports.getTelemetry = async () => {
  const fan = await FanActivity.findOne().sort({ createdAt: -1 }).lean();
  if (!fan) throw new Error('No fan activity data found.');

  // Add small variance to simulate live sensor readings
  const tempVariance  = (Math.random() * 2 - 1).toFixed(1);
  const powerVariance = (Math.random() * 1.5 - 0.75).toFixed(1);
  const dropVariance  = Math.floor(Math.random() * 5 - 2);

  const baseTemp  = parseFloat(fan.motorTemp) || 38;
  const basePower = parseFloat(fan.powerDraw) || 24.5;
  const baseDrop  = fan.pressureDrop || 120;

  return {
    motorTemp:    (baseTemp  + parseFloat(tempVariance)).toFixed(1),
    powerDraw:    (basePower + parseFloat(powerVariance)).toFixed(1),
    vibration:    fan.vibration,
    pressureDrop: baseDrop + dropVariance,
  };
};

/** Returns hardware flow data. */
exports.getHardwareFlow = async () => {
  const fan = await FanActivity.findOne().sort({ createdAt: -1 }).lean();
  if (!fan) throw new Error('No fan activity data found.');

  return {
    vocLevel:      fan.vocLevel,
    inferenceLoss: fan.inferenceLoss,
    targetSpeed:   fan.targetSpeed || 50,
    targetRpm:     fan.projectedRpm || fan.targetRpm, // Map projected to target for frontend
    cfmOutput:     fan.cfmOutput,
  };
};
