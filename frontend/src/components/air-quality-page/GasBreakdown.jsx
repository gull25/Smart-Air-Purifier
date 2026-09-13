import React from 'react';

const GasBreakdown = ({ data }) => {
  const { adc, voltage, co2, tvoc, smoke } = data || {};

  const getCo2Status = (val, limit) => {
    if (val === undefined || val === null) return 'UNKNOWN';
    if (val < (limit || 800)) return 'NORMAL';
    if (val < 1500) return 'ELEVATED';
    return 'CRITICAL';
  };

  const getTvocStatus = (val, limit) => {
    if (val === undefined || val === null) return 'UNKNOWN';
    if (val < (limit || 0.5)) return 'GOOD';
    if (val < 1.0) return 'MODERATE';
    return 'POOR';
  };

  const getSmokeStatus = (val) => {
    if (val === undefined || val === null) return 'UNKNOWN';
    if (val < 0.1) return 'CLEAR';
    if (val < 0.5) return 'TRACE DETECTED';
    return 'DANGER';
  };


  return (
    <div className="lg:col-span-4 bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Sub-Sensor Node</span>
          <span className="font-headline-sm text-headline-sm text-on-surface">MQ135 Gas Matrix</span>
        </div>
        <div className="flex items-center gap-1 bg-surface-container-high px-space-xs py-0.5 rounded text-on-surface-variant font-label-caps text-label-caps">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          ADC LIVE
        </div>
      </div>
      
      {/* Raw Transducer Specs */}
      <div className="grid grid-cols-2 gap-space-sm my-space-sm bg-surface-container-low p-space-sm rounded-xl">
        <div className="flex flex-col">
          <span className="font-label-caps text-label-caps text-on-surface-variant">RAW 12-BIT ADC</span>
          <span className="font-headline-sm text-headline-sm text-on-surface">{adc ? adc.toLocaleString() : 0} <span className="font-body-sm text-body-sm text-on-surface-variant">/ 4095</span></span>
        </div>
        <div className="flex flex-col">
          <span className="font-label-caps text-label-caps text-on-surface-variant">ANALOG VOLTAGE</span>
          <span className="font-headline-sm text-headline-sm text-on-surface">{voltage || 0} <span className="font-body-sm text-body-sm text-on-surface-variant">VDC</span></span>
        </div>
      </div>
      
      {/* Gas Breakdown List */}
      <div className="flex flex-col gap-space-sm">
        {/* CO2 Equivalent */}
        <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-space-2xs">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface">CO₂ Equiv (eCO₂)</span>
            <span className="font-label-caps text-label-caps text-tertiary">
              {co2?.status && co2.status !== 'UNKNOWN' ? co2.status : getCo2Status(co2?.value, co2?.limit)}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-headline-sm text-headline-sm text-on-surface">{co2?.value || 0} <span className="font-body-sm text-body-sm text-on-surface-variant">ppm</span></span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Normal ambient &lt; {co2?.limit || 800}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
            <div className="bg-tertiary h-full rounded-full" style={{ width: `${Math.min(((co2?.value || 0) / (co2?.limit || 800)) * 50, 100)}%` }}></div>
          </div>
        </div>
        
        {/* Total VOCs */}
        <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-space-2xs">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface">Total VOCs (TVOC)</span>
            <span className="font-label-caps text-label-caps text-primary">
              {tvoc?.status && tvoc.status !== 'UNKNOWN' ? tvoc.status : getTvocStatus(tvoc?.value, tvoc?.limit)}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-headline-sm text-headline-sm text-on-surface">{tvoc?.value || 0} <span className="font-body-sm text-body-sm text-on-surface-variant">mg/m³</span></span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Action threshold: {tvoc?.limit || 0.50}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
            <div className="bg-primary-container h-full rounded-full" style={{ width: `${Math.min(((tvoc?.value || 0) / (tvoc?.limit || 0.50)) * 100, 100)}%` }}></div>
          </div>
        </div>
        
        {/* Smoke / Combustibles */}
        <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-space-2xs">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface">Smoke &amp; Combustible Trace</span>
            <span className="font-label-caps text-label-caps text-tertiary">
              {smoke?.status && smoke.status !== 'UNKNOWN' ? smoke.status : getSmokeStatus(smoke?.value)}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-headline-sm text-headline-sm text-on-surface">{smoke?.value || 0} <span className="font-body-sm text-body-sm text-on-surface-variant">ppm</span></span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Nominal baseline</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
            <div className="bg-tertiary h-full rounded-full" style={{ width: `${Math.min(((smoke?.value || 0) / 0.50) * 100, 100)}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GasBreakdown;
