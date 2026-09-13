import React from 'react';

const ManualControlConsole = ({ currentSpeed, setCurrentSpeed, setControlMode }) => {
  const handleSliderChange = (e) => {
    setCurrentSpeed(parseInt(e.target.value, 10));
    setControlMode('manual');
  };

  const handleStep = (step) => {
    setCurrentSpeed((prev) => Math.min(100, Math.max(0, prev + step)));
    setControlMode('manual');
  };

  const handlePreset = (speed) => {
    setCurrentSpeed(speed);
    setControlMode('manual');
  };

  const handlePowerOff = () => {
    setCurrentSpeed(0);
    setControlMode('manual');
  };

  const computedCFM = Math.round(40 + (currentSpeed / 100) * 220);

  return (
    <div className="lg:col-span-7 rounded-3xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between gap-space-lg">
      <div>
        {/* Header with Master Power Toggle */}
        <div className="flex items-center justify-between pb-space-md">
          <div className="flex items-center gap-space-xs">
            <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">equalizer</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Manual Hardware Console</h3>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Direct PWM modulation to DC centrifugal unit</span>
            </div>
          </div>
          <div className="flex items-center gap-space-xs bg-surface-container-low px-3 py-1.5 rounded-2xl">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-bold">Master Power</span>
            <button 
              className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-sm hover:opacity-90 transition-all ${currentSpeed === 0 ? 'bg-error text-on-error' : 'bg-tertiary text-on-tertiary'}`} 
              onClick={handlePowerOff}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">power_settings_new</span>
            </button>
          </div>
        </div>
        
        {/* Speed Slider Interactive Display */}
        <div className="p-space-lg rounded-2xl bg-surface-container-low flex flex-col gap-space-md">
          <div className="flex items-baseline justify-between">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-bold">Fan Speed (PWM Duty)</span>
            <div className="flex items-baseline gap-1">
              <span className="font-telemetry-value-lg text-telemetry-value-lg text-on-surface font-bold">{currentSpeed}</span>
              <span className="font-headline-sm text-headline-sm text-primary font-bold">%</span>
            </div>
          </div>
          
          {/* Tactile Range Slider */}
          <div className="relative flex items-center w-full py-2">
            <input 
              className="w-full h-3 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary" 
              max="100" 
              min="0" 
              onChange={handleSliderChange}
              type="range" 
              value={currentSpeed}
            />
          </div>
          
          {/* Preset Buttons */}
          <div className="grid grid-cols-4 gap-2 pt-1">
            <button 
              className="preset-btn py-2 px-1 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-all text-center" 
              onClick={() => handlePreset(20)}
              type="button"
            >
              Sleep (20%)
            </button>
            <button 
              className="preset-btn py-2 px-1 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-all text-center" 
              onClick={() => handlePreset(40)}
              type="button"
            >
              Eco (40%)
            </button>
            <button 
              className="preset-btn py-2 px-1 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-all text-center" 
              onClick={() => handlePreset(65)}
              type="button"
            >
              Standard (65%)
            </button>
            <button 
              className="preset-btn py-2 px-1 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-all text-center" 
              onClick={() => handlePreset(100)}
              type="button"
            >
              Turbo (100%)
            </button>
          </div>
        </div>
      </div>
      
      {/* Fine Stepper and Flow Velocity Meter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-2">
        {/* Stepper Buttons */}
        <div className="p-space-md rounded-2xl bg-surface-container-low flex flex-col justify-between gap-space-xs">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-bold">Fine Calibration</span>
          <div className="flex items-center justify-between gap-2 mt-1">
            <button 
              className="flex-1 h-12 rounded-xl bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-md text-label-md flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all" 
              onClick={() => handleStep(-5)}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">remove</span>
              <span>5%</span>
            </button>
            <div className="px-4 py-2 bg-surface-container-lowest rounded-xl text-center shadow-sm">
              <span className="font-telemetry-value-md text-telemetry-value-md text-primary font-bold">{currentSpeed}%</span>
            </div>
            <button 
              className="flex-1 h-12 rounded-xl bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-md text-label-md flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all" 
              onClick={() => handleStep(5)}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>5%</span>
            </button>
          </div>
        </div>
        
        {/* Air Flow Velocity Gauge Card */}
        <div className="p-space-md rounded-2xl bg-surface-container-low flex flex-col justify-between gap-space-xs">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-bold">Velocity Throughput</span>
            <span className="material-symbols-outlined text-secondary text-[20px]">airware</span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-telemetry-value-lg text-telemetry-value-lg text-on-surface font-bold">{computedCFM}</span>
            <span className="font-headline-sm text-headline-sm text-on-surface-variant font-semibold">CFM</span>
          </div>
          <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
            <span>Clean Air Delivery (CADR)</span>
            <span className="text-tertiary font-semibold">Optimal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualControlConsole;
