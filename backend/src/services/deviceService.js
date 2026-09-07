const Device = require('../models/Device');

/** Gets the single device document (there is one ESP32 node). */
const getDevice = async () => {
  const d = await Device.findOne().lean();
  if (!d) throw new Error('No device found. Run the seed script first.');
  return d;
};

exports.getStatus = async () => {
  const d = await getDevice();
  return {
    isOnline:       d.isOnline,
    signalStrength: d.signalStrength,
    rssi:           `${d.rssi} dBm`,
    latency:        d.latency,
  };
};

exports.getNodeProfile = async () => {
  const d = await getDevice();
  return {
    name:            d.name,
    nodeId:          d.nodeId,
    location:        d.location,
    microcontroller: d.microcontroller,
    microSpecs:      d.microSpecs,
    ipAddress:       d.ipAddress,
    macAddress:      d.macAddress,
    ssid:            d.ssid,
    wifiSpecs:       d.wifiSpecs,
    firmware:        d.firmware,
    firmwareSpecs:   d.firmwareSpecs,
    uptime:          d.uptime,
    uptimeSpecs:     d.uptimeSpecs,
  };
};

exports.getPeripherals = async () => {
  const d = await getDevice();
  return {
    mq135: {
      zeroBaseline: d.mq135ZeroBaseline,
      drift:        d.mq135Drift,
    },
    fan: {
      rpm:  Math.round(600 + d.fanSpeedPercentage * 18.8),
      temp: d.fanMotorTemp,
    },
    filter: {
      differentialPressure: d.filterDifferentialPressure,
      lifePercent:          d.filterLifePercent,
      estDays:              d.filterEstDays,
    },
  };
};

exports.getGatewayConfig = async () => {
  const d = await getDevice();
  return {
    endpoint:   d.mqttEndpoint,
    topics:     d.mqttTopics,
    tlsEnabled: d.mqttTlsEnabled,
  };
};

exports.getDiagnostics = async () => {
  const d = await getDevice();
  return {
    isVerified: d.diagnosticsVerified,
    message:    d.diagnosticsMessage,
  };
};
