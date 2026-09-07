import React from 'react';

const XAIFeatureImportance = ({ data }) => {
  const {
    mq135Slope = 0,
    factor1Weight = 0,
    factor2Weight = 0,
    factor3Weight = 0,
    factor4Weight = 0,
    factor5Weight = 0
  } = data || {};

  return (
    <div className="lg:col-span-7 bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm flex flex-col gap-space-lg">
      <div>
        <div className="flex items-center justify-between mb-space-xs">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Explainable AI (XAI) Feature Importance</h3>
          <span className="px-space-xs py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-caps text-label-caps">SHAP Values</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Deconstruction of atmospheric factors driving the predicted <strong>+17 AQI</strong> delta over the next 30 minutes.
        </p>
      </div>

      {/* Sensor-to-Prediction Flow Diagram */}
      <div className="p-space-md rounded-xl bg-surface-container flex items-center justify-between overflow-x-auto gap-space-xs py-space-lg">
        <div className="flex flex-col items-center text-center min-w-[90px]">
          <div className="w-10 h-10 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-center text-primary mb-1">
            <span className="material-symbols-outlined text-[20px]">sensors</span>
          </div>
          <span className="font-label-caps text-label-caps text-on-surface font-bold">MQ135 Gas</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">1.42V Signal</span>
        </div>
        <span className="material-symbols-outlined text-outline-variant text-[18px]">arrow_forward</span>
        <div className="flex flex-col items-center text-center min-w-[90px]">
          <div className="w-10 h-10 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-center text-secondary mb-1">
            <span className="material-symbols-outlined text-[20px]">developer_board</span>
          </div>
          <span className="font-label-caps text-label-caps text-on-surface font-bold">ESP32 Edge</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">Ingestion Node</span>
        </div>
        <span className="material-symbols-outlined text-outline-variant text-[18px]">arrow_forward</span>
        <div className="flex flex-col items-center text-center min-w-[90px]">
          <div className="w-10 h-10 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-center text-tertiary mb-1">
            <span className="material-symbols-outlined text-[20px]">database</span>
          </div>
          <span className="font-label-caps text-label-caps text-on-surface font-bold">Time-Series</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">Rolling Store</span>
        </div>
        <span className="material-symbols-outlined text-outline-variant text-[18px]">arrow_forward</span>
        <div className="flex flex-col items-center text-center min-w-[90px]">
          <div className="w-10 h-10 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-center text-primary-container mb-1">
            <span className="material-symbols-outlined text-[20px]">neurology</span>
          </div>
          <span className="font-label-caps text-label-caps text-on-surface font-bold">LSTM + Forest</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">Pipeline</span>
        </div>
        <span className="material-symbols-outlined text-outline-variant text-[18px]">arrow_forward</span>
        <div className="flex flex-col items-center text-center min-w-[90px]">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white shadow-sm flex items-center justify-center mb-1">
            <span className="material-symbols-outlined text-[20px]">trending_up</span>
          </div>
          <span className="font-label-caps text-label-caps text-on-surface font-bold">AQI 78 Target</span>
          <span className="font-body-sm text-body-sm text-amber-700 font-semibold">+28m Zenith</span>
        </div>
      </div>

      {/* Feature Importance Weight Bars */}
      <div className="flex flex-col gap-space-md">
        {/* Factor 1 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between font-label-md text-label-md">
            <div className="flex items-center gap-2">
              <span className="text-on-surface font-semibold">MQ135 Gas Telemetry Slope (Rising)</span>
              <span className="font-body-sm text-body-sm text-error font-mono">+{mq135Slope} ppm/min</span>
            </div>
            <span className="text-primary font-bold">{factor1Weight}% Weight</span>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: `${factor1Weight}%` }}></div>
          </div>
        </div>

        {/* Factor 2 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between font-label-md text-label-md">
            <div className="flex items-center gap-2">
              <span className="text-on-surface font-semibold">Diurnal Facility Activity Pattern</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Midday movement phase</span>
            </div>
            <span className="text-primary font-bold">{factor2Weight}% Weight</span>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: `${factor2Weight}%` }}></div>
          </div>
        </div>

        {/* Factor 3 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between font-label-md text-label-md">
            <div className="flex items-center gap-2">
              <span className="text-on-surface font-semibold">Micro-Climate Ambient Equilibrium</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">48% RH | 23.4°C</span>
            </div>
            <span className="text-primary font-bold">{factor3Weight}% Weight</span>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
            <div className="bg-secondary h-full rounded-full" style={{ width: `${factor3Weight}%` }}></div>
          </div>
        </div>

        {/* Factor 4 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between font-label-md text-label-md">
            <div className="flex items-center gap-2">
              <span className="text-on-surface font-semibold">HVAC Current Purifier Exhaust</span>
              <span className="font-body-sm text-body-sm text-tertiary">65% Centrifugal RPM</span>
            </div>
            <span className="text-primary font-bold">{factor4Weight}% Weight</span>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
            <div className="bg-tertiary h-full rounded-full" style={{ width: `${factor4Weight}%` }}></div>
          </div>
        </div>

        {/* Factor 5 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between font-label-md text-label-md">
            <div className="flex items-center gap-2">
              <span className="text-on-surface font-semibold">External Perimeter Weather Station</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Clean exterior baseline</span>
            </div>
            <span className="text-primary font-bold">{factor5Weight}% Weight</span>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
            <div className="bg-outline-variant h-full rounded-full" style={{ width: `${factor5Weight}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XAIFeatureImportance;
