import React from 'react';

const DeviceManagementHeader = ({ setIsRebootModalOpen, appendLog, data }) => {
  const { isOnline = false, signalStrength = '0%', rssi = '0 dBm', latency = '0ms' } = data || {};
  const handleOtaCheck = () => {
    appendLog('OTA', 'Querying firmware CDN server for ESP32 target v2.4.x...', 'text-primary-fixed-dim');
    setTimeout(() => {
      appendLog('OTA', 'Firmware v2.4.12-rc is the latest stable build. Node is up-to-date.', 'text-tertiary-fixed-dim');
    }, 800);
  };

  const handleZeroCal = () => {
    appendLog('ADC', 'Zero-point calibration routine initiated. Sampling baseline (N=128)...', 'text-secondary-fixed');
    setTimeout(() => {
      appendLog('ADC', 'Calibration matrix converged. New offset stored to NVS: 1.420V.', 'text-tertiary-fixed-dim');
    }, 900);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
      <div className="flex flex-col gap-space-2xs">
        <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
          <span className="hover:text-primary transition-colors cursor-pointer">Smart Facility</span>
          <span className="text-outline-variant">/</span>
          <span className="text-on-surface font-semibold">HVAC Unit 04 Fleet Core</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Device Management &amp; ESP32 Fleet Controller</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
          Hardware node diagnostics, Wi-Fi telemetry bridge, sensor calibration matrices, and remote firmware lifecycle.
        </p>
      </div>
      
      {/* Live Heartbeat & Fleet Quick Actions */}
      <div className="flex flex-wrap items-center gap-space-sm">
        <div className="flex items-center gap-space-xs px-space-sm py-space-2xs bg-surface-container-low rounded-full">
          <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-tertiary animate-pulse' : 'bg-error'}`}></span>
          <span className="font-label-md text-label-md text-on-surface">{isOnline ? 'ESP32 Online' : 'Offline'}</span>
          <span className="text-outline-variant">•</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">{signalStrength} Sig ({rssi})</span>
          <span className="text-outline-variant">•</span>
          <span className="font-label-caps text-label-caps text-secondary font-bold">{latency} Latency</span>
        </div>
        <button 
          className="px-space-md py-space-xs rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-variant font-label-md text-label-md transition-colors flex items-center gap-space-2xs" 
          onClick={handleOtaCheck}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">system_update</span>
          OTA Check
        </button>
        <button 
          className="px-space-md py-space-xs rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-variant font-label-md text-label-md transition-colors flex items-center gap-space-2xs" 
          onClick={handleZeroCal}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          Calibrate Zero-Point
        </button>
        <button 
          className="px-space-md py-space-xs rounded-xl bg-error-container text-on-error-container hover:opacity-90 font-label-md text-label-md transition-colors flex items-center gap-space-2xs" 
          onClick={() => setIsRebootModalOpen(true)}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">restart_alt</span>
          Reboot
        </button>
        <button className="px-space-md py-space-xs rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md transition-colors shadow-sm flex items-center gap-space-2xs" type="button">
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          Register New Node
        </button>
      </div>
    </div>
  );
};

export default DeviceManagementHeader;
