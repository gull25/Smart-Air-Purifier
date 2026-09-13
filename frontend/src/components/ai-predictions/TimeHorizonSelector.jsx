import React from 'react';

const TimeHorizonSelector = ({ activeTimeframe, setTimeframe }) => {
  const tabs = [
    { label: '1 Hour', value: '1H' },
    { label: '4 Hours', value: '4H' },
    { label: '12 Hours', value: '12H' },
    { label: '24 Hours', value: '24H' }
  ];

  return (
    <div className="flex items-center justify-between flex-wrap gap-space-md bg-surface-container-low p-space-xs rounded-2xl">
      <div className="flex items-center gap-space-2xs overflow-x-auto w-full sm:w-auto py-1 px-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setTimeframe(tab.value)}
            className={`px-space-md py-space-xs rounded-xl font-label-md text-label-md transition-all duration-150 whitespace-nowrap flex items-center gap-1.5 ${
              activeTimeframe === tab.value
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
            type="button"
          >
            {activeTimeframe === tab.value && tab.value === '1H' && (
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-ping"></span>
            )}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="hidden sm:flex items-center gap-space-xs text-on-surface-variant pr-space-md font-body-sm text-body-sm">
        <span className="material-symbols-outlined text-[18px] text-tertiary">sync</span>
        <span>Auto-streaming 10s sensor buffers</span>
      </div>
    </div>
  );
};

export default TimeHorizonSelector;
