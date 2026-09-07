const mongoose = require('mongoose');

/**
 * SensorReading — a point-in-time snapshot from the ESP32 + MQ135 sensor.
 *
 * Each time the ESP32 publishes telemetry, a new document is inserted.
 * The dashboard and air-quality pages query the most recent document.
 * The analytics page aggregates older documents for trends.
 *
 * Index on `createdAt` (descending) for fast "latest reading" queries.
 */
const sensorReadingSchema = new mongoose.Schema(
  {
    device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },

    // AQI
    aqiValue:    { type: Number, required: true },
    aqiCategory: { type: String, enum: ['Good', 'Moderate', 'Unhealthy for Sensitive', 'Unhealthy', 'Very Unhealthy', 'Hazardous'] },

    // MQ135 raw readings
    analogVoltage: { type: Number },           // e.g. 1.42 V
    adcValue:      { type: Number },           // e.g. 1840

    // Derived gas estimates
    co2Ppm:    { type: Number },               // eCO2 in ppm
    co2Status: { type: String },
    tvocPpb:   { type: Number },               // TVOC in ppb
    tvocStatus:{ type: String },
    smokePpm:  { type: Number },

    // Ambient
    temperature: { type: Number },             // °C
    humidity:    { type: Number },             // %
    dewPoint:    { type: Number },

    // Air changes per hour
    ach: { type: Number },

    // Fan state at time of reading
    fanSpeedPercentage: { type: Number },
    fanRpm:             { type: Number },
    fanMode:            { type: String },      // 'AI Auto' | 'Manual'

    // Filter state at time of reading
    hepaFilterLife:   { type: Number },
    carbonFilterLife: { type: Number },

    // The data source
    source: { type: String, enum: ['simulation', 'hardware'], default: 'simulation', required: true },

    // For dashboard "last updated" display
    lastUpdatedText: { type: String },
  },
  {
    timestamps: true,
  }
);

// Fast descending index — used by every "get latest reading" query
sensorReadingSchema.index({ createdAt: -1 });

// Compound index for per-device latest queries
sensorReadingSchema.index({ device: 1, createdAt: -1 });

module.exports = mongoose.model('SensorReading', sensorReadingSchema);
