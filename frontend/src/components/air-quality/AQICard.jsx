import React from 'react';

const AQICard = ({ data }) => {
  const { value, category, analogVoltage, adcValue, lastUpdatedText } = data || {};
  
  // Calculate stroke dashoffset for the circular progress bar (max 314.159)
  // Assuming max AQI we care about for the circle is 150
  const normalizedValue = Math.min(Math.max(value || 0, 0), 150);
  const strokeDashoffset = 314.159 - (normalizedValue / 150) * 314.159;

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Air Quality Index</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">MQ135 Dual-Cell Sensor</span>
        </div>
        <span className="px-space-sm py-0.5 rounded-full font-label-caps text-label-caps bg-amber-100 text-amber-900 font-bold uppercase tracking-wider flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          {category || 'Unknown'}
        </span>
      </div>
      <div className="my-space-md flex items-center justify-center relative">
        <svg className="w-40 h-40 -rotate-90" viewBox="0 0 120 120">
          <circle className="stroke-surface-container" cx="60" cy="60" fill="none" r="50" strokeWidth="10"></circle>
          <circle cx="60" cy="60" fill="none" r="50" stroke="#f59e0b" strokeDasharray="314.159" strokeDashoffset={strokeDashoffset} strokeLinecap="round" strokeWidth="10"></circle>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-display-hero text-display-hero text-on-surface leading-none">{value || 0}</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant mt-1">US AQI • PPM</span>
        </div>
      </div>
      <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-space-2xs">
        <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
          <span>Analog: <strong className="text-on-surface font-semibold">{analogVoltage}V</strong></span>
          <span>ADC: <strong className="text-on-surface font-semibold">{adcValue}</strong></span>
          <span className="text-primary font-medium">{lastUpdatedText}</span>
        </div>
        <div className="w-full h-8 pt-1">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 24">
            <path d="M0,18 L15,17 L30,19 L45,15 L60,16 L75,13 L90,14 L100,10" fill="none" stroke="#f59e0b" strokeLinecap="round" strokeWidth="2"></path>
            <path d="M0,18 L15,17 L30,19 L45,15 L60,16 L75,13 L90,14 L100,10 L100,24 L0,24 Z" fill="#fef3c7" opacity="0.4"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AQICard;
