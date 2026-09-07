import React from 'react';

const DiagnosticAlertBanner = ({ data }) => {
  const { isVerified = false, message = '' } = data || {};
  return (
    <div className="p-space-lg rounded-2xl bg-gradient-to-r from-secondary-container/30 to-surface-container-low flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md shadow-sm">
      <div className="flex items-center gap-space-md">
        <div className="w-10 h-10 rounded-xl bg-secondary text-on-secondary flex items-center justify-center">
          <span className="material-symbols-outlined text-[24px]">psychology</span>
        </div>
        <div className="flex flex-col">
          <span className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-space-2xs">
            AeroPulse Predictive Fleet Diagnostics
            {isVerified && <span className="text-[10px] px-1.5 py-0.5 bg-secondary text-on-secondary rounded uppercase">Verified</span>}
          </span>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {message}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-space-sm">
        <button className="px-space-md py-space-xs rounded-xl bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-md text-label-md transition-colors shadow-sm" type="button">
          Download Diagnostics Report
        </button>
      </div>
    </div>
  );
};

export default DiagnosticAlertBanner;
