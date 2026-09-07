import React from 'react';

const RebootModal = ({ isRebootModalOpen, setIsRebootModalOpen, appendLog }) => {
  if (!isRebootModalOpen) return null;

  const handleConfirm = () => {
    setIsRebootModalOpen(false);
    appendLog('SYSTEM', 'Soft reboot command issued by Lab Admin. Cycling power registers...', 'text-error');
    setTimeout(() => {
      appendLog('ESP-IDF', 'Restarting ESP32 Node 0x7F4A... CPU0 reset.', 'text-primary-fixed-dim');
    }, 600);
    setTimeout(() => {
      appendLog('WIFI', 'Reconnected to AeroNet-IoT-Secure. IP: 192.168.1.142 (Static DHCP).', 'text-tertiary-fixed-dim');
      appendLog('MQTT', 'MQTT broker handshake acknowledged. Telemetry live.', 'text-tertiary-fixed-dim');
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm flex items-center justify-center p-space-md">
      <div className="bg-surface-container-lowest rounded-2xl shadow-xl max-w-md w-full p-space-xl flex flex-col gap-space-md transform transition-all">
        <div className="w-12 h-12 rounded-xl bg-error-container text-on-error-container flex items-center justify-center">
          <span className="material-symbols-outlined text-[28px]">restart_alt</span>
        </div>
        <div className="flex flex-col gap-space-2xs">
          <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Confirm ESP32 Controller Reboot</h4>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Initiating a soft hardware reset on <strong className="text-on-surface">Node 0x7F4A (Cleanroom Tier-1)</strong> will temporarily interrupt live telemetry for approximately 4.2 seconds. Cleanroom airflow PWM will stay pinned at fallback safety rate (60%).
          </p>
        </div>
        <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-1 text-body-sm text-on-surface-variant">
          <div className="flex justify-between">
            <span>Active Clients:</span>
            <span className="text-on-surface font-medium">3 WebSockets</span>
          </div>
          <div className="flex justify-between">
            <span>Target IP:</span>
            <span className="text-on-surface font-medium">192.168.1.142</span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-space-sm pt-space-xs">
          <button 
            className="px-space-md py-space-xs rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-colors" 
            onClick={() => setIsRebootModalOpen(false)}
            type="button"
          >
            Cancel
          </button>
          <button 
            className="px-space-md py-space-xs rounded-xl bg-error text-on-error hover:opacity-90 font-label-md text-label-md transition-opacity shadow-sm flex items-center gap-space-2xs" 
            onClick={handleConfirm}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            Execute Reboot
          </button>
        </div>
      </div>
    </div>
  );
};

export default RebootModal;
