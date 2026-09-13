const mqtt = require('mqtt');
const env = require('../../config/env');
const Device = require('../../models/Device');
const telemetryPipeline = require('../../services/telemetryPipeline');

let client = null;

exports.start = () => {
  if (env.DATA_SOURCE !== 'mqtt') {
    console.log('[MQTT] Disabled by configuration (DATA_SOURCE is not mqtt).');
    return;
  }

  const brokerUrl = env.MQTT_BROKER_URL;
  const options = {
    username: env.MQTT_USERNAME || undefined,
    password: env.MQTT_PASSWORD || undefined,
    reconnectPeriod: 5000, // Reconnect every 5 seconds if disconnected
  };

  console.log(`[MQTT] Connecting to broker at ${brokerUrl}...`);
  client = mqtt.connect(brokerUrl, options);

  client.on('connect', () => {
    console.log(`[MQTT] Connected successfully to ${brokerUrl}`);
    
    // Subscribe to telemetry topic (e.g. device/+/telemetry)
    const telemetryTopic = env.MQTT_TOPIC_TELEMETRY.replace('+', '#'); // Using # to catch all subtopics just in case
    client.subscribe(telemetryTopic, (err) => {
      if (err) {
        console.error(`[MQTT] Failed to subscribe to ${telemetryTopic}`, err);
      } else {
        console.log(`[MQTT] Subscribed to telemetry on ${telemetryTopic}`);
      }
    });
  });

  client.on('message', async (topic, message) => {
    try {
      const payloadString = message.toString();
      const data = JSON.parse(payloadString);
      
      // In a multi-device setup, we would extract the device ID from the topic.
      // E.g., topic: device/60d5ec49c12345/telemetry
      // For this MVP, we assume a single device seeded in the database.
      const device = await Device.findOne();
      if (!device) {
        console.warn('[MQTT] Received telemetry but no device found in DB.');
        return;
      }

      // Mark source as mqtt so pipeline knows it's real
      data.source = 'mqtt';

      // Example expected payload from ESP32: { aqi: 45, fanStatus: true, mode: 'auto' }
      // This routes the physical hardware data directly into the DB and AI Engine.
      await telemetryPipeline.processIncomingTelemetry(device._id, data);
    } catch (err) {
      console.error('[MQTT] Error processing incoming message:', err.message);
    }
  });

  client.on('error', (err) => {
    console.error('[MQTT] Connection Error:', err.message);
  });
  
  client.on('close', () => {
    console.log('[MQTT] Connection closed.');
  });
};

/**
 * Publishes a command to the ESP32.
 * @param {string} deviceId 
 * @param {object} payload 
 */
exports.publishCommand = async (deviceId, payload) => {
  if (!client || !client.connected) {
    throw new Error('MQTT client is not connected. Cannot send command.');
  }

  // Construct topic: device/{id}/cmd
  // We use the general topic format from env and replace the wildcard.
  let commandTopic = env.MQTT_TOPIC_COMMAND.replace('+', deviceId.toString());
  
  const message = JSON.stringify(payload);
  
  return new Promise((resolve, reject) => {
    client.publish(commandTopic, message, { qos: 1 }, (err) => {
      if (err) {
        console.error(`[MQTT] Failed to publish command to ${commandTopic}:`, err.message);
        return reject(err);
      }
      console.log(`[MQTT] Published command to ${commandTopic}: ${message}`);
      resolve(true);
    });
  });
};
