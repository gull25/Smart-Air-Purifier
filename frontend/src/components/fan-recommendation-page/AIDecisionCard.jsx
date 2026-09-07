import React, { useEffect, useState } from 'react';

const AIDecisionCard = ({ currentSpeed, targetSpeed, setTargetSpeed, applyTargetSpeed, keepBaseline, data }) => {
  const { currentRpm = 0, projectedRpm = 0, rpmDelta = 0, confidenceScore = 0, predictedAqiPeak = 0, peakTimeMins = 0, recoveryTimeMins = 0, energySavedPercent = 0 } = data || {};
  const [countdown, setCountdown] = useState(45);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (countdown > 0 && !applied) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (countdown === 0 && !applied) {
      applyTargetSpeed();
      setApplied(true);
    }
  }, [countdown, applied, applyTargetSpeed]);

  const handleApply = () => {
    applyTargetSpeed();
    setApplied(true);
    setCountdown(0);
  };

  const handleKeep = () => {
    keepBaseline();
    setApplied(true);
    setCountdown(0);
  };

  const outerCircumference = 590.6;
  const innerCircumference = 465; // r=74 -> 2 * PI * 74 = 465
  const targetOuterOffset = outerCircumference - (outerCircumference * targetSpeed) / 100;
  const currentInnerOffset = innerCircumference - (innerCircumference * currentSpeed) / 100;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-surface-container-lowest shadow-md p-space-lg md:p-space-xl">
      {/* Ambient Decorative Radial Underglow */}
      <div className="absolute -right-24 -top-24 w-96 h-96 bg-secondary-container/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-primary-container/10 rounded-full blur-2xl pointer-events-none"></div>
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
        {/* Left: Concentric Radial Fan Speed Telemetry Gauge */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-space-md bg-surface-container-low rounded-2xl">
          <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 240 240">
              {/* Outer Track (AI Target) */}
              <circle className="text-surface-container-high" cx="120" cy="120" fill="transparent" r="94" stroke="currentColor" strokeWidth="12"></circle>
              <circle className="text-secondary transition-all duration-1000 ease-out" cx="120" cy="120" fill="transparent" r="94" stroke="currentColor" strokeDasharray={outerCircumference} strokeDashoffset={targetOuterOffset} strokeLinecap="round" strokeWidth="12"></circle>
              {/* Inner Track (Current Speed) */}
              <circle className="text-surface-container-high/80" cx="120" cy="120" fill="transparent" r="74" stroke="currentColor" strokeWidth="10"></circle>
              <circle className="text-primary transition-all duration-700 ease-out" cx="120" cy="120" fill="transparent" r="74" stroke="currentColor" strokeDasharray={innerCircumference} strokeDashoffset={currentInnerOffset} strokeLinecap="round" strokeWidth="10"></circle>
            </svg>
            {/* Center Gauge Metric Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">AI TARGET</span>
              <div className="flex items-baseline gap-0.5">
                <span className="font-display-hero text-display-hero text-secondary font-bold leading-none">{targetSpeed}</span>
                <span className="font-headline-sm text-headline-sm text-secondary font-semibold">%</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-highest">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Active:</span>
                <span className="font-label-md text-label-md text-primary font-bold">{currentSpeed}%</span>
              </div>
            </div>
          </div>
          
          {/* Dual Telemetry Micro-Badges */}
          <div className="w-full grid grid-cols-2 gap-space-sm mt-space-md pt-space-sm bg-surface-container-lowest p-space-sm rounded-xl">
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-primary">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Current RPM</span>
              </div>
              <span className="font-telemetry-value-md text-telemetry-value-md text-on-surface font-semibold mt-1">{currentRpm.toLocaleString()}</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Stable baseline</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-secondary">
                <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                <span className="font-label-caps text-label-caps text-secondary uppercase font-bold">AI Projected</span>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-telemetry-value-md text-telemetry-value-md text-secondary font-bold">{projectedRpm.toLocaleString()}</span>
                <span className="font-label-caps text-label-caps text-secondary font-semibold">+{rpmDelta} RPM</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Turbulence suppression</span>
            </div>
          </div>
        </div>
        
        {/* Right: AI Decision Context, Proactive Rationale & Actions */}
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <div className="flex flex-wrap items-center justify-between gap-space-xs">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container">
              <span className="material-symbols-outlined text-[16px]">psychology</span>
              <span className="font-label-md text-label-md font-bold">Confidence Score: {confidenceScore}%</span>
            </div>
            <div className="flex items-center gap-1.5 text-on-surface-variant font-label-caps text-label-caps uppercase">
              <span className="material-symbols-outlined text-[16px] text-tertiary">cloud_download</span>
              Auto-Trigger in <span className="text-primary font-bold">{countdown > 0 ? `${countdown}s` : (applied ? 'Applied' : '0s')}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest font-bold">Actionable Optimization</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Increase Fan Speed to {targetSpeed}%</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-caps text-label-caps font-semibold">
                Spike Alert
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant">Predicted AQI reaching <strong className="text-on-surface font-semibold">{predictedAqiPeak}</strong> within {peakTimeMins} minutes</span>
            </div>
          </div>
          
          {/* Conversational Machine Learning Rationale Card */}
          <div className="p-space-md rounded-2xl bg-surface-container-low shadow-sm flex flex-col gap-space-xs">
            <div className="flex items-center gap-2 text-primary font-label-md text-label-md font-bold">
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
              <span>Predictive Energy &amp; Dispersion Model</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Proactive purification will suppress the particulate spike and recover chamber AQI to &lt;50 in approximately <strong className="text-on-surface">{recoveryTimeMins} minutes</strong>, saving <strong className="text-secondary font-semibold">{energySavedPercent}% energy</strong> compared to waiting for sensor saturation and activating delayed turbo mode.
            </p>
          </div>
          
          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
            <button 
              className={`flex-1 min-w-[200px] h-12 px-space-lg rounded-xl text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98] ${applied ? 'bg-tertiary' : 'bg-primary hover:bg-primary-container'}`}
              onClick={handleApply}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
              <span>{applied ? `Applied ${targetSpeed}% Speed` : `Apply ${targetSpeed}% Speed Now`}</span>
            </button>
            <button 
              className="h-12 px-space-lg rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all active:scale-[0.98]" 
              onClick={handleKeep}
              type="button"
            >
              Keep {currentSpeed}% Baseline
            </button>
            <button 
              className="h-12 px-space-md rounded-xl hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors flex items-center gap-1.5" 
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>Tune Thresholds</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDecisionCard;
