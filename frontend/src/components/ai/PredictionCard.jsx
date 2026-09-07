import React from 'react';

const PredictionCard = ({ data }) => {
  const { predictedIndex, surgeValue, surgePercentage, confidencePercentage, horizonMinutes, reasoning } = data || {};

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between relative overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Neural Forecast</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">T+{horizonMinutes || 30} Min Horizon</span>
        </div>
        <div className="p-1.5 rounded-full bg-primary-fixed text-primary shadow-sm flex items-center justify-center">
          <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
        </div>
      </div>
      <div className="my-space-md flex flex-col items-center justify-center text-center">
        <div className="relative">
          <span className="font-display-hero text-display-hero text-on-surface leading-none">{predictedIndex || 0}</span>
          <div className="absolute -top-1 -right-7 px-1.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-caps text-label-caps font-bold">
            +{surgeValue || 0}
          </div>
        </div>
        <span className="font-label-md text-label-md text-error font-semibold mt-2 flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">trending_up</span>
          +{surgePercentage || 0}% projected surge
        </span>
      </div>
      <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Confidence</span>
          <span className="font-label-caps text-label-caps text-primary font-bold">{confidencePercentage || 0}% high</span>
        </div>
        <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
          <div className="bg-primary h-full rounded-full" style={{ width: `${confidencePercentage || 0}%` }}></div>
        </div>
        <span className="font-body-sm text-body-sm text-on-surface-variant truncate">{reasoning || 'Calculating...'}</span>
      </div>
    </div>
  );
};

export default PredictionCard;
