import React from 'react';

const PredictionsHeader = ({ data }) => {
  const { retrainTime = '', latency = '' } = data || {};

  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm relative overflow-hidden">
      <div className="absolute -right-20 -top-24 w-80 h-80 bg-primary-fixed/25 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute right-40 -bottom-20 w-64 h-64 bg-secondary-container/20 rounded-full blur-2xl pointer-events-none"></div>
      <div className="flex flex-col gap-space-xs z-10 max-w-2xl">
        <div className="flex items-center gap-space-xs">
          <span className="inline-flex items-center gap-1.5 px-space-xs py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-caps text-label-caps uppercase tracking-wider">
            <span className="material-symbols-outlined text-[14px]">psychology</span>
            Neural Inference Engine
          </span>
          <span className="text-outline-variant text-[12px]">•</span>
          <span className="font-label-caps text-label-caps text-secondary uppercase font-semibold">ESP32 MQ135 Live Bridge</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">AI AQI Prediction &amp; Forecasting</h1>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Trained LSTM + Random Forest ensemble predicting indoor atmospheric dynamics using high-frequency ESP32 MQ135 electro-chemical sensor telemetry.
        </p>
      </div>
      {/* Telemetry Meta Badges */}
      <div className="flex flex-wrap items-center gap-space-sm z-10">
        <div className="flex flex-col bg-surface-container-low px-space-md py-space-xs rounded-xl shadow-sm">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Model Retrain</span>
          <div className="flex items-center gap-1 text-on-surface font-label-md text-label-md">
            <span className="material-symbols-outlined text-[16px] text-tertiary">update</span>
            <span>{retrainTime}</span>
          </div>
        </div>
        <div className="flex flex-col bg-surface-container-low px-space-md py-space-xs rounded-xl shadow-sm">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Architecture</span>
          <div className="flex items-center gap-1 text-on-surface font-label-md text-label-md">
            <span className="material-symbols-outlined text-[16px] text-primary">memory</span>
            <span>v2.4.1-edge</span>
          </div>
        </div>
        <div className="flex flex-col bg-surface-container-low px-space-md py-space-xs rounded-xl shadow-sm">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Latency</span>
          <div className="flex items-center gap-1 text-on-surface font-label-md text-label-md">
            <span className="material-symbols-outlined text-[16px] text-tertiary">bolt</span>
            <span>{latency}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionsHeader;
