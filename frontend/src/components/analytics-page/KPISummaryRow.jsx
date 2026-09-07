import React from 'react';

const KPISummaryRow = ({ data }) => {
  const { avgBaseline = '0', purityRating = '0%', purityBreakdown = { good: '0%', mod: '0%', spike: '0%' }, purifierRuntime = '0', runtimeBreakdown = { purge: '0h', eco: '0h', idle: '0h' }, fanModulation = '0%', powerConsumption = '0', powerCost = '0', mitigatedMass = '0' } = data || {};
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
      {/* KPI 1: Average AQI */}
      <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider">Average Baseline</span>
          <span className="material-symbols-outlined text-primary text-[20px]">air</span>
        </div>
        <div className="my-space-sm flex flex-col">
          <span className="font-telemetry-value-lg text-telemetry-value-lg text-on-surface tracking-tight">{avgBaseline}</span>
          <div className="flex items-center gap-space-2xs mt-space-2xs">
            <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-label-caps">Good • Optimal</span>
          </div>
        </div>
        <div className="flex items-center gap-space-2xs text-tertiary">
          <span className="material-symbols-outlined text-[16px]">trending_down</span>
          <span className="font-body-sm text-body-sm font-medium">-4.6% vs previous week</span>
        </div>
      </div>
      
      {/* KPI 2: Air Quality Purity Rate */}
      <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider">Purity Rating</span>
          <span className="material-symbols-outlined text-tertiary text-[20px]">verified</span>
        </div>
        <div className="my-space-sm flex flex-col">
          <span className="font-telemetry-value-lg text-telemetry-value-lg text-tertiary tracking-tight">{purityRating}</span>
          <span className="font-label-md text-label-md text-on-surface">Clean Air Target</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden flex">
            <div className="bg-tertiary h-full" style={{ width: purityBreakdown.good }}></div>
            <div className="bg-primary-container h-full" style={{ width: purityBreakdown.mod }}></div>
            <div className="bg-error h-full" style={{ width: purityBreakdown.spike }}></div>
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant">{purityBreakdown.good} Good • {purityBreakdown.mod} Mod • {purityBreakdown.spike} Spikes</span>
        </div>
      </div>
      
      {/* KPI 3: Total Purifier Runtime */}
      <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider">Purifier Runtime</span>
          <span className="material-symbols-outlined text-primary text-[20px]">timelapse</span>
        </div>
        <div className="my-space-sm flex flex-col">
          <span className="font-telemetry-value-lg text-telemetry-value-lg text-on-surface tracking-tight">{purifierRuntime}<span className="font-headline-sm text-headline-sm text-on-surface-variant">h</span></span>
          <span className="font-label-md text-label-md text-on-surface">Active Duty Cycle</span>
        </div>
        <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
          <span>Purge: {runtimeBreakdown.purge}</span>
          <span>Eco: {runtimeBreakdown.eco}</span>
          <span>Idle: {runtimeBreakdown.idle}</span>
        </div>
      </div>
      
      {/* KPI 4: Average Fan Modulation */}
      <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider">Fan Modulation</span>
          <span className="material-symbols-outlined text-secondary text-[20px]">mode_fan</span>
        </div>
        <div className="my-space-sm flex flex-col">
          <span className="font-telemetry-value-lg text-telemetry-value-lg text-on-surface tracking-tight">{fanModulation}</span>
          <div className="flex items-center gap-space-xs">
            <span className="font-label-md text-label-md text-on-surface">PWM Efficiency</span>
            <span className="px-space-xs py-0.5 rounded bg-surface-container-highest text-primary font-label-caps text-label-caps">Tier A++</span>
          </div>
        </div>
        <span className="font-body-sm text-body-sm text-on-surface-variant">{powerConsumption} kWh consumed (${powerCost} cost)</span>
      </div>
      
      {/* KPI 5: Mitigated Mass */}
      <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider">Particulate Mass</span>
          <span className="material-symbols-outlined text-tertiary text-[20px]">filter_alt</span>
        </div>
        <div className="my-space-sm flex flex-col">
          <span className="font-telemetry-value-lg text-telemetry-value-lg text-on-surface tracking-tight">{mitigatedMass}<span className="font-headline-sm text-headline-sm text-on-surface-variant">kg</span></span>
          <span className="font-label-md text-label-md text-on-surface">Captured Impurities</span>
        </div>
        <div className="flex items-center gap-space-2xs text-tertiary">
          <span className="material-symbols-outlined text-[16px]">check_circle</span>
          <span className="font-body-sm text-body-sm font-medium">99.97% HEPA retention</span>
        </div>
      </div>
    </div>
  );
};

export default KPISummaryRow;
