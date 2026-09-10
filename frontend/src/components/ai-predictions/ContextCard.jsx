import React from 'react';

const ContextCard = () => {
  return (
    <div className="w-full bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm flex flex-col md:flex-row items-center gap-space-xl">
      <div className="w-full md:w-1/3 h-52 rounded-xl overflow-hidden relative shadow-sm">
        <div className="w-full h-full bg-surface-container flex items-center justify-center text-primary/40">
          <span className="material-symbols-outlined text-[80px]">sensors</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-space-md">
          <span className="font-label-caps text-label-caps text-white uppercase tracking-wider">Cleanroom Tier-1 Chamber</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-space-sm">
        <div className="flex items-center gap-2">
          <span className="px-space-xs py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-caps text-label-caps uppercase">Proactive Protection</span>
          <span className="text-on-surface-variant font-body-sm text-body-sm">Automated HEPA cycling in standby</span>
        </div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface">Preemptive Clean Air Protocol Ready</h3>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Rather than reacting after volatile gases accumulate in the breathing zone, AeroPulse AI models the indoor aerodynamic dispersion rate 30 minutes in advance. When current trends exceed 75 AQI, the centrifugal fan ramps dynamically to 70% before occupants notice particulate elevation.
        </p>
        <div className="flex items-center gap-space-md pt-space-xs">
          <button className="px-space-md py-space-xs bg-primary text-on-primary rounded-xl font-label-md text-label-md hover:bg-primary-container transition-all" type="button">
            Review Automated Rules
          </button>
          <button className="px-space-md py-space-xs bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-label-md text-label-md transition-all" type="button">
            Export Model Telemetry
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContextCard;
