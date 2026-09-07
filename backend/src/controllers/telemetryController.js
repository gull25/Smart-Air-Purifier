const Device = require('../models/Device');
const telemetryPipeline = require('../services/telemetryPipeline');

exports.receiveTelemetry = async (req, res, next) => {
  try {
    const { aqi, fanStatus, mode, source } = req.body;
    
    // In a real scenario, deviceId would be sent by the ESP32.
    // For this project, we'll find the first device or create a dummy one.
    let device = await Device.findOne();
    if (!device) {
      device = await Device.create({
        name: 'Auto-Provisioned Device',
        nodeId: 'NODE-001',
        location: 'Default Zone',
        microcontroller: 'ESP32'
      });
    }

    // Call central pipeline
    await telemetryPipeline.processIncomingTelemetry(device._id, {
      aqi, fanStatus, mode, source: source || 'hardware'
    });

    res.status(200).json({ success: true, message: 'Telemetry received and processed' });
  } catch (error) {
    console.error('Telemetry Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
