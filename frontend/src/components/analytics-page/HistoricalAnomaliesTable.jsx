import React, { useState } from 'react';

const HistoricalAnomaliesTable = ({ data }) => {
  const anomalies = data || [];
  const [page, setPage] = useState(1);
  const pageSize = 4;
  
  const totalPages = Math.ceil(anomalies.length / pageSize) || 1;
  const paginatedAnomalies = anomalies.slice((page - 1) * pageSize, page * pageSize);

  const goToPage = (p) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  return (
    <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">Historical Air Quality Anomalies &amp; Remediation Events</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Auditable log of airborne particulate incursions, rapid fan intervention triggers, and restoration timelines</p>
        </div>
        <div className="flex items-center gap-space-xs">
          <button className="flex items-center gap-space-xs px-space-md py-space-xs rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors" type="button">
            <span className="material-symbols-outlined text-[16px]">filter_list</span>
            <span>Filter Anomalies</span>
          </button>
        </div>
      </div>
      
      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-surface-container-high">
              <th className="py-space-sm px-space-md font-label-caps text-label-caps uppercase text-on-surface-variant">Timestamp</th>
              <th className="py-space-sm px-space-md font-label-caps text-label-caps uppercase text-on-surface-variant">Trigger Event</th>
              <th className="py-space-sm px-space-md font-label-caps text-label-caps uppercase text-on-surface-variant">Peak AQI</th>
              <th className="py-space-sm px-space-md font-label-caps text-label-caps uppercase text-on-surface-variant">Remediation Mode</th>
              <th className="py-space-sm px-space-md font-label-caps text-label-caps uppercase text-on-surface-variant">Duration</th>
              <th className="py-space-sm px-space-md font-label-caps text-label-caps uppercase text-on-surface-variant">Resolution AQI</th>
              <th className="py-space-sm px-space-md font-label-caps text-label-caps uppercase text-on-surface-variant text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-low">
            {paginatedAnomalies.map((anomaly) => (
              <tr key={anomaly.id} className="hover:bg-surface-container-low/50 transition-colors">
                <td className="py-space-md px-space-md font-body-sm text-body-sm text-on-surface">
                  <span className="font-medium">{anomaly.timestamp}</span>
                  <span className="block text-on-surface-variant text-[11px]">{anomaly.location}</span>
                </td>
                <td className="py-space-md px-space-md">
                  <div className="flex items-center gap-space-xs">
                    <span className={`w-2 h-2 rounded-full bg-${anomaly.triggerColor}`}></span>
                    <span className="font-label-md text-label-md text-on-surface">{anomaly.trigger}</span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">{anomaly.description}</span>
                </td>
                <td className={`py-space-md px-space-md font-label-md text-label-md text-${anomaly.triggerColor}`}>
                  {anomaly.peakAqi} AQI
                </td>
                <td className="py-space-md px-space-md">
                  <span className={`px-space-xs py-0.5 rounded-full bg-${anomaly.remediationColor} text-on-${anomaly.remediationColor} font-label-caps text-label-caps`}>
                    {anomaly.remediationMode}
                  </span>
                </td>
                <td className="py-space-md px-space-md font-body-sm text-body-sm text-on-surface">
                  {anomaly.duration}
                </td>
                <td className="py-space-md px-space-md">
                  <span className="font-label-md text-label-md text-tertiary">{anomaly.resolutionAqi} AQI (Good)</span>
                </td>
                <td className="py-space-md px-space-md text-right">
                  <div className="flex items-center justify-end gap-space-xs">
                    <button className="px-space-xs py-1 rounded bg-surface-container hover:bg-surface-container-high text-primary font-label-caps text-label-caps" type="button" onClick={() => alert('Log viewer opening...')}>View Log</button>
                    <button className="p-1 rounded hover:bg-surface-container text-on-surface-variant" type="button" onClick={() => alert('Downloading log file...')}><span className="material-symbols-outlined text-[18px]">file_download</span></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination & Table Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-space-xs text-on-surface-variant font-body-sm text-body-sm">
        <span>Showing {paginatedAnomalies.length} of {anomalies.length} historical logged events</span>
        <div className="flex items-center gap-space-2xs">
          <button 
            className="px-space-sm py-1 rounded bg-surface-container-low hover:bg-surface-container text-on-surface disabled:opacity-50" 
            disabled={page === 1} 
            onClick={() => goToPage(page - 1)}
            type="button"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button 
              key={p}
              className={`px-space-sm py-1 rounded ${p === page ? 'bg-primary text-on-primary' : 'bg-surface-container-low hover:bg-surface-container text-on-surface'}`} 
              onClick={() => goToPage(p)}
              type="button"
            >
              {p}
            </button>
          ))}
          
          <button 
            className="px-space-sm py-1 rounded bg-surface-container-low hover:bg-surface-container text-on-surface disabled:opacity-50" 
            disabled={page === totalPages}
            onClick={() => goToPage(page + 1)}
            type="button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoricalAnomaliesTable;
