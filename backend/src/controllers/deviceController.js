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

const virtualFanController = require('../integrations/virtualFan/virtualFanController');
const Device = require('../models/Device');

exports.controlFan = async (req, res, next) => {
  try {
    const { state } = req.body;
    let device = await Device.findOne();
    if (!device) return res.status(404).json({ success: false, message: 'No device found' });
    
    const result = await virtualFanController.sendFanSpeedCommand(device._id, state);
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
    
    const result = await virtualFanController.sendModeCommand(device._id, autoMode);
    res.json(result);
  } catch (err) {
    console.error("Error controlling mode:", err.message);
    res.status(503).json({ success: false, message: 'Controller unreachable' });
  }
};
