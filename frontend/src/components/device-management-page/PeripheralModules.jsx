import React, { useState } from 'react';

const PeripheralModules = ({ appendLog, data }) => {
  const { mq135 = {}, fan = {}, filter = {} } = data || {};
  const [pwmDuty, setPwmDuty] = useState(65);

  const handleSliderChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setPwmDuty(val);
    appendLog('FAN', `PWM Duty adjusted to ${val}% via hardware slider. Tach synced.`, 'text-secondary-fixed');
  };

  const handleZeroCal = () => {
    appendLog('ADC', 'Zero-point calibration routine initiated. Sampling baseline (N=128)...', 'text-secondary-fixed');
    setTimeout(() => {
      appendLog('ADC', 'Calibration matrix converged. New offset stored to NVS: 1.420V.', 'text-tertiary-fixed-dim');
    }, 900);
  };

  const handleFilterReset = () => {
    appendLog('FILTER', 'Optical differential accumulator counter reset to 0 Pa baseline. 180-day cycle refreshed.', 'text-primary-fixed-dim');
  };

  const handleFanTest = () => {
    appendLog('TEST', 'Starting 5-second fan stress test sequence (ramp 100% duty)...', 'text-primary-fixed-dim');
    setTimeout(() => {
      appendLog('TEST', 'RPM reached 2,480. Vibration metrics within safe bounds (<0.04g).', 'text-tertiary-fixed-dim');
    }, 2500);
  };

  const calculatedRpm = Math.round(600 + (pwmDuty * 18.8));

  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-[22px] text-primary">hub</span>
          <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">Connected Peripheral Modules &amp; Health</h2>
        </div>
        <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">3 Subsystems Active</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
        {/* Peripheral Card 1: MQ135 Multi-Gas Array */}
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between gap-space-lg relative overflow-hidden">
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                  <span className="material-symbols-outlined text-[22px]">air</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-on-surface">MQ135 Gas Array</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Multi-Gas VOC / NH3 / CO2</span>
                </div>
              </div>
              <span className="px-space-xs py-0.5 rounded-full bg-tertiary-container text-on-tertiary-container font-label-caps text-label-caps">ACTIVE</span>
            </div>
            
            {/* Visual Calibration Vector */}
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
              <div className="flex justify-between items-center text-on-surface">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Zero-Point Voltage Baseline</span>
                <span className="font-label-md text-label-md font-semibold text-primary">{mq135.zeroBaseline || '0 V'}</span>
              </div>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full transition-all duration-300" style={{ width: '47%' }}></div>
              </div>
              <div className="flex justify-between items-center text-on-surface-variant font-body-sm text-body-sm mt-space-2xs">
                <span>ADC Pin: GPIO A0 (12-bit)</span>
                <span className="text-tertiary">Drift: {mq135.drift || '0%'}</span>
              </div>
            </div>
            <div className="flex flex-col gap-space-2xs font-body-sm text-body-sm text-on-surface-variant">
              <div className="flex items-center justify-between py-1">
                <span>Thermal Pre-heat Curve</span>
                <span className="text-on-surface font-medium">Fully Stabilized (48h)</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span>Last Zero-Point Recalibration</span>
                <span className="text-on-surface font-medium">2 days ago • PASS</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span>Sensitivity Constant (Ro/Rs)</span>
                <span className="text-on-surface font-medium">3.58 • Lab Rated</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-space-sm pt-space-xs">
            <button 
              className="flex-1 py-space-xs px-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-space-2xs transition-colors" 
              onClick={handleZeroCal}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">sync</span>
              Zero-Point Offset
            </button>
            <button className="p-space-xs rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors" title="Raw ADC Readout" type="button">
              <span className="material-symbols-outlined text-[18px]">query_stats</span>
            </button>
          </div>
        </div>
        
        {/* Peripheral Card 2: Brushless DC Centrifugal Fan & PWM */}
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between gap-space-lg relative overflow-hidden">
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]">mode_fan</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-on-surface">Brushless DC Centrifugal</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">PWM Speed Controller</span>
                </div>
              </div>
              <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-label-caps">PWM {pwmDuty}%</span>
            </div>
            
            {/* Live Tachometer readout */}
            <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Current Speed</span>
                <div className="flex items-baseline gap-space-2xs">
                  <span className="font-telemetry-value-md text-telemetry-value-md text-on-surface font-bold">{calculatedRpm.toLocaleString()}</span>
                  <span className="font-label-md text-label-md text-on-surface-variant">RPM</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Motor Temp</span>
                <span className="font-label-md text-label-md text-tertiary font-semibold flex items-center gap-space-2xs">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span> {fan.temp || '0°C'} (Normal)
                </span>
              </div>
            </div>
            
            {/* PWM Control Slider Mini */}
            <div className="flex flex-col gap-space-xs">
              <div className="flex justify-between items-center text-on-surface">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">PWM Duty Output</span>
                <span className="font-label-md text-label-md font-semibold text-primary">{pwmDuty}% ({(pwmDuty * 0.25).toFixed(2)} kHz)</span>
              </div>
              <input 
                className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary" 
                max="100" 
                min="0" 
                onChange={handleSliderChange}
                type="range" 
                value={pwmDuty}
              />
              <div className="flex justify-between text-body-sm text-body-sm text-on-surface-variant">
                <span>0% Quiet</span>
                <span>50%</span>
                <span>100% Turbo</span>
              </div>
            </div>
            <div className="flex flex-col gap-space-2xs font-body-sm text-body-sm text-on-surface-variant">
              <div className="flex items-center justify-between py-1">
                <span>Control Pin &amp; Signal</span>
                <span className="text-on-surface font-medium">GPIO 25 • 25kHz High-Speed</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span>Tachometer Feedback Pin</span>
                <span className="text-on-surface font-medium">GPIO 19 (Hardware ISR)</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-space-sm pt-space-xs">
            <button 
              className="flex-1 py-space-xs px-space-sm rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md flex items-center justify-center gap-space-2xs transition-colors shadow-sm" 
              onClick={handleFanTest}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">speed</span>
              Run 5s RPM Diagnostic
            </button>
          </div>
        </div>
        
        {/* Peripheral Card 3: Filter Differential Sensor & Lifecycle */}
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between gap-space-lg relative overflow-hidden">
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                  <span className="material-symbols-outlined text-[22px]">filter_alt</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-on-surface">HEPA Filter Array</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Differential Pressure Optical</span>
                </div>
              </div>
              <span className="px-space-xs py-0.5 rounded-full bg-tertiary-container text-on-tertiary-container font-label-caps text-label-caps">{filter.lifePercent || 0}% LIFE</span>
            </div>
            
            {/* Filter Status Bar */}
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
              <div className="flex justify-between items-center text-on-surface">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Differential Pressure Drop</span>
                <span className="font-label-md text-label-md font-semibold text-tertiary">{filter.differentialPressure || '0 Pa'} (Low resistance)</span>
              </div>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                <div className="bg-tertiary h-full rounded-full" style={{ width: `${filter.lifePercent || 0}%` }}></div>
              </div>
              <div className="flex justify-between items-center text-on-surface-variant font-body-sm text-body-sm mt-space-2xs">
                <span>Est. {filter.estDays || 0} days remaining</span>
                <span className="text-on-surface font-medium">Optimal</span>
              </div>
            </div>
            <div className="flex flex-col gap-space-2xs font-body-sm text-body-sm text-on-surface-variant">
              <div className="flex items-center justify-between py-1">
                <span>Pressure Sensor Address</span>
                <span className="text-on-surface font-medium">I2C 0x48 (SDA:21, SCL:22)</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span>Optical Particulate Sensor</span>
                <span className="text-on-surface font-medium">UART2 (9600 baud) • Clean</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span>Pre-Filter Trap Saturation</span>
                <span className="text-on-surface font-medium">8.4% (Nominal)</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-space-sm pt-space-xs">
            <button 
              className="flex-1 py-space-xs px-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-space-2xs transition-colors" 
              onClick={handleFilterReset}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              Reset Filter Counter
            </button>
            <button className="p-space-xs rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors" title="Filter Specs PDF" type="button">
              <span className="material-symbols-outlined text-[18px]">description</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeripheralModules;
