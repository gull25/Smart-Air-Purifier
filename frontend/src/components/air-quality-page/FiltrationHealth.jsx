import React from 'react';

const FiltrationHealth = ({ data }) => {
  const { overallEfficiency, preFilter, hepa, carbon, diffPressure } = data || {};

  return (
    <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Filtration Integrity Matrix</span>
          <h2 className="font-headline-md text-headline-md text-on-surface">3-Stage Core Airflow Degradation Analysis</h2>
        </div>
        <span className="px-space-md py-1 bg-tertiary-container/10 text-tertiary rounded-full font-label-caps text-label-caps whitespace-nowrap">
          {Number(overallEfficiency || 0).toFixed(1)}% SYSTEM EFFICIENCY
        </span>
      </div>
      
      <div className="flex flex-col gap-space-md my-space-md">
        {/* Stage 1 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm p-space-md rounded-xl bg-surface-container-low">
          <div className="flex items-center gap-space-md">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <span className="font-headline-sm text-headline-sm font-bold">1</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-md text-label-md text-on-surface">Washable Anti-Bacteria Pre-Filter</span>
                <span className="font-label-caps text-label-caps text-tertiary">{preFilter > 80 ? 'CLEAN' : 'DEGRADED'}</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Traps large hair, pet dander, lint, and macro debris</span>
            </div>
          </div>
          <div className="flex items-center gap-space-md min-w-[200px]">
            <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
              <div className="bg-tertiary h-full rounded-full" style={{ width: `${preFilter || 0}%` }}></div>
            </div>
            <span className="font-label-md text-label-md text-on-surface w-12 text-right">{Number(preFilter || 0).toFixed(1)}%</span>
          </div>
        </div>
        
        {/* Stage 2 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm p-space-md rounded-xl bg-surface-container-low">
          <div className="flex items-center gap-space-md">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <span className="font-headline-sm text-headline-sm font-bold">2</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-md text-label-md text-on-surface">True HEPA H13 Medical-Grade Filter</span>
                <span className="font-label-caps text-label-caps text-tertiary">99.97% CAPTURE</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Stops 0.3µm viruses, aerosol particulate, and pollen allergens</span>
            </div>
          </div>
          <div className="flex items-center gap-space-md min-w-[200px]">
            <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: `${hepa || 0}%` }}></div>
            </div>
            <span className="font-label-md text-label-md text-on-surface w-12 text-right">{Number(hepa || 0).toFixed(1)}%</span>
          </div>
        </div>
        
        {/* Stage 3 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm p-space-md rounded-xl bg-surface-container-low">
          <div className="flex items-center gap-space-md">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <span className="font-headline-sm text-headline-sm font-bold">3</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-md text-label-md text-on-surface">Activated Carbon Honeycomb Core</span>
                <span className="font-label-caps text-label-caps text-primary">{carbon > 70 ? 'OPTIMAL' : 'REPLACE SOON'}</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Neutralizes cooking fumes, VOCs, ozone, and chemical odors</span>
            </div>
          </div>
          <div className="flex items-center gap-space-md min-w-[200px]">
            <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
              <div className="bg-secondary h-full rounded-full" style={{ width: `${carbon || 0}%` }}></div>
            </div>
            <span className="font-label-md text-label-md text-on-surface w-12 text-right">{Number(carbon || 0).toFixed(1)}%</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
        <span>Differential pressure across intake: <strong>{diffPressure || 0} Pa</strong> (Nominal)</span>
        <span>Last automated purge scrub: Today, 03:00 AM</span>
      </div>
    </div>
  );
};

export default FiltrationHealth;
