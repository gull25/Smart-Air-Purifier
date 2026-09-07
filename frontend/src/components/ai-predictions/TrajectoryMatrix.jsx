import React from 'react';

const TrajectoryMatrix = ({ data }) => {
  const { goodProb = 0, moderateProb = 0, sensitiveProb = 0, unhealthyProb = 0 } = data || {};

  return (
    <div className="lg:col-span-5 bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-space-xs">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">AQI Status Trajectory Matrix</h3>
          <span className="material-symbols-outlined text-outline text-[20px]">tune</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">
          Continuous Bayesian probabilistic classification across standard EPA air quality thresholds for this forecast cycle.
        </p>

        <div className="flex flex-col gap-space-md">
          {/* 0-50 Good */}
          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-1 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-tertiary"></span>
                <span className="font-label-md text-label-md text-on-surface">0 – 50 Good</span>
              </div>
              <span className="font-label-caps text-label-caps text-tertiary font-bold">{goodProb}% Prob</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant pl-5">Baseline held until 13:40; VOC build-up shifted ambient state upwards.</p>
          </div>

          {/* 51-100 Moderate (Active/Target) */}
          <div className="p-space-md rounded-xl bg-amber-500/10 border-l-4 border-amber-500 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></span>
                <span className="font-label-md text-label-md text-on-surface font-bold">51 – 100 Moderate</span>
              </div>
              <span className="px-space-xs py-0.5 rounded-full bg-amber-500/20 text-amber-900 font-label-caps text-label-caps font-bold">{moderateProb}% PROBABILITY</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface pl-5">
              <strong>Current (61) &amp; Target (78):</strong> High stability in this tier with steady upward slope. Safely within non-toxic thresholds.
            </p>
          </div>

          {/* 101-150 Sensitive */}
          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                <span className="font-label-md text-label-md text-on-surface">101 – 150 Sensitive</span>
              </div>
              <span className="font-label-caps text-label-caps text-on-surface-variant">{sensitiveProb}% Prob</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant pl-5">Potential breach only triggered if ventilation fan drops below 50% RPM.</p>
          </div>

          {/* 151+ Unhealthy */}
          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-1 opacity-75">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-error"></span>
                <span className="font-label-md text-label-md text-on-surface">151+ Unhealthy</span>
              </div>
              <span className="font-label-caps text-label-caps text-on-surface-variant">{unhealthyProb}% Prob</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant pl-5">Negligible risk under active cleanroom ventilation protocol.</p>
          </div>
        </div>
      </div>

      <div className="mt-space-lg pt-space-md bg-surface-container-low p-space-md rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">verified_user</span>
          <span className="font-label-md text-label-md text-on-surface">Ensemble Health Check</span>
        </div>
        <span className="font-label-caps text-label-caps text-tertiary">All Weights Normal</span>
      </div>
    </div>
  );
};

export default TrajectoryMatrix;
