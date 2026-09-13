const mqttClient = require('../mqtt/mqttClient');
const env = require('../../config/env');
const virtualFanController = require('../virtualFan/virtualFanController');

exports.sendFanSpeedCommand = async (deviceId, speed) => {
  if (env.DATA_SOURCE === 'mqtt') {
    // Send via MQTT
    await mqttClient.publishCommand(deviceId, { action: 'set_fan', speed });
    return { success: true, message: `Command sent via MQTT to set fan to ${speed}%` };
  } else {
    // Fallback to Simulator/Virtual for local dev without hardware
    return await virtualFanController.sendFanSpeedCommand(deviceId, speed);
  }
};

exports.sendModeCommand = async (deviceId, isAutoMode) => {
  if (env.DATA_SOURCE === 'mqtt') {
    // Send via MQTT
    const mode = isAutoMode ? 'auto' : 'manual';
    await mqttClient.publishCommand(deviceId, { action: 'set_mode', mode });
    return { success: true, message: `Command sent via MQTT to set mode to ${mode}` };
  } else {
    // Fallback to Simulator/Virtual
    return await virtualFanController.sendModeCommand(deviceId, isAutoMode);
  }
};
