import React from 'react';

const ContextCard = ({ metrics, config }) => {
  const timeToPeak = metrics?.timeToPeak || 30;
  const sensitivity = config?.aqiSensitivity || 75;
  const recommendedSpeed = metrics?.recommendedSpeed || 70;

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
          Rather than reacting after volatile gases accumulate in the breathing zone, AeroPulse AI models the indoor aerodynamic dispersion rate {timeToPeak} minutes in advance. When current trends exceed {sensitivity} AQI, the centrifugal fan ramps dynamically to {recommendedSpeed}% before occupants notice particulate elevation.
        </p>
      </div>
    </div>
  );
};

export default ContextCard;
