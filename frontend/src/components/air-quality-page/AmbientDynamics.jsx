import React from 'react';

const AmbientDynamics = ({ data }) => {
  const { temperature, humidity, ach } = data || {};

  return (
    <div className="lg:col-span-3 flex flex-col gap-space-md">
      {/* Temp Card */}
      <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between flex-1">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Thermal State</span>
          <span className="material-symbols-outlined text-primary text-[20px]">thermostat</span>
        </div>
        <div className="flex items-baseline gap-2 my-space-xs">
          <span className="font-telemetry-value-md text-telemetry-value-md text-on-surface">{temperature?.value || 0}</span>
          <span className="font-body-lg text-body-lg text-on-surface-variant">°C</span>
        </div>
        <div className="flex items-center justify-between text-body-sm">
          <span className="font-label-md text-label-md text-tertiary">Optimal Balance</span>
          <span className="text-on-surface-variant font-body-sm">Target: {temperature?.target || 0}°C</span>
        </div>
      </div>
      
      {/* Relative Humidity */}
      <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between flex-1">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Moisture Ratio</span>
          <span className="material-symbols-outlined text-secondary text-[20px]">humidity_percentage</span>
        </div>
        <div className="flex items-baseline gap-2 my-space-xs">
          <span className="font-telemetry-value-md text-telemetry-value-md text-on-surface">{humidity?.value || 0}</span>
          <span className="font-body-lg text-body-lg text-on-surface-variant">% RH</span>
        </div>
        <div className="flex items-center justify-between text-body-sm">
          <span className="font-label-md text-label-md text-tertiary">Ideal for HEPA Lifespan</span>
          <span className="text-on-surface-variant font-body-sm">Dew Point: {humidity?.dewPoint || 0}°C</span>
        </div>
      </div>
      
      {/* Air Exchange Rate (ACH) */}
      <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between flex-1">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Displacement Rate</span>
          <span className="material-symbols-outlined text-primary-container text-[20px]">cyclone</span>
        </div>
        <div className="flex items-baseline gap-2 my-space-xs">
          <span className="font-telemetry-value-md text-telemetry-value-md text-on-surface">{ach?.value || 0}</span>
          <span className="font-body-lg text-body-lg text-on-surface-variant">ACH</span>
        </div>
        <div className="flex items-center justify-between text-body-sm">
          <span className="font-label-md text-label-md text-primary">High Cleansing Flow</span>
          <span className="text-on-surface-variant font-body-sm">Fan RPM: {ach?.rpm ? ach.rpm.toLocaleString() : 0}</span>
        </div>
      </div>
    </div>
  );
};

export default AmbientDynamics;
