import React from 'react';

const AQIClassificationScale = () => {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm flex flex-col gap-space-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
        <div>
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Standard Reference Architecture</span>
          <h2 className="font-headline-md text-headline-md text-on-surface">Air Quality Index (AQI) Classification Scale</h2>
        </div>
        <span className="font-body-sm text-body-sm text-on-surface-variant">ISO 16000 &amp; US-EPA Aligned System</span>
      </div>
      
      {/* Colored Diagnostic Bands */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-space-sm">
        {/* 0-50 Good */}
        <div className="p-space-md rounded-xl bg-surface-container-low transition-all duration-150 flex flex-col justify-between gap-space-sm">
          <div className="flex items-center justify-between">
            <span className="w-3 h-3 rounded-full bg-tertiary"></span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">0 - 50</span>
          </div>
          <div>
            <h3 className="font-label-md text-label-md text-on-surface font-bold">Good</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Satisfactory clean air with little or no health hazard.</p>
          </div>
        </div>
        
        {/* 51-100 Moderate (ACTIVE) */}
        <div className="p-space-md rounded-xl bg-surface-container-highest shadow-md flex flex-col justify-between gap-space-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-1 bg-primary"></div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-caps text-label-caps text-primary uppercase font-bold">Active Now (61)</span>
            </span>
            <span className="font-label-caps text-label-caps text-primary font-bold">51 - 100</span>
          </div>
          <div>
            <h3 className="font-label-md text-label-md text-on-surface font-bold">Moderate</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Acceptable quality; sensitive respiratory users may notice irritation.</p>
          </div>
        </div>
        
        {/* 101-150 Sensitive */}
        <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-sm">
          <div className="flex items-center justify-between">
            <span className="w-3 h-3 rounded-full bg-secondary"></span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">101 - 150</span>
          </div>
          <div>
            <h3 className="font-label-md text-label-md text-on-surface font-bold">Sensitive Groups</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">General public not likely affected; asthma alerts active.</p>
          </div>
        </div>
        
        {/* 151-200 Unhealthy */}
        <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-sm">
          <div className="flex items-center justify-between">
            <span className="w-3 h-3 rounded-full bg-error"></span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">151 - 200</span>
          </div>
          <div>
            <h3 className="font-label-md text-label-md text-on-surface font-bold">Unhealthy</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Adverse health outcomes possible for the entire room volume.</p>
          </div>
        </div>
        
        {/* 201-300 Very Unhealthy */}
        <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-sm">
          <div className="flex items-center justify-between">
            <span className="w-3 h-3 rounded-full bg-on-background"></span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">201 - 300</span>
          </div>
          <div>
            <h3 className="font-label-md text-label-md text-on-surface font-bold">Very Unhealthy</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Medical health alert. Purifier operates at emergency Max CFM.</p>
          </div>
        </div>
        
        {/* 301+ Hazardous */}
        <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-sm">
          <div className="flex items-center justify-between">
            <span className="w-3 h-3 rounded-full bg-inverse-surface"></span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">301+</span>
          </div>
          <div>
            <h3 className="font-label-md text-label-md text-on-surface font-bold">Hazardous</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Catastrophic particulate density; sealed environment required.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AQIClassificationScale;
