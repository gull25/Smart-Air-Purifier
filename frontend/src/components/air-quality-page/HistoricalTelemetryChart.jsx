import React from 'react';

const HistoricalTelemetryChart = () => {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm flex flex-col gap-space-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex flex-col">
          <div className="flex items-center gap-space-xs text-primary font-label-caps uppercase">
            <span className="material-symbols-outlined text-[16px]">show_chart</span>
            <span>Correlated Environmental Trends</span>
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface">AQI Timeline &amp; Autonomous HVAC Response</h2>
        </div>
        
        {/* Timeframe Selectors */}
        <div className="flex items-center bg-surface-container-low p-1 rounded-xl">
          <button className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all" type="button">1 Hour</button>
          <button className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all" type="button">6 Hours</button>
          <button className="px-space-md py-space-xs rounded-lg font-label-md text-label-md bg-primary text-on-primary shadow-sm transition-all" type="button">24 Hours</button>
          <button className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all" type="button">7 Days</button>
          <button className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all" type="button">Custom</button>
        </div>
      </div>
      
      {/* Chart Legend */}
      <div className="flex flex-wrap items-center gap-space-lg text-body-sm text-on-surface-variant">
        <div className="flex items-center gap-space-xs">
          <span className="w-3 h-1 rounded-full bg-primary"></span>
          <span className="font-label-md text-label-md text-on-surface">AQI Multi-Sensor Composite</span>
        </div>
        <div className="flex items-center gap-space-xs">
          <span className="w-3 h-1 rounded-full bg-secondary"></span>
          <span className="font-label-md text-label-md text-on-surface">MQ135 Gas Analog Index (Normalized)</span>
        </div>
        <div className="flex items-center gap-space-xs">
          <span className="w-3 h-1 rounded-full bg-tertiary"></span>
          <span className="font-label-md text-label-md text-on-surface">Purifier CFM Adjustment / Speed</span>
        </div>
      </div>
      
      {/* High Fidelity Inline SVG Telemetry Graph */}
      <div className="w-full h-72 bg-surface-container-low/40 rounded-xl relative p-space-sm overflow-hidden flex flex-col justify-end">
        {/* Y-Axis Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between py-6 px-4 pointer-events-none opacity-20">
          <div className="w-full border-b border-outline-variant flex justify-between"><span className="text-body-sm font-label-caps">150 AQI</span></div>
          <div className="w-full border-b border-outline-variant flex justify-between"><span className="text-body-sm font-label-caps">100 AQI</span></div>
          <div className="w-full border-b border-outline-variant flex justify-between"><span className="text-body-sm font-label-caps">50 AQI</span></div>
          <div className="w-full border-b border-outline-variant flex justify-between"><span className="text-body-sm font-label-caps">0 AQI</span></div>
        </div>
        
        {/* SVG Visual Data Curves */}
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 900 240">
          <defs>
            <linearGradient id="aqiAreaGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#006194" stopOpacity="0.32"></stop>
              <stop offset="100%" stopColor="#006194" stopOpacity="0.0"></stop>
            </linearGradient>
            <linearGradient id="fanAreaGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#006947" stopOpacity="0.18"></stop>
              <stop offset="100%" stopColor="#006947" stopOpacity="0.0"></stop>
            </linearGradient>
          </defs>
          {/* Fan CFM Step Curve (Green) */}
          <path d="M 0 190 L 120 190 L 180 150 L 320 150 L 400 90 L 520 90 L 600 130 L 750 130 L 820 180 L 900 180" fill="none" opacity="0.8" stroke="#006947" strokeDasharray="4 4" strokeWidth="2"></path>
          {/* MQ135 Analog Wave (Teal) */}
          <path d="M 0 160 Q 140 180, 240 140 T 450 110 T 650 130 T 900 145" fill="none" opacity="0.75" stroke="#006a61" strokeWidth="2"></path>
          {/* AQI Composite Area (Primary Blue) */}
          <path d="M 0 170 Q 150 190, 280 155 T 480 80 T 680 125 T 900 138 L 900 240 L 0 240 Z" fill="url(#aqiAreaGrad)"></path>
          {/* AQI Composite Stroke */}
          <path d="M 0 170 Q 150 190, 280 155 T 480 80 T 680 125 T 900 138" fill="none" stroke="#006194" strokeLinecap="round" strokeWidth="3.5"></path>
          {/* High Point Tooltip Marker at (480, 80) */}
          <circle cx="480" cy="80" fill="#006194" r="5" stroke="#ffffff" strokeWidth="2.5"></circle>
          <circle className="animate-ping" cx="480" cy="80" fill="#006194" opacity="0.2" r="9"></circle>
        </svg>
        
        {/* Time Label Bar */}
        <div className="w-full flex items-center justify-between text-on-surface-variant font-label-caps text-label-caps pt-2 relative z-10">
          <span>00:00 (Midnight)</span>
          <span>04:00</span>
          <span>08:00</span>
          <span>12:00 (Peak TVOC Event)</span>
          <span>16:00</span>
          <span>20:00</span>
          <span>23:59 (Current)</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low text-body-sm text-on-surface-variant">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-primary text-[20px]">psychology</span>
          <span><strong>AI Inference:</strong> Peak at 12:35 PM triggered Turbo Mode 3. Air exchange cleared 89% of volatile aerosols within 22 minutes.</span>
        </div>
        <span className="font-label-caps text-label-caps text-tertiary uppercase">Purge Nominal</span>
      </div>
    </div>
  );
};

export default HistoricalTelemetryChart;
