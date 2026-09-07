import React from 'react';

const DeviceCard = ({ data }) => {
  const { temperature, humidity, wifiRssi, status } = data || {};

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Microcontroller</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">ESP32 Node-01</span>
        </div>
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-caps text-label-caps font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> {status || 'OFFLINE'}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-space-sm my-space-sm">
        <div className="bg-surface-container-low p-space-sm rounded-xl">
          <div className="flex items-center gap-1 text-on-surface-variant mb-1">
            <span className="material-symbols-outlined text-[16px]">thermostat</span>
            <span className="font-label-caps text-label-caps">Ambient</span>
          </div>
          <span className="font-telemetry-value-md text-telemetry-value-md text-on-surface">{temperature || 0}°</span>
          <span className="block font-body-sm text-body-sm text-on-surface-variant">Optimal range</span>
        </div>
        <div className="bg-surface-container-low p-space-sm rounded-xl">
          <div className="flex items-center gap-1 text-on-surface-variant mb-1">
            <span className="material-symbols-outlined text-[16px]">humidity_percentage</span>
            <span className="font-label-caps text-label-caps">Humidity</span>
          </div>
          <span className="font-telemetry-value-md text-telemetry-value-md text-on-surface">{humidity || 0}%</span>
          <span className="block font-body-sm text-body-sm text-on-surface-variant">Relative RH</span>
        </div>
      </div>
      <div className="flex items-center justify-between p-space-sm rounded-xl bg-surface-container">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-primary">wifi</span>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface font-semibold">Wi-Fi RSSI</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">{wifiRssi || 0} dBm (Excellent)</span>
          </div>
        </div>
        <span className="font-label-caps text-label-caps text-tertiary font-bold">100% Link</span>
      </div>
    </div>
  );
};

export default DeviceCard;
