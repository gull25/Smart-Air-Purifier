import React from 'react';

const MasterAQIGauge = ({ data }) => {
  const { value, category, min24h, minTime, max24h, maxTime, avg24h, avgStatus } = data || {};
  
  // Calculate stroke dashoffset for the circular progress bar (max 490)
  // Assuming max AQI we care about for the circle is 500
  const normalizedValue = Math.min(Math.max(value || 0, 0), 500);
  const strokeDashoffset = 490 - (normalizedValue / 500) * 490;
  // Position indicator
  const indicatorPosition = `${(normalizedValue / 500) * 100}%`;

  return (
    <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm flex flex-col justify-between relative overflow-hidden">
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-secondary-fixed/20 blur-3xl pointer-events-none"></div>
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Master Core Sensor</span>
          <span className="font-headline-sm text-headline-sm text-on-surface">Composite AQI</span>
        </div>
        <span className="px-space-sm py-1 bg-secondary-container/40 text-on-secondary-container rounded-full font-label-caps text-label-caps flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          ACTIVE MONITORING
        </span>
      </div>
      
      {/* Central Radial Dial SVG */}
      <div className="relative flex flex-col items-center justify-center my-space-md">
        <svg className="w-56 h-56 transform -rotate-90" viewBox="0 0 200 200">
          {/* Background Arc */}
          <circle cx="100" cy="100" fill="none" r="78" stroke="#eaedff" strokeDasharray="490" strokeDashoffset="122" strokeLinecap="round" strokeWidth="14"></circle>
          {/* Active Fill Arc */}
          <circle className="transition-all duration-1000 ease-out" cx="100" cy="100" fill="none" r="78" stroke="#007bb9" strokeDasharray="490" strokeDashoffset={strokeDashoffset} strokeLinecap="round" strokeWidth="14"></circle>
        </svg>
        {/* Inner Dial Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-label-caps text-label-caps text-on-surface-variant">US-EPA AQI</span>
          <span className="font-telemetry-value-lg text-telemetry-value-lg text-on-surface tracking-tight">{value || 0}</span>
          <div className="flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span className="font-label-md text-label-md">{category || 'Unknown'}</span>
          </div>
        </div>
      </div>
      
      {/* Scale Position Indicator & Daily Bounds */}
      <div className="flex flex-col gap-space-sm pt-space-xs">
        <div className="flex items-center justify-between font-label-caps text-label-caps text-on-surface-variant">
          <span>0 Good</span>
          <span className="text-primary font-bold">Current Point ({value || 0})</span>
          <span>500 Hazardous</span>
        </div>
        {/* Bar indicator */}
        <div className="w-full h-2 rounded-full bg-surface-container flex overflow-hidden relative">
          <div className="h-full bg-tertiary-container" style={{ width: '10%' }}></div>
          <div className="h-full bg-primary-container" style={{ width: '10%' }}></div>
          <div className="h-full bg-secondary-fixed-dim" style={{ width: '10%' }}></div>
          <div className="h-full bg-error" style={{ width: '10%' }}></div>
          <div className="h-full bg-inverse-surface" style={{ width: '60%' }}></div>
          <span className="absolute top-0 w-1 h-4 bg-on-surface rounded-full shadow-md transform -translate-y-1 transition-all duration-1000" style={{ left: indicatorPosition }}></span>
        </div>
        {/* Min/Max/Avg Stat Triplets */}
        <div className="grid grid-cols-3 gap-space-xs mt-space-xs pt-space-xs bg-surface-container-low p-space-sm rounded-xl text-center">
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant">MIN (24H)</span>
            <span className="font-headline-sm text-headline-sm text-tertiary">{min24h || 0}</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">{minTime || 'N/A'}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant">MAX (24H)</span>
            <span className="font-headline-sm text-headline-sm text-primary">{max24h || 0}</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">{maxTime || 'N/A'}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant">AVERAGE</span>
            <span className="font-headline-sm text-headline-sm text-on-surface">{avg24h || 0}</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">{avgStatus || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterAQIGauge;
