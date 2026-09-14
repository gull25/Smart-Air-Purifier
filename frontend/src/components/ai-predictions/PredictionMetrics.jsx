import React, { useState } from 'react';

const PredictionMetrics = ({ data }) => {
  const {
    observedAqi = 0,
    predictedAqi = 0,
    predictedDelta = 0,
    timeToPeak = 0,
    zenithTime = '',
    confidence = 0,
    errorMargin = 0,
    recommendedAction = '',
    recommendedSpeed = 0
  } = data || {};
  const [isApplying, setIsApplying] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const handleApplySpeed = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setIsApplied(true);
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
      {/* Metric 1: Observed AQI */}
      <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-space-xs">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Current Observed</span>
          <span className="w-3 h-3 rounded-full bg-amber-400"></span>
        </div>
        <div className="flex items-baseline gap-space-xs my-space-xs">
          <span className="font-telemetry-value-lg text-telemetry-value-lg text-on-surface tracking-tight">{observedAqi}</span>
          <span className="font-label-md text-label-md text-on-surface-variant">AQI</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-space-xs py-0.5 rounded-full bg-surface-container text-on-surface font-label-caps text-label-caps w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          Moderate Quality
        </div>
      </div>

      {/* Metric 2: Predicted AQI */}
      <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary"></div>
        <div className="flex items-center justify-between mb-space-xs pl-space-xs">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Predicted (+30m)</span>
          <span className="material-symbols-outlined text-secondary text-[20px]">trending_up</span>
        </div>
        <div className="flex items-baseline gap-space-xs my-space-xs pl-space-xs">
          <span className="font-telemetry-value-lg text-telemetry-value-lg text-primary tracking-tight">{predictedAqi}</span>
          <span className="font-label-md text-label-md text-error">+{predictedDelta} AQI</span>
        </div>
        <span className="font-body-sm text-body-sm text-on-surface-variant pl-space-xs">Trending to Sensitive edge</span>
      </div>

      {/* Metric 3: Time to Peak */}
      <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-space-xs">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Time to Peak</span>
          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">timer</span>
        </div>
        <div className="flex items-baseline gap-space-xs my-space-xs">
          <span className="font-telemetry-value-md text-telemetry-value-md text-on-surface">{timeToPeak}<span className="text-headline-sm font-normal text-on-surface-variant ml-1">min</span></span>
        </div>
        <div className="flex items-center gap-1 text-on-surface-variant font-body-sm text-body-sm">
          <span>Est. zenith at</span>
          <span className="font-label-md text-label-md text-on-surface">{zenithTime}</span>
        </div>
      </div>

      {/* Metric 4: Confidence Score s gufigpfdu  */}
      <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-space-xs">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Confidence</span>
          <span className="material-symbols-outlined text-tertiary text-[20px]">verified</span>
        </div>
        <div className="flex items-baseline gap-space-xs my-space-xs">
          <span className="font-telemetry-value-lg text-telemetry-value-lg text-tertiary tracking-tight">{confidence}%</span>
        </div>
        <div className="w-full flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
          <span>Error Margin:</span>
          <span className="font-label-md text-label-md text-on-surface">±{errorMargin} AQI</span>
        </div>
      </div>

      {/* Metric 5: Recommended Action */}
      <div className="bg-gradient-to-br from-primary to-primary-container p-space-lg rounded-2xl shadow-md text-on-primary flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps text-primary-fixed uppercase tracking-wide">AI Recommendation</span>
          <span className="material-symbols-outlined text-[20px] text-primary-fixed">auto_mode</span>
        </div>
        <div className="my-space-xs">
          <span className="font-label-caps text-label-caps text-primary-fixed uppercase block">Prescribed Action</span>
          <span className="font-headline-sm text-headline-sm text-on-primary">{recommendedAction}</span>
        </div>
        <button 
          className={`w-full py-space-xs px-space-md rounded-xl font-label-md text-label-md transition-all flex items-center justify-center gap-2 shadow-sm ${
            isApplied 
              ? 'bg-tertiary-fixed text-on-tertiary-fixed' 
              : 'bg-surface-container-lowest text-primary hover:bg-surface-bright active:scale-[0.98]'
          }`}
          onClick={!isApplied && !isApplying ? handleApplySpeed : undefined}
          type="button"
        >
          {isApplying ? (
            <>
              <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
              <span>Applying {recommendedSpeed}%...</span>
            </>
          ) : isApplied ? (
            <>
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>Fan Set to {recommendedSpeed}%</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">mode_fan</span>
              <span>Apply Speed Now</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PredictionMetrics;
