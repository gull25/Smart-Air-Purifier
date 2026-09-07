const mongoose = require('mongoose');

/**
 * Notification — system alert and diagnostic log entries.
 *
 * New documents are inserted when the ESP32 detects anomalies
 * or when the AI system raises alerts. The dashboard queries
 * the most recent N documents.
 */
const notificationSchema = new mongoose.Schema(
  {
    device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },

    title:       { type: String, required: true },
    description: { type: String },
    type:        { type: String, enum: ['warning', 'success', 'info', 'error'], default: 'info' },

    // Human-readable timestamp string for the dashboard display
    timeText: { type: String },

    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

notificationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
