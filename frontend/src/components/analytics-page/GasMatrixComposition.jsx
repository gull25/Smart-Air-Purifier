import React from 'react';

const GasMatrixComposition = ({ data }) => {
  const { morning = {}, afternoon = {}, night = {} } = data || {};
  return (
    <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">MQ135 Gas Matrix Composition &amp; Correlation</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Cross-sensor tracking: TVOC (ppb), eCO2 (ppm), and Raw Analog ADC sensor baseline drift across operation shifts</p>
        </div>
        <div className="flex items-center gap-space-xs">
          <span className="px-space-sm py-space-xs rounded-lg bg-surface-container text-on-surface font-label-caps text-label-caps">Sampling Freq: 1Hz</span>
          <span className="px-space-sm py-space-xs rounded-lg bg-secondary-container text-on-secondary-container font-label-caps text-label-caps">Drift Compensated</span>
        </div>
      </div>
      
      {/* Matrix Shift Breakdown / Heatmap Representation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {/* Morning Shift */}
        <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-headline-sm text-headline-sm text-on-surface">Morning Shift (06:00 - 14:00)</span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">High Occupancy</span>
          </div>
          <div className="flex flex-col gap-space-xs">
            <div>
              <div className="flex justify-between font-body-sm text-body-sm mb-1">
                <span className="text-on-surface-variant">eCO2 Concentration</span>
                <span className="font-label-md text-label-md text-on-surface">{morning.eco2} ppm (Nominal)</span>
              </div>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                <div className="bg-tertiary h-full rounded-full" style={{ width: '44%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-body-sm text-body-sm mb-1">
                <span className="text-on-surface-variant">TVOC Volatile Load</span>
                <span className="font-label-md text-label-md text-on-surface">{morning.tvoc} ppb</span>
              </div>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-body-sm text-body-sm mb-1">
                <span className="text-on-surface-variant">Raw ADC Voltage Drift</span>
                <span className="font-label-md text-label-md text-on-surface">{morning.drift} (Calibrated)</span>
              </div>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: '12%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Afternoon Shift */}
        <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-headline-sm text-headline-sm text-on-surface">Afternoon Shift (14:00 - 22:00)</span>
            <span className="font-label-caps text-label-caps text-primary">Active Lab Operations</span>
          </div>
          <div className="flex flex-col gap-space-xs">
            <div>
              <div className="flex justify-between font-body-sm text-body-sm mb-1">
                <span className="text-on-surface-variant">eCO2 Concentration</span>
                <span className="font-label-md text-label-md text-on-surface">{afternoon.eco2} ppm (Slight Rise)</span>
              </div>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '58%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-body-sm text-body-sm mb-1">
                <span className="text-on-surface-variant">TVOC Volatile Load</span>
                <span className="font-label-md text-label-md text-on-surface">{afternoon.tvoc} ppb (Spike Absorbed)</span>
              </div>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                <div className="bg-primary-container h-full rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-body-sm text-body-sm mb-1">
                <span className="text-on-surface-variant">Raw ADC Voltage Drift</span>
                <span className="font-label-md text-label-md text-on-surface">{afternoon.drift}</span>
              </div>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: '22%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Night Standby Shift */}
        <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-headline-sm text-headline-sm text-on-surface">Night Cycle (22:00 - 06:00)</span>
            <span className="font-label-caps text-label-caps text-tertiary">Ultra Clean Eco Mode</span>
          </div>
          <div className="flex flex-col gap-space-xs">
            <div>
              <div className="flex justify-between font-body-sm text-body-sm mb-1">
                <span className="text-on-surface-variant">eCO2 Concentration</span>
                <span className="font-label-md text-label-md text-tertiary">{night.eco2} ppm (Atmospheric)</span>
              </div>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                <div className="bg-tertiary h-full rounded-full" style={{ width: '18%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-body-sm text-body-sm mb-1">
                <span className="text-on-surface-variant">TVOC Volatile Load</span>
                <span className="font-label-md text-label-md text-tertiary">{night.tvoc} ppb (Pristine)</span>
              </div>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                <div className="bg-tertiary h-full rounded-full" style={{ width: '9%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-body-sm text-body-sm mb-1">
                <span className="text-on-surface-variant">Raw ADC Voltage Drift</span>
                <span className="font-label-md text-label-md text-on-surface">{night.drift} (Baseline)</span>
              </div>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: '4%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GasMatrixComposition;
