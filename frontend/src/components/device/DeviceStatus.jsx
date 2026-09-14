import React from 'react';

const DeviceStatus = ({ data }) => {
  const { speedPercentage, rpm, mode, hepaFilterLife, carbonFilterLife } = data || {};
  const strokeDashoffset = 201.06 - ((speedPercentage || 0) / 100) * 201.06;

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Purifier Dynamic</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">Brushless DC Motor</span>
        </div>
        <div className="flex items-center bg-surface-container px-2 py-1 rounded-full text-primary font-label-caps text-label-caps">
          <span className="material-symbols-outlined text-[14px] mr-1 text-tertiary">bolt</span> {mode || 'Unknown'}
        </div>
      </div>
      <div className="my-space-sm flex items-center justify-between gap-space-md">
        <div className="relative flex items-center justify-center">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80">
            <circle className="stroke-surface-container" cx="40" cy="40" fill="none" r="32" strokeWidth="7"></circle>
            <circle cx="40" cy="40" fill="none" r="32" stroke="#006194" strokeDasharray="201.06" strokeDashoffset={strokeDashoffset} strokeLinecap="round" strokeWidth="7" style={{ transition: 'stroke-dashoffset 0.5s ease' }}></circle>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-telemetry-value-md text-telemetry-value-md text-primary">{speedPercentage || 0}%</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-label-md text-label-md text-on-surface">{rpm ? rpm.toLocaleString() : 0} RPM</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">Centrifugal Flow</span>
          <span className="font-label-caps text-label-caps text-tertiary mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping"></span> Purifying Air
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 pt-space-xs bg-surface-container-low p-space-sm rounded-xl">
        <div className="flex justify-between items-center text-[11px] font-bold">
          <span className="text-on-surface-variant">HEPA H13</span>
          <span className="text-on-surface">{(hepaFilterLife || 0).toFixed(1)}%</span>
        </div>
        <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
          <div className="bg-tertiary h-full rounded-full transition-all" style={{ width: `${hepaFilterLife || 0}%` }}></div>
        </div>
        <div className="flex justify-between items-center text-[11px] font-bold mt-1">
          <span className="text-on-surface-variant">Carbon Filter</span>
          <span className="text-on-surface">{(carbonFilterLife || 0).toFixed(1)}%</span>
        </div>
        <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
          <div className="bg-secondary h-full rounded-full transition-all" style={{ width: `${carbonFilterLife || 0}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default DeviceStatus;
