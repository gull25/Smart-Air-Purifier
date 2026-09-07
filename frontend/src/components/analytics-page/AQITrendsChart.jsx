import React from 'react';

const AQITrendsChart = ({ data }) => {
  const { peakSpikeResponse = '0', meanAirClearance = '0', diurnalStability = '0%' } = data || {};
  return (
    <div className="lg:col-span-8 bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
        <div className="flex flex-col">
          <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">AQI Trends vs. Automated Purifier Fan Speed Response</h2>
          <span className="font-body-sm text-body-sm text-on-surface-variant">7-day rolling window showing diurnal morning/evening peaks and AI proactive attenuation</span>
        </div>
        <div className="flex items-center gap-space-md">
          <div className="flex items-center gap-space-2xs">
            <span className="w-3 h-3 rounded-full bg-primary inline-block"></span>
            <span className="font-label-caps text-label-caps text-on-surface">Indoor AQI</span>
          </div>
          <div className="flex items-center gap-space-2xs">
            <span className="w-3 h-3 rounded-full bg-secondary inline-block"></span>
            <span className="font-label-caps text-label-caps text-on-surface">Fan PWM %</span>
          </div>
        </div>
      </div>
      
      {/* Custom SVG Chart: Dual Axis (AQI vs Fan Speed) */}
      <div className="relative w-full h-80 bg-surface-container-low/40 rounded-xl p-space-sm flex flex-col justify-between overflow-hidden">
        <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 780 260">
          <defs>
            <linearGradient id="aqiFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#006194" stopOpacity="0.28"></stop>
              <stop offset="100%" stopColor="#006194" stopOpacity="0.0"></stop>
            </linearGradient>
            <linearGradient id="fanFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#006a61" stopOpacity="0.22"></stop>
              <stop offset="100%" stopColor="#006a61" stopOpacity="0.0"></stop>
            </linearGradient>
          </defs>
          {/* Horizontal Guide Gridlines */}
          <line stroke="#dae2fd" strokeDasharray="3 3" x1="40" x2="760" y1="40" y2="40"></line>
          <line stroke="#dae2fd" strokeDasharray="3 3" x1="40" x2="760" y1="90" y2="90"></line>
          <line stroke="#dae2fd" strokeDasharray="3 3" x1="40" x2="760" y1="140" y2="140"></line>
          <line stroke="#dae2fd" strokeDasharray="3 3" x1="40" x2="760" y1="190" y2="190"></line>
          <line stroke="#bfc7d2" strokeWidth="1.5" x1="40" x2="760" y1="230" y2="230"></line>
          
          {/* Area under AQI */}
          <path d="M 50 195 C 100 190, 130 160, 160 85 C 190 20, 220 180, 260 170 C 300 160, 330 110, 370 70 C 410 40, 440 180, 480 185 C 520 190, 560 130, 600 95 C 640 60, 670 165, 710 180 C 730 185, 750 190, 750 190 L 750 230 L 50 230 Z" fill="url(#aqiFill)"></path>
          {/* AQI Curve */}
          <path d="M 50 195 C 100 190, 130 160, 160 85 C 190 20, 220 180, 260 170 C 300 160, 330 110, 370 70 C 410 40, 440 180, 480 185 C 520 190, 560 130, 600 95 C 640 60, 670 165, 710 180 C 730 185, 750 190, 750 190" fill="none" stroke="#006194" strokeLinecap="round" strokeWidth="3"></path>
          
          {/* Area under Fan PWM */}
          <path d="M 50 210 C 100 205, 135 170, 165 95 C 195 40, 225 190, 265 185 C 305 180, 335 125, 375 80 C 415 50, 445 195, 485 195 C 525 195, 565 145, 605 110 C 645 80, 675 180, 715 195 C 735 200, 750 205, 750 205 L 750 230 L 50 230 Z" fill="url(#fanFill)"></path>
          {/* Fan Modulation Line (proactive response) */}
          <path d="M 50 210 C 100 205, 135 170, 165 95 C 195 40, 225 190, 265 185 C 305 180, 335 125, 375 80 C 415 50, 445 195, 485 195 C 525 195, 565 145, 605 110 C 645 80, 675 180, 715 195 C 735 200, 750 205, 750 205" fill="none" stroke="#006a61" strokeDasharray="5 3" strokeLinecap="round" strokeWidth="2.5"></path>
          
          {/* Peak Callout Point 1 */}
          <circle cx="160" cy="85" fill="#ba1a1a" r="5"></circle>
          <circle cx="160" cy="85" r="9" stroke="#ba1a1a" strokeOpacity="0.4" strokeWidth="2"></circle>
          {/* Peak Callout Point 2 */}
          <circle cx="370" cy="70" fill="#006194" r="5"></circle>
          {/* Peak Callout Point 3 */}
          <circle cx="600" cy="95" fill="#006194" r="5"></circle>
        </svg>
        
        {/* Timeline Axis Labels */}
        <div className="flex justify-between px-space-md font-body-sm text-body-sm text-on-surface-variant">
          <span>Mon 00:00</span>
          <span>Tue 08:00 (Morning Peak)</span>
          <span>Wed 14:00</span>
          <span>Thu 19:30 (Evening Cook)</span>
          <span>Fri 12:00</span>
          <span>Sat 18:00 (Spike Purged)</span>
          <span>Sun 23:59</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-xs">
        <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Peak Spike Response</span>
          <span className="font-headline-sm text-headline-sm text-on-surface">{peakSpikeResponse} mins</span>
          <span className="font-body-sm text-body-sm text-tertiary">Time to 90% fan boost</span>
        </div>
        <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Mean Air Clearance</span>
          <span className="font-headline-sm text-headline-sm text-on-surface">{meanAirClearance} mins</span>
          <span className="font-body-sm text-body-sm text-tertiary">Recovery to &lt; 50 AQI</span>
        </div>
        <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Diurnal Stability</span>
          <span className="font-headline-sm text-headline-sm text-on-surface">{diurnalStability}</span>
          <span className="font-body-sm text-body-sm text-tertiary">ISO 16000 standard adherence</span>
        </div>
      </div>
    </div>
  );
};

export default AQITrendsChart;
