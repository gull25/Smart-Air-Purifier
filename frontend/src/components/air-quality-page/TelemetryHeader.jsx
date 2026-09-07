import React from 'react';

const TelemetryHeader = () => {
  const handleExport = () => {
    const timestamp = new Date().toISOString();
    const dummyData = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      unit: "HVAC Unit 04",
      node: "ESP32_MQ135",
      timestamp: timestamp,
      aqi: 61,
      eco2: 680,
      tvoc: 0.32,
      temp_c: 23.4,
      humidity_rh: 48.2,
      valid_frames_pct: 99.8
    }, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dummyData);
    dlAnchorElem.setAttribute("download", `aeropulse_telemetry_${Date.now()}.json`);
    dlAnchorElem.click();
  };

  return (
    <div className="w-full py-space-lg flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
      <div className="flex flex-col gap-space-2xs">
        <div className="flex items-center gap-space-xs text-primary font-label-caps uppercase tracking-wider">
          <span className="material-symbols-outlined text-[16px]">sensors</span>
          <span>Hardware Core Telemetry • Node 0x7F4A</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Air Quality Diagnostics &amp; Telemetry</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
          Real-time micro-spectrometry analysis and gas-sensor matrices. Synchronized via edge bus with self-calibrating zero-drift logic.
        </p>
      </div>
      
      {/* Live Stream Diagnostic Badges */}
      <div className="flex flex-wrap items-center gap-space-sm">
        <div className="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-space-sm rounded-xl shadow-sm">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
            <span className="absolute w-4 h-4 rounded-full bg-tertiary-fixed-dim/50 animate-ping"></span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface">ESP32 Live Stream</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">MQ135 Pin A0 • 1Hz High-Cadence</span>
          </div>
        </div>
        
        <div className="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-space-sm rounded-xl shadow-sm">
          <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-label-caps text-label-caps text-on-surface">Data Quality: 99.8%</span>
              <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
              <span className="font-label-caps text-label-caps text-tertiary">Valid</span>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Calibrated 2 days ago (Zero-Air ISO-7)</span>
          </div>
        </div>
        
        <button 
          className="flex items-center gap-space-2xs bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md px-space-md py-space-sm rounded-xl transition-all duration-150" 
          onClick={handleExport}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          <span>Raw Logs</span>
        </button>
      </div>
    </div>
  );
};

export default TelemetryHeader;
