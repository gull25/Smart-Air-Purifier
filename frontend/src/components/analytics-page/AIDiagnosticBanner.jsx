import React from 'react';

const AIDiagnosticBanner = ({ data }) => {
  const { timeSavedMins = '0' } = data || {};
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md border-l-4 border-l-secondary">
      <div className="flex items-center gap-space-md">
        <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
          <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
        </div>
        <div className="flex flex-col">
          <span className="font-headline-sm text-headline-sm text-on-surface">AeroPulse Closed-Loop Optimization Engine</span>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Automated PWM dynamic damping reduced sudden VOC &amp; PM2.5 spikes by an average of <span className="font-label-md text-on-surface">{timeSavedMins} minutes faster</span> compared to static threshold logic.
          </p>
        </div>
      </div>
      <button className="flex items-center gap-space-xs px-space-md py-space-xs rounded-xl bg-surface-container-low hover:bg-surface-container-high font-label-md text-label-md text-primary transition-all self-end md:self-auto" type="button">
        <span>Inspect Predictive Vectors</span>
        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
      </button>
    </div>
  );
};

export default AIDiagnosticBanner;
