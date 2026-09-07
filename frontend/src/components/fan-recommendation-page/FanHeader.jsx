import React from 'react';

const FanHeader = ({ controlMode, setControlMode }) => {
  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
      <div className="flex flex-col gap-space-2xs">
        <div className="flex items-center gap-space-xs">
          <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest">Telemetry Optimization • Node 04</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-label-caps font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
            Closed-Loop Active
          </span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Smart Fan Control &amp; AI Optimization</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">Purifier Operating in Autonomous Closed-Loop with ESP32 edge telemetry and neural AQI forecasting.</p>
      </div>
      
      {/* Mode Selector Pills */}
      <div className="bg-surface-container-low p-1.5 rounded-2xl flex flex-wrap items-center gap-1 shadow-sm self-start xl:self-auto">
        <button 
          className={`flex items-center gap-2 px-space-md py-2.5 rounded-xl font-label-md text-label-md shadow-sm transition-all duration-200 ${controlMode === 'auto' ? 'bg-tertiary text-on-tertiary' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'}`}
          onClick={() => setControlMode('auto')}
          type="button"
        >
          {controlMode === 'auto' && <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-pulse"></span>}
          {controlMode !== 'auto' && <span className="material-symbols-outlined text-[18px]">smart_toy</span>}
          <span>AI Automatic Mode</span>
          {controlMode === 'auto' && <span className="px-1.5 py-0.5 rounded bg-white/20 text-[10px] font-bold">ON</span>}
        </button>
        
        <button 
          className={`flex items-center gap-2 px-space-md py-2.5 rounded-xl font-label-md text-label-md transition-all duration-150 ${controlMode === 'semi' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'}`}
          onClick={() => setControlMode('semi')}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">verified_user</span>
          <span>Semi-Autonomous</span>
        </button>
        
        <button 
          className={`flex items-center gap-2 px-space-md py-2.5 rounded-xl font-label-md text-label-md transition-all duration-150 ${controlMode === 'manual' ? 'bg-on-surface text-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'}`}
          onClick={() => setControlMode('manual')}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          <span>Manual Override</span>
        </button>
      </div>
    </div>
  );
};

export default FanHeader;
