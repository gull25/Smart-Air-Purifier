const env = require('../../config/env');
const axios = require('axios');
const simulatorService = require('../simulator/simulatorService');
const Device = require('../../models/Device');

exports.sendFanSpeedCommand = async (deviceId, speed) => {
  if (env.DATA_SOURCE === 'simulation' || env.SIMULATION_ENABLED) {
    // 1. Notify Simulator
    simulatorService.setFanSpeed(speed);
    
    // 2. Update DB State
    await Device.findByIdAndUpdate(deviceId, { fanSpeedPercentage: speed });
    
    return { success: true, message: 'Virtual Fan speed updated', simulated: true };
  } else {
    // Hardware Mode
    const ESP32_URL = process.env.ESP32_URL || 'http://192.168.1.100';
    const response = await axios.post(`${ESP32_URL}/fan`, { state: speed });
    
    await Device.findByIdAndUpdate(deviceId, { fanSpeedPercentage: speed });
    return { success: true, message: 'Command sent to ESP32', espResponse: response.data, simulated: false };
  }
};

exports.sendModeCommand = async (deviceId, isAutoMode) => {
  if (env.DATA_SOURCE === 'simulation' || env.SIMULATION_ENABLED) {
    simulatorService.setMode(isAutoMode ? 'auto' : 'manual');
    
    await Device.findByIdAndUpdate(deviceId, { isAutoMode });
    
    return { success: true, message: 'Virtual Mode updated', simulated: true };
  } else {
    // Hardware Mode
    const ESP32_URL = process.env.ESP32_URL || 'http://192.168.1.100';
    const response = await axios.post(`${ESP32_URL}/mode`, { autoMode: isAutoMode });
    
    await Device.findByIdAndUpdate(deviceId, { isAutoMode });
    return { success: true, message: 'Command sent to ESP32', espResponse: response.data, simulated: false };
  }
};
