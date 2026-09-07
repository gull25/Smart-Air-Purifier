import React from 'react';

const AlertsList = ({ data }) => {
  const alerts = data || [];

  return (
    <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm">
      <div className="flex items-center justify-between mb-space-md">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">notifications_active</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Recent Alerts &amp; Diagnostic Logs</h3>
        </div>
        <span className="font-label-caps text-label-caps text-on-surface-variant">Live Bus Stream</span>
      </div>
      <div className="space-y-space-sm">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-start gap-space-sm p-space-sm rounded-xl bg-surface-container-low">
            <div className={`p-1.5 rounded-lg mt-0.5 ${
              alert.type === 'warning' ? 'bg-amber-100 text-amber-900' :
              alert.type === 'success' ? 'bg-tertiary-fixed text-on-tertiary-fixed' :
              'bg-primary-fixed text-primary'
            }`}>
              <span className="material-symbols-outlined text-[18px]">
                {alert.type === 'warning' ? 'warning' : alert.type === 'success' ? 'verified' : 'sync'}
              </span>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-surface font-semibold">{alert.title}</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">{alert.timeText}</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                {alert.description}
              </p>
            </div>
          </div>
        ))}
        {alerts.length === 0 && (
          <div className="p-space-sm text-center font-body-sm text-on-surface-variant">
            No recent alerts.
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsList;
