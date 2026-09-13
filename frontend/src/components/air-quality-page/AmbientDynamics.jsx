import React from 'react';

const AmbientDynamics = ({ data }) => {
  const { temperature, humidity, ach } = data || {};
  
  const getTempStatus = (val, target) => {
    if (!val) return 'Idle';
    const diff = val - (target || 22);
    if (Math.abs(diff) <= 2) return 'Optimal Balance';
    return diff > 0 ? 'Cooling Recommended' : 'Heating Recommended';
  };

  const getHumidityStatus = (val) => {
    if (!val) return 'Idle';
    if (val < 30) return 'Too Dry for Filtration';
    if (val > 60) return 'Mold Risk / Check Filters';
    return 'Ideal for HEPA Lifespan';
  };

  const getAchStatus = (val) => {
    if (!val || val === 0) return 'Idle / No Flow';
    if (val > 4) return 'High Cleansing Flow';
    return 'Active Circulation';
  };

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
          <span className="font-label-md text-label-md text-tertiary">{getTempStatus(temperature?.value, temperature?.target)}</span>
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
          <span className="font-label-md text-label-md text-tertiary">{getHumidityStatus(humidity?.value)}</span>
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
          <span className="font-label-md text-label-md text-primary">{getAchStatus(ach?.value)}</span>
          <span className="text-on-surface-variant font-body-sm">Fan RPM: {ach?.rpm ? ach.rpm.toLocaleString() : 0}</span>
        </div>
      </div>
    </div>
  );
};

export default AmbientDynamics;
