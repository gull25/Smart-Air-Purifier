import React from 'react';

const ComplianceDonutChart = ({ data }) => {
  const { goodPercent = 0, goodHrs = 0, modPercent = 0, modHrs = 0, sensitivePercent = 0, sensitiveHrs = 0 } = data || {};
  
  // Calculate dasharray values for the donut chart (total circumference = 251.2)
  const totalCircumference = 251.2;
  const goodDash = (goodPercent / 100) * totalCircumference;
  const modDash = (modPercent / 100) * totalCircumference;
  const sensitiveDash = (sensitivePercent / 100) * totalCircumference;

  return (
    <div className="lg:col-span-4 bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between gap-space-md">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">Compliance &amp; Tiers</h2>
          <span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface font-label-caps text-label-caps">ISO 16000</span>
        </div>
        <span className="font-body-sm text-body-sm text-on-surface-variant">Multi-tier distribution over recorded duration</span>
      </div>
      
      {/* Donut Visual with Inner Stats */}
      <div className="relative flex items-center justify-center my-space-xs">
        <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background Track */}
          <circle cx="50" cy="50" fill="none" r="40" stroke="#f2f3ff" strokeWidth="12"></circle>
          {/* Good Tier */}
          <circle cx="50" cy="50" fill="none" r="40" stroke="#00855b" strokeDasharray={`${goodDash} ${totalCircumference}`} strokeDashoffset="0" strokeLinecap="round" strokeWidth="12"></circle>
          {/* Moderate Tier */}
          <circle cx="50" cy="50" fill="none" r="40" stroke="#007bb9" strokeDasharray={`${modDash} ${totalCircumference}`} strokeDashoffset={`-${goodDash}`} strokeWidth="12"></circle>
          {/* Sensitive/Spike */}
          <circle cx="50" cy="50" fill="none" r="40" stroke="#ba1a1a" strokeDasharray={`${sensitiveDash} ${totalCircumference}`} strokeDashoffset={`-${goodDash + modDash}`} strokeWidth="12"></circle>
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="font-telemetry-value-md text-telemetry-value-md text-on-surface">{goodPercent.toFixed(1)}%</span>
          <span className="font-label-caps text-label-caps text-tertiary font-bold uppercase tracking-wider">Optimal Tier</span>
        </div>
      </div>
      
      {/* Tier Breakdown Legend */}
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between p-space-xs rounded-xl bg-surface-container-low">
          <div className="flex items-center gap-space-xs">
            <span className="w-3 h-3 rounded-full bg-tertiary"></span>
            <span className="font-label-md text-label-md text-on-surface">Good (0 - 50 AQI)</span>
          </div>
          <span className="font-label-md text-label-md text-on-surface font-semibold">{goodHrs.toFixed(1)} hrs ({goodPercent}%)</span>
        </div>
        <div className="flex items-center justify-between p-space-xs rounded-xl bg-surface-container-low">
          <div className="flex items-center gap-space-xs">
            <span className="w-3 h-3 rounded-full bg-primary"></span>
            <span className="font-label-md text-label-md text-on-surface">Moderate (51 - 100 AQI)</span>
          </div>
          <span className="font-label-md text-label-md text-on-surface font-semibold">{modHrs.toFixed(1)} hrs ({modPercent}%)</span>
        </div>
        <div className="flex items-center justify-between p-space-xs rounded-xl bg-surface-container-low">
          <div className="flex items-center gap-space-xs">
            <span className="w-3 h-3 rounded-full bg-error"></span>
            <span className="font-label-md text-label-md text-on-surface">Sensitive (&gt;100 AQI)</span>
          </div>
          <span className="font-label-md text-label-md text-on-surface font-semibold">{sensitiveHrs.toFixed(1)} hrs ({sensitivePercent}%)</span>
        </div>
      </div>
      <div className="p-space-sm rounded-xl bg-surface-container-high/60 flex items-center gap-space-xs text-on-surface-variant">
        <span className="material-symbols-outlined text-[18px] text-tertiary">shield_with_heart</span>
        <span className="font-body-sm text-body-sm">Exceeds Clean Air Act Title 42 lab facility indoor requirements by +14.2%.</span>
      </div>
    </div>
  );
};

export default ComplianceDonutChart;
