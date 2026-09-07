import React from 'react';

const AIConfigPanel = ({ aggressiveness, setAggressiveness }) => {
  return (
    <div className="lg:col-span-5 rounded-3xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col gap-space-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs">
          <div className="w-9 h-9 rounded-xl bg-secondary-container flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[20px]">smart_toy</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">AI Autopilot Tuning</h3>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Thresholds &amp; behavior heuristics</span>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-caps text-label-caps font-bold">ACTIVE</span>
      </div>
      
      {/* Aggressiveness Selector */}
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <label className="font-label-md text-label-md text-on-surface font-bold">Purification Aggressiveness</label>
          <span className="font-label-caps text-label-caps text-primary font-bold uppercase">{aggressiveness}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 bg-surface-container-low p-1.5 rounded-2xl">
          <button 
            className={`py-2.5 rounded-xl font-label-md text-label-md transition-all ${aggressiveness === 'Eco' ? 'bg-surface-container-lowest text-primary shadow-sm font-bold' : 'text-on-surface-variant hover:text-on-surface transition-colors'}`} 
            onClick={() => setAggressiveness('Eco')} 
            type="button"
          >
            Eco
          </button>
          <button 
            className={`py-2.5 rounded-xl font-label-md text-label-md transition-all ${aggressiveness === 'Balanced' ? 'bg-surface-container-lowest text-primary shadow-sm font-bold' : 'text-on-surface-variant hover:text-on-surface transition-colors'}`} 
            onClick={() => setAggressiveness('Balanced')} 
            type="button"
          >
            Balanced
          </button>
          <button 
            className={`py-2.5 rounded-xl font-label-md text-label-md transition-all ${aggressiveness === 'Rapid' ? 'bg-surface-container-lowest text-primary shadow-sm font-bold' : 'text-on-surface-variant hover:text-on-surface transition-colors'}`} 
            onClick={() => setAggressiveness('Rapid')} 
            type="button"
          >
            Rapid
          </button>
        </div>
        <span className="font-body-sm text-body-sm text-on-surface-variant">Balances acoustic comfort in lab with proactive filter throughput.</span>
      </div>
      
      {/* Night Mode / Quiet Hours Schedule */}
      <div className="p-space-md rounded-2xl bg-surface-container-low flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">bedtime</span>
            <span className="font-label-md text-label-md text-on-surface font-bold">Night Mode / Quiet Hours</span>
          </div>
          {/* Custom Toggle */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input defaultChecked className="sr-only peer" type="checkbox" />
            <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">Cap maximum speed at 30% (≤26 dB) from 22:00 to 07:00 unless hazardous VOC spike (&gt;150 AQI).</p>
      </div>
      
      {/* Sensitivity Threshold Slider */}
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-on-surface font-bold">Sensitivity Threshold Trigger</span>
          <span className="font-label-md text-label-md text-secondary font-bold">AQI &gt; 55</span>
        </div>
        <div className="w-full bg-surface-container h-2 rounded-full relative">
          <div className="bg-secondary h-full rounded-full" style={{ width: '55%' }}></div>
          <div className="absolute -top-1.5 left-[55%] w-5 h-5 rounded-full bg-surface-container-lowest shadow-md -ml-2.5 cursor-pointer"></div>
        </div>
        <div className="flex justify-between font-label-caps text-label-caps text-on-surface-variant">
          <span>AQI 30 (Sensitive)</span>
          <span>AQI 55 (Default)</span>
          <span>AQI 90 (Relaxed)</span>
        </div>
      </div>
      
      {/* Contextual Machine Learning Status Pill */}
      <div className="mt-auto pt-space-md flex items-center gap-space-sm bg-surface-container p-space-sm rounded-xl">
        <span className="material-symbols-outlined text-[20px] text-tertiary">published_with_changes</span>
        <span className="font-body-sm text-body-sm text-on-surface">Auto-recalibrating every 15 minutes using local atmospheric pressure.</span>
      </div>
    </div>
  );
};

export default AIConfigPanel;
