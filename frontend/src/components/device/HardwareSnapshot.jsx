import React from 'react';

const HardwareSnapshot = ({ data }) => {
  const { firmwareVersion, macAddress, uptime, deviceName, statusText } = data || {};

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">Hardware Snapshot</h3>
        <span className="font-body-sm text-body-sm text-on-surface-variant">AeroPulse Core Enclosure v2</span>
        <div className="relative w-full h-44 rounded-xl overflow-hidden my-space-md shadow-sm">
          <div className="w-full h-full bg-surface-container flex items-center justify-center text-primary/40">
            <span className="material-symbols-outlined text-[80px]">mode_fan</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-primary bg-surface-container-lowest/90 px-2 py-0.5 rounded backdrop-blur font-bold">{deviceName || 'Node-01 Tier 1 Cleanroom'}</span>
            <span className="font-body-sm text-body-sm text-tertiary bg-surface-container-lowest/90 px-2 py-0.5 rounded backdrop-blur font-semibold">{statusText || 'Active Purge'}</span>
          </div>
        </div>
      </div>
      <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-1 text-on-surface">
        <div className="flex justify-between font-body-sm text-body-sm">
          <span className="text-on-surface-variant">Firmware:</span>
          <span className="font-semibold">{firmwareVersion || 'v2.4.12-rc'}</span>
        </div>
        <div className="flex justify-between font-body-sm text-body-sm">
          <span className="text-on-surface-variant">MAC Address:</span>
          <span className="font-semibold font-mono text-[11px]">{macAddress || '3C:71:BF:4E:91:AA'}</span>
        </div>
        <div className="flex justify-between font-body-sm text-body-sm">
          <span className="text-on-surface-variant">Active Uptime:</span>
          <span className="font-semibold">{uptime || '14d 6h 22m'}</span>
        </div>
      </div>
    </div>
  );
};

export default HardwareSnapshot;
