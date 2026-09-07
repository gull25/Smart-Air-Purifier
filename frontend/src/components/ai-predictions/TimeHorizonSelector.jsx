import React, { useState } from 'react';

const TimeHorizonSelector = () => {
  const [activeTab, setActiveTab] = useState('30 Minutes');
  const tabs = ['30 Minutes', '1 Hour', '6 Hours', '24 Hours', '7 Days', '30 Days'];

  return (
    <div className="flex items-center justify-between flex-wrap gap-space-md bg-surface-container-low p-space-xs rounded-2xl">
      <div className="flex items-center gap-space-2xs overflow-x-auto w-full sm:w-auto py-1 px-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-space-md py-space-xs rounded-xl font-label-md text-label-md transition-all duration-150 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === tab
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
            type="button"
          >
            {activeTab === tab && tab === '30 Minutes' && (
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-ping"></span>
            )}
            {tab}
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
