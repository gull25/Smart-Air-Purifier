#include <WiFi.h>
#include <HTTPClient.h>
#include <WebServer.h>
#include <ArduinoJson.h>

// WiFi Configuration
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Backend Configuration
const char* backendUrl = "http://YOUR_BACKEND_IP:5000/api/telemetry"; 

// Pin Definitions
const int mq135Pin = 34; // Analog pin for MQ135 sensor
const int fanRelayPin = 5; // Digital pin for Relay/Transistor controlling the fan

// Web Server for manual control commands from backend
WebServer server(80);

bool isAutoMode = true;
bool fanStatus = false;
int aqiThreshold = 100; // AQI threshold to turn on fan in auto mode

void setup() {
  Serial.begin(115200);
  
  pinMode(fanRelayPin, OUTPUT);
  digitalWrite(fanRelayPin, LOW); // Fan off by default

  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  // Setup Web Server Endpoints
  server.on("/fan", HTTP_POST, handleFanControl);
  server.on("/mode", HTTP_POST, handleModeControl);
  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  server.handleClient();

  // Read Sensor
  int rawValue = analogRead(mq135Pin);
  // Simple mapping (calibration needed for real AQI)
  int currentAQI = map(rawValue, 0, 4095, 0, 500);

  // Auto Mode Logic
  if (isAutoMode) {
    if (currentAQI > aqiThreshold && !fanStatus) {
      digitalWrite(fanRelayPin, HIGH);
      fanStatus = true;
      Serial.println("Auto Mode: High AQI detected. Fan ON.");
    } else if (currentAQI <= aqiThreshold && fanStatus) {
      digitalWrite(fanRelayPin, LOW);
      fanStatus = false;
      Serial.println("Auto Mode: AQI normal. Fan OFF.");
    }
  }

  // Send Telemetry (every 5 seconds)
  static unsigned long lastSendTime = 0;
  if (millis() - lastSendTime > 5000) {
    sendTelemetry(currentAQI);
    lastSendTime = millis();
  }
}

void sendTelemetry(int aqi) {
  if(WiFi.status() == WL_CONNECTED){
    HTTPClient http;
    http.begin(backendUrl);
    http.addHeader("Content-Type", "application/json");

    StaticJsonDocument<200> doc;
    doc["aqi"] = aqi;
    doc["fanStatus"] = fanStatus;
    doc["mode"] = isAutoMode ? "auto" : "manual";

    String requestBody;
    serializeJson(doc, requestBody);

    int httpResponseCode = http.POST(requestBody);
    if(httpResponseCode > 0){
      Serial.print("Telemetry sent successfully, response code: ");
      Serial.println(httpResponseCode);
    } else {
      Serial.print("Error sending telemetry: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  }
}

void handleFanControl() {
  if (server.hasArg("plain") == false) {
    server.send(400, "text/plain", "Body not received");
    return;
  }
  
  String body = server.arg("plain");
  StaticJsonDocument<200> doc;
  DeserializationError error = deserializeJson(doc, body);

  if (error) {
    server.send(400, "text/plain", "Invalid JSON");
    return;
  }

  if (doc.containsKey("state")) {
    bool newState = doc["state"];
    if(!isAutoMode) {
      fanStatus = newState;
      digitalWrite(fanRelayPin, fanStatus ? HIGH : LOW);
      server.send(200, "application/json", "{\"status\":\"success\", \"message\":\"Fan state updated\"}");
    } else {
       server.send(400, "application/json", "{\"status\":\"error\", \"message\":\"Cannot change fan in Auto Mode\"}");
    }
  } else {
    server.send(400, "text/plain", "Missing 'state' in JSON");
  }
}

void handleModeControl() {
  if (server.hasArg("plain") == false) {
    server.send(400, "text/plain", "Body not received");
    return;
  }
  
  String body = server.arg("plain");
  StaticJsonDocument<200> doc;
  DeserializationError error = deserializeJson(doc, body);

  if (error) {
    server.send(400, "text/plain", "Invalid JSON");
    return;
  }

  if (doc.containsKey("autoMode")) {
    isAutoMode = doc["autoMode"];
    server.send(200, "application/json", "{\"status\":\"success\", \"message\":\"Mode updated\"}");
  } else {
    server.send(400, "text/plain", "Missing 'autoMode' in JSON");
  }
}
