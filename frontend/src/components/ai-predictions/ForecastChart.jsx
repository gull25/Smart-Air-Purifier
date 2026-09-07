import React from 'react';

const ForecastChart = ({ data }) => {
  const { peakAqi = 0, currentAqi = 0, peakTime = '0', dampenPercent = 0 } = data || {};

  return (
    <div className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm flex flex-col gap-space-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-space-xs">
            <h2 className="font-headline-md text-headline-md text-on-surface">Dual-Domain AQI Temporal Trajectory</h2>
            <span className="px-space-xs py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-caps text-label-caps uppercase">Telemetry + Inference</span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Real-time ESP32 MQ135 readings linked directly into forward LSTM projection window</p>
        </div>
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-space-md font-body-sm text-body-sm text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span className="w-3 h-1 bg-primary rounded-full"></span>
            <span>Historical Sensor (T-2h)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 border-t-2 border-dashed border-amber-500"></span>
            <span>Projected Trend (T+30m)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-2 bg-amber-400/20 rounded"></span>
            <span>87% Confidence Band</span>
          </div>
        </div>
      </div>

      {/* High-Fidelity SVG Chart Canvas */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[760px] w-full h-80 relative">
          <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 960 300">
            <defs>
              {/* Historical Line Gradient */}
              <linearGradient id="histGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#006194" stopOpacity="0.28"></stop>
                <stop offset="100%" stopColor="#006194" stopOpacity="0.0"></stop>
              </linearGradient>
              {/* Forecast Confidence Band Gradient */}
              <linearGradient id="forecastBandGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.22"></stop>
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.03"></stop>
              </linearGradient>
              {/* Neon Pulse Core Filter */}
              <filter height="140%" id="glow" width="140%" x="-20%" y="-20%">
                <feGaussianBlur result="blur" stdDeviation="4"></feGaussianBlur>
                <feComposite in="SourceGraphic" in2="blur" operator="over"></feComposite>
              </filter>
            </defs>

            {/* Grid Lines & Threshold Guides */}
            {/* Threshold 100: Moderate / Sensitive Border */}
            <line stroke="#dae2fd" strokeDasharray="4 4" strokeWidth="1" x1="60" x2="920" y1="60" y2="60"></line>
            <text className="text-[10px] font-mono" fill="#707881" x="65" y="54">100 AQI — SENSITIVE BOUNDARY</text>

            {/* Threshold 50: Good Border */}
            <line stroke="#6ffbbe" strokeDasharray="3 3" strokeOpacity="0.5" strokeWidth="1.5" x1="60" x2="920" y1="180" y2="180"></line>
            <text className="text-[10px] font-mono font-semibold" fill="#00855b" x="65" y="174">50 AQI — OPTIMAL CLEAN AIR BASELINE</text>

            <line stroke="#dae2fd" strokeWidth="1" x1="60" x2="920" y1="240" y2="240"></line>

            {/* Vertical Time Delimiters */}
            {/* 12:20 */}
            <line stroke="#eaedff" strokeWidth="1" x1="120" x2="120" y1="30" y2="250"></line>
            <text className="text-[11px] font-sans" fill="#707881" textAnchor="middle" x="120" y="270">12:20</text>
            {/* 13:00 */}
            <line stroke="#eaedff" strokeWidth="1" x1="260" x2="260" y1="30" y2="250"></line>
            <text className="text-[11px] font-sans" fill="#707881" textAnchor="middle" x="260" y="270">13:00</text>
            {/* 13:40 */}
            <line stroke="#eaedff" strokeWidth="1" x1="400" x2="400" y1="30" y2="250"></line>
            <text className="text-[11px] font-sans" fill="#707881" textAnchor="middle" x="400" y="270">13:40</text>

            {/* NOW Divider at 14:20 */}
            <rect fill="#006194" height="235" width="1" x="540" y="20"></rect>

            {/* Future Projections */}
            {/* 14:35 */}
            <line stroke="#eaedff" strokeDasharray="2 2" strokeWidth="1" x1="680" x2="680" y1="30" y2="250"></line>
            <text className="text-[11px] font-sans" fill="#707881" textAnchor="middle" x="680" y="270">14:35 (+15m)</text>
            {/* 14:50 */}
            <line stroke="#eaedff" strokeDasharray="2 2" strokeWidth="1" x1="820" x2="820" y1="30" y2="250"></line>
            <text className="text-[11px] font-sans" fill="#707881" textAnchor="middle" x="820" y="270">14:50 (+30m)</text>

            {/* Historical Area Fill */}
            <path d="M 60 200 L 120 195 L 260 184 L 400 168 L 540 154 L 540 250 L 60 250 Z" fill="url(#histGradient)"></path>
            {/* Historical Line */}
            <path d="M 60 200 L 120 195 L 260 184 L 400 168 L 540 154" stroke="#006194" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>

            {/* Historical Key Dots */}
            <circle cx="120" cy="195" fill="#ffffff" r="4" stroke="#006194" strokeWidth="2.5"></circle>
            <circle cx="260" cy="184" fill="#ffffff" r="4" stroke="#006194" strokeWidth="2.5"></circle>
            <circle cx="400" cy="168" fill="#ffffff" r="4" stroke="#006194" strokeWidth="2.5"></circle>

            {/* Prediction Confidence Band Area */}
            <path d="M 540 144 C 620 126, 710 108, 800 98 C 840 94, 860 106, 880 116 L 880 140 C 860 130, 840 120, 800 122 C 710 132, 620 150, 540 164 Z" fill="url(#forecastBandGradient)"></path>

            {/* Forecast Line (Dashed Orange/Amber) */}
            <path d="M 540 154 C 620 138, 710 120, 800 110 C 840 105, 860 118, 880 128" stroke="#d97706" strokeDasharray="6 4" strokeLinecap="round" strokeWidth="3"></path>

            {/* Projected Dots */}
            <circle cx="620" cy="138" fill="#ffffff" r="4" stroke="#d97706" strokeWidth="2"></circle>
            <circle cx="710" cy="120" fill="#ffffff" r="4" stroke="#d97706" strokeWidth="2"></circle>
            <circle cx="800" cy="110" fill="#f59e0b" r="5" stroke="#ffffff" strokeWidth="2"></circle>
            <circle cx="880" cy="128" fill="#ffffff" r="4" stroke="#d97706" strokeWidth="2"></circle>

            {/* Projected Peak Flag Badge */}
            <g transform="translate(775, 68)">
              <rect fill="#131b2e" height="26" rx="6" width="64"></rect>
              <text className="text-[11px] font-bold font-sans" fill="#ffffff" textAnchor="middle" x="32" y="17">PEAK {peakAqi}</text>
              <polygon fill="#131b2e" points="32,26 28,32 36,32"></polygon>
            </g>

            {/* Present "NOW" Marker */}
            <circle cx="540" cy="154" fill="#006194" filter="url(#glow)" r="7"></circle>
            <circle cx="540" cy="154" fill="#ffffff" r="4"></circle>
            <g transform="translate(505, 108)">
              <rect fill="#006194" height="28" rx="6" width="70"></rect>
              <text className="text-[11px] font-bold font-sans" fill="#ffffff" textAnchor="middle" x="35" y="18">NOW • {currentAqi}</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Live Context Callout below chart */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-space-md rounded-xl bg-surface-container gap-space-sm">
        <div className="flex items-center gap-space-sm">
          <span className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">insights</span>
          </span>
          <p className="font-body-md text-body-md text-on-surface">
            <span className="font-semibold text-on-surface">Simulated Trajectory:</span> Atmospheric load set to crest at <strong>AQI {peakAqi}</strong> in {peakTime} mins due to localized volatile vapor influx. Auto-remediation will dampen peak by <strong>{dampenPercent}%</strong> if engaged.
          </p>
        </div>
        <span className="font-label-caps text-label-caps text-secondary whitespace-nowrap uppercase tracking-wider font-bold">Autopilot Active</span>
      </div>
    </div>
  );
};

export default ForecastChart;
