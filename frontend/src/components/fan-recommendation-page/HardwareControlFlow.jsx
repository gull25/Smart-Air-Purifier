import React from 'react';

const HardwareControlFlow = ({ data }) => {
  const { vocLevel = '0', inferenceLoss = '0', targetSpeed = 50, targetRpm = '0', cfmOutput = 0 } = data || {};
  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
        <div>
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Telemetry Architecture</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">End-to-End MERN + ESP32 Hardware Control Flow</h3>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
          <span className="w-2 h-2 rounded-full bg-tertiary"></span>
          <span>End-to-End Latency: <strong className="text-on-surface">34ms</strong> (HTTP Polling)</span>
        </div>
      </div>
      
      {/* Flow Mosaic / Pipeline Pathway */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-space-sm">
        {/* Step 1: MQ135 Sensor */}
        <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md relative group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-on-surface-variant font-bold">01. INTAKE</span>
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-1">
              <span className="material-symbols-outlined text-[22px]">sensors</span>
            </div>
            <span className="font-label-md text-label-md text-on-surface font-bold">MQ135 Gas &amp; PM</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Air Intake Stream</span>
          </div>
          <div className="pt-2 bg-surface-container-low p-2 rounded-lg text-center">
            <span className="font-label-caps text-label-caps text-primary font-bold">VOC: {vocLevel} ppm</span>
          </div>
        </div>
        
        {/* Step 2: ESP32 Microcontroller (Edge ADC) */}
        <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md relative group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-on-surface-variant font-bold">02. EDGE</span>
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-1">
              <span className="material-symbols-outlined text-[22px]">memory</span>
            </div>
            <span className="font-label-md text-label-md text-on-surface font-bold">ESP32 MCU</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">12-bit ADC • Wi-Fi</span>
          </div>
          <div className="pt-2 bg-surface-container-low p-2 rounded-lg text-center">
            <span className="font-label-caps text-label-caps text-on-surface-variant font-bold">Sample: 100Hz</span>
          </div>
        </div>
        
        {/* Step 3: Node / Express Backend */}
        <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md relative group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-on-surface-variant font-bold">03. INGEST</span>
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-1">
              <span className="material-symbols-outlined text-[22px]">dns</span>
            </div>
            <span className="font-label-md text-label-md text-on-surface font-bold">Node.js Core</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">TimeSeries Telemetry</span>
          </div>
          <div className="pt-2 bg-surface-container-low p-2 rounded-lg text-center">
            <span className="font-label-caps text-label-caps text-on-surface-variant font-bold">MongoDB Synced</span>
          </div>
        </div>
        
        {/* Step 4: AI Prediction Engine */}
        <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md relative group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-secondary font-bold">04. INFERENCE</span>
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-secondary mb-1">
              <span className="material-symbols-outlined text-[22px]">model_training</span>
            </div>
            <span className="font-label-md text-label-md text-on-surface font-bold">AI Engine</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">LSTM Recurrent Net</span>
          </div>
          <div className="pt-2 bg-secondary-container/50 p-2 rounded-lg text-center">
            <span className="font-label-caps text-label-caps text-secondary font-bold">Loss: {inferenceLoss}</span>
          </div>
        </div>
        
        {/* Step 5: Fan Recommendation */}
        <div className="p-space-md rounded-2xl bg-secondary text-on-secondary shadow-md flex flex-col justify-between gap-space-md relative group">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-white/80 font-bold">05. OUTPUT</span>
            <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-ping"></span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white mb-1">
              <span className="material-symbols-outlined text-[22px]">mode_fan</span>
            </div>
            <span className="font-label-md text-label-md text-white font-bold">Target: {targetSpeed}%</span>
            <span className="font-body-sm text-body-sm text-white/80">Optimal PWM Curve</span>
          </div>
          <div className="pt-2 bg-white/20 p-2 rounded-lg text-center">
            <span className="font-label-caps text-label-caps text-white font-bold">{targetRpm} RPM</span>
          </div>
        </div>
        
        {/* Step 6: MQTT Payload Dispatch */}
        <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md relative group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-on-surface-variant font-bold">06. DISPATCH</span>
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-1">
              <span className="material-symbols-outlined text-[22px]">cell_tower</span>
            </div>
            <span className="font-label-md text-label-md text-on-surface font-bold">ESP32 MQTT</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">QoS Level 1 Pipe</span>
          </div>
          <div className="pt-2 bg-surface-container-low p-2 rounded-lg text-center">
            <span className="font-label-caps text-label-caps text-on-surface-variant font-bold">Topic: fan/pwm</span>
          </div>
        </div>
        
        {/* Step 7: True HEPA H13 Circulation Fan */}
        <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md relative group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-on-surface-variant font-bold">07. PURIFY</span>
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-tertiary mb-1">
              <span className="material-symbols-outlined text-[22px]">air</span>
            </div>
            <span className="font-label-md text-label-md text-on-surface font-bold">DC Centrifugal</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">True HEPA H13</span>
          </div>
          <div className="pt-2 bg-surface-container-low p-2 rounded-lg text-center">
            <span className="font-label-caps text-label-caps text-tertiary font-bold">{cfmOutput} CFM Output</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HardwareControlFlow;
