const svc = require('../services/deviceService');

exports.getStatus = async (req, res, next) => {
  try {
    const data = await svc.getStatus();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getNodeProfile = async (req, res, next) => {
  try {
    const data = await svc.getNodeProfile();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getPeripherals = async (req, res, next) => {
  try {
    const data = await svc.getPeripherals();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getGatewayConfig = async (req, res, next) => {
  try {
    const data = await svc.getGatewayConfig();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getDiagnostics = async (req, res, next) => {
  try {
    const data = await svc.getDiagnostics();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getConfig = async (req, res, next) => {
  try {
    const data = await svc.getConfig();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

const hardwareController = require('../integrations/hardware/hardwareController');
const Device = require('../models/Device');

exports.controlFan = async (req, res, next) => {
  try {
    const { state } = req.body;
    let device = await Device.findOne();
    if (!device) return res.status(404).json({ success: false, message: 'No device found' });
    
    const result = await hardwareController.sendFanSpeedCommand(device._id, state);
    res.json(result);
  } catch (err) {
    console.error("Error controlling fan:", err.message);
    res.status(503).json({ success: false, message: 'Controller unreachable' });
  }
};

exports.controlMode = async (req, res, next) => {
  try {
    const { autoMode } = req.body;
    let device = await Device.findOne();
    if (!device) return res.status(404).json({ success: false, message: 'No device found' });
    
    const result = await hardwareController.sendModeCommand(device._id, autoMode);
    res.json(result);
  } catch (err) {
    console.error("Error controlling mode:", err.message);
    res.status(503).json({ success: false, message: 'Controller unreachable' });
  }
};

exports.updateConfig = async (req, res, next) => {
  try {
    const { aiAggressiveness, nightModeEnabled, aqiSensitivity } = req.body;
    
    // Find the primary device
    let device = await Device.findOne();
    if (!device) return res.status(404).json({ success: false, message: 'No device found' });
    
    // Update fields if provided
    if (aiAggressiveness !== undefined) device.aiAggressiveness = aiAggressiveness;
    if (nightModeEnabled !== undefined) device.nightModeEnabled = nightModeEnabled;
    if (aqiSensitivity !== undefined) device.aqiSensitivity = aqiSensitivity;
    
    await device.save();
    
    res.json({ success: true, data: device });
  } catch (err) {
    console.error("Error updating config:", err.message);
    res.status(500).json({ success: false, message: 'Failed to update configuration' });
  }
};
