const mongoose = require('mongoose');

/**
 * Device — represents a single ESP32 IoT node.
 *
 * One document per physical device. The seed creates one document
 * for "AeroPulse Core Node-01". The ESP32 can update fields like
 * `lastSeen`, `fanSpeedPercentage`, and `filterLifePercent` via PATCH.
 */
const deviceSchema = new mongoose.Schema(
  {
    // Identity
    name:           { type: String, required: true },
    nodeId:         { type: String, required: true, unique: true },
    location:       { type: String, required: true },

    // Hardware specs
    microcontroller: { type: String, required: true },
    microSpecs:      { type: String },

    // Network
    ipAddress:  { type: String },
    macAddress: { type: String },
    ssid:       { type: String },
    wifiSpecs:  { type: String },
    rssi:       { type: Number },             // dBm e.g. -54
    signalStrength: { type: String },         // e.g. "98%"
    latency:    { type: String },             // e.g. "18ms"

    // Firmware
    firmware:      { type: String },
    firmwareSpecs: { type: String },

    // Operational
    uptime:      { type: String },
    uptimeSpecs: { type: String },
    status:      { type: String, enum: ['ONLINE', 'OFFLINE', 'SIMULATED'], default: 'SIMULATED' },
    lastSeen:    { type: Date, default: Date.now },

    // Fan + filter state (mutable by ESP32 or dashboard)
    fanSpeedPercentage: { type: Number, default: 65, min: 0, max: 100 },
    isAutoMode:         { type: Boolean, default: true },
    hepaFilterLife:     { type: Number, default: 84, min: 0, max: 100 },
    carbonFilterLife:   { type: Number, default: 76, min: 0, max: 100 },

    // MQ135 sensor calibration state
    mq135ZeroBaseline:  { type: String },
    mq135Drift:         { type: String },

    // HEPA filter diagnostics
    filterDifferentialPressure: { type: String },
    filterLifePercent:          { type: Number, default: 92, min: 0, max: 100 },
    filterEstDays:              { type: Number },

    // Fan motor telemetry (updated on each telemetry push)
    fanMotorTemp: { type: String },

    // MQTT gateway config
    mqttEndpoint: { type: String },
    mqttTopics: [
      {
        name:  { type: String },
        type:  { type: String, enum: ['Publish', 'Subscribe'] },
        color: { type: String },
      },
    ],
    mqttTlsEnabled: { type: Boolean, default: true },

    // AI Fleet Diagnostics
    diagnosticsVerified: { type: Boolean, default: false },
    diagnosticsMessage:  { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Device', deviceSchema);
