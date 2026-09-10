import React from 'react';

const AnalyticsHeader = ({ dateRange, onDateRangeChange }) => {
  return (
    <div className="flex flex-col gap-space-lg">
      {/* Top Action & Title Row */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-lg">
        <div className="flex flex-col gap-space-2xs">
          <div className="flex items-center gap-space-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-[18px] text-primary">insights</span>
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-primary">Longitudinal Intelligence Suite</span>
            <span className="text-outline-variant text-[11px]">•</span>
            <span className="font-label-caps text-label-caps text-tertiary">Live Model v4.1 Sync</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Air Quality Analytics &amp; Longitudinal Insights</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
            Historical sensor telemetry correlation, purifier operational runtime analysis, and multi-tier AQI distribution patterns.
          </p>
        </div>
        
        {/* Quick Operational Badge */}
        <div className="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-space-sm rounded-xl shadow-sm self-start xl:self-auto">
          <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">memory</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-on-surface">HVAC Telemetry Engine</span>
            <span className="font-body-sm text-body-sm text-tertiary flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary inline-block animate-pulse"></span>
              ESP32 Latency 18ms • 98% Link
            </span>
          </div>
        </div>
      </div>
      
      {/* Filter Toolbar & Export Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-sm rounded-2xl shadow-sm">
        <div className="flex flex-wrap items-center gap-space-xs">
          <button 
            className={`px-space-md py-space-xs rounded-xl font-label-md text-label-md transition-all ${dateRange === '1d' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-low'}`} 
            onClick={() => onDateRangeChange('1d')}
            type="button"
          >
            Today
          </button>
          <button 
            className={`px-space-md py-space-xs rounded-xl font-label-md text-label-md transition-all ${dateRange === '7d' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-low'}`} 
            onClick={() => onDateRangeChange('7d')}
            type="button"
          >
            Past 7 Days
          </button>
          <button 
            className={`px-space-md py-space-xs rounded-xl font-label-md text-label-md transition-all ${dateRange === '30d' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-low'}`} 
            onClick={() => onDateRangeChange('30d')}
            type="button"
          >
            Past 30 Days
          </button>
          <button 
            className={`px-space-md py-space-xs rounded-xl font-label-md text-label-md transition-all ${dateRange === '90d' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-low'}`} 
            onClick={() => onDateRangeChange('90d')}
            type="button"
          >
            90 Days
          </button>
          <button className="flex items-center gap-space-2xs px-space-md py-space-xs rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-low transition-colors" type="button">
            <span className="material-symbols-outlined text-[16px]">calendar_month</span>
            <span>Custom Range</span>
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-space-xs">
          <button className="flex items-center gap-space-xs px-space-md py-space-xs rounded-xl bg-surface-container-low hover:bg-surface-container-high font-label-md text-label-md text-on-surface transition-all" type="button">
            <span className="material-symbols-outlined text-[18px] text-primary">download</span>
            <span>Export CSV / JSON Report</span>
          </button>
          <button className="flex items-center gap-space-xs px-space-md py-space-xs rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md shadow-sm transition-all" type="button">
            <span className="material-symbols-outlined text-[18px]">schedule_send</span>
            <span>Schedule Automated Digest</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
