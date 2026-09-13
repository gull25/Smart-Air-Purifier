import React, { useState, useEffect } from 'react';

const FanControl = ({ data, aiRecSpeed, onUpdate }) => {
  const [speed, setSpeed] = useState(data?.speedPercentage || 65);
  const [autoActive, setAutoActive] = useState(data?.mode === 'AI Auto');

  useEffect(() => {
    if (data) {
      setSpeed(data.speedPercentage || 65);
      setAutoActive(data.mode === 'AI Auto');
    }
  }, [data]);

  const handleSliderChange = (e) => {
    const newSpeed = parseInt(e.target.value, 10);
    setSpeed(newSpeed);
    setAutoActive(false); // Disable auto mode upon manual slider override
    if (onUpdate) onUpdate(newSpeed, false);
  };

  const setPreset = (val, isAuto = false) => {
    setSpeed(val);
    setAutoActive(isAuto);
    if (onUpdate) onUpdate(val, isAuto);
  };

  const toggleAuto = () => {
    const newAuto = !autoActive;
    setAutoActive(newAuto);
    if (onUpdate) onUpdate(speed, newAuto);
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-space-md">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Purifier Velocity</h3>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Manual Override &amp; Automation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-semibold">Auto</span>
            <button 
              className={`w-12 h-7 rounded-full p-0.5 transition-colors relative flex items-center ${autoActive ? 'bg-primary' : 'bg-surface-container-highest'}`}
              onClick={toggleAuto}
              type="button"
            >
              <span className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${autoActive ? 'translate-x-5' : 'translate-x-0'}`}></span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-space-sm my-space-md">
          <div className="flex justify-between items-center">
            <span className="font-label-md text-label-md text-on-surface">Target Fan Speed</span>
            <span className="font-headline-sm text-headline-sm text-primary">{speed}%</span>
          </div>
          <input 
            className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary" 
            max="100" 
            min="0" 
            onChange={handleSliderChange}
            type="range" 
            value={speed}
          />
          <div className="flex justify-between font-label-caps text-label-caps text-on-surface-variant px-1">
            <span>0% Off</span>
            <span>50% Balanced</span>
            <span>100% Turbo</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-space-xs my-space-md">
          <button 
            className="p-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md text-center transition-colors"
            onClick={() => setPreset(25)}
          >
            Quiet (25%)
          </button>
          <button 
            className="p-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md text-center transition-colors"
            onClick={() => setPreset(50)}
          >
            Balanced (50%)
          </button>
          <button 
            className="p-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md text-center transition-colors"
            onClick={() => setPreset(85)}
          >
            Turbo (85%)
          </button>
          <button 
            className="p-2 rounded-xl bg-primary-fixed text-on-primary-fixed font-label-md text-label-md text-center font-bold"
            onClick={() => setPreset(aiRecSpeed || 70, true)}
          >
            AI Rec ({aiRecSpeed || 70}%)
          </button>
        </div>
      </div>
      <div className="p-space-sm rounded-xl bg-surface-container-low">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-[18px] text-tertiary">filter_alt</span>
          <span className="font-label-md text-label-md text-on-surface font-semibold">Filter Array Health</span>
        </div>
        <div className="space-y-2 font-body-sm text-body-sm">
          <div>
            <div className="flex justify-between text-on-surface-variant font-label-caps text-label-caps">
              <span>Pre-Filter</span>
              <span className="text-tertiary">{data?.carbonFilterLife || 0}% Clean</span>
            </div>
            <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden mt-1">
              <div className="bg-tertiary h-full rounded-full transition-all" style={{ width: `${data?.carbonFilterLife || 0}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-on-surface-variant font-label-caps text-label-caps">
              <span>True HEPA H13</span>
              <span className="text-primary">{data?.hepaFilterLife || 0}% Optimal</span>
            </div>
            <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden mt-1">
              <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${data?.hepaFilterLife || 0}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FanControl;
