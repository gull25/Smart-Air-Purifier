import React from 'react';

const AQIStatus = ({ aqi }) => {
  return (
    <section className="w-full bg-surface-container-low px-space-md py-space-md lg:px-page-pad-desktop lg:py-space-md shadow-sm">
      <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-space-sm items-stretch">
        <div className="bg-surface-container-lowest p-space-sm rounded-xl flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Current AQI</span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          </div>
          <div className="flex items-baseline gap-space-2xs mt-space-2xs">
            <span className="font-telemetry-value-md text-telemetry-value-md text-on-surface">{aqi || 61}</span>
            <span className="font-label-caps text-label-caps text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-full font-bold">Moderate</span>
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">Indoor Node-01</span>
        </div>
        
        <div className="bg-surface-container-lowest p-space-sm rounded-xl flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Safety Assessment</span>
            <span className="material-symbols-outlined text-[16px] text-amber-600">health_and_safety</span>
          </div>
          <div className="mt-space-2xs">
            <span className="font-label-md text-label-md text-on-surface block leading-snug">Safe for General Population</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant block mt-0.5">Sensitive groups caution</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-sm rounded-xl flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Purifier Status</span>
            <span className="material-symbols-outlined text-[16px] text-tertiary animate-spin">cyclone</span>
          </div>
          <div className="flex items-baseline gap-space-2xs mt-space-2xs">
            <span className="font-telemetry-value-md text-telemetry-value-md text-primary">65%</span>
            <span className="font-label-caps text-label-caps text-tertiary font-semibold">Active</span>
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant truncate">BLDC 1,820 RPM</span>
        </div>

        <div className="bg-surface-container-lowest p-space-sm rounded-xl flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">AI 30m Horizon</span>
            <span className="material-symbols-outlined text-[16px] text-primary">auto_awesome</span>
          </div>
          <div className="flex items-baseline gap-space-2xs mt-space-2xs">
            <span className="font-telemetry-value-md text-telemetry-value-md text-on-surface">78</span>
            <span className="font-label-caps text-label-caps text-error bg-error-container px-1 py-0.5 rounded font-bold">+17</span>
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant">87% Model Confidence</span>
        </div>

        <div className="bg-surface-container-lowest p-space-sm rounded-xl flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Recommended Fan</span>
            <span className="material-symbols-outlined text-[16px] text-secondary">trending_up</span>
          </div>
          <div className="flex items-baseline gap-space-2xs mt-space-2xs">
            <span className="font-telemetry-value-md text-telemetry-value-md text-secondary">70%</span>
            <span className="font-label-caps text-label-caps text-secondary font-semibold">Escalate</span>
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Auto pre-clear triggered</span>
        </div>

        <div className="bg-surface-container-lowest p-space-sm rounded-xl flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">ESP32 Core</span>
            <span className="flex items-center gap-1 font-body-sm text-body-sm text-tertiary">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>18ms
            </span>
          </div>
          <div className="mt-space-2xs">
            <span className="font-label-md text-label-md text-on-surface block">192.168.1.142</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant block mt-0.5">MQ135 Gas: Calibrated</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AQIStatus;
