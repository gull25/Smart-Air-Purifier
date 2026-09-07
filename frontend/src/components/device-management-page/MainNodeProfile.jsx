import React, { useState } from 'react';

const MainNodeProfile = ({ appendLog, data }) => {
  const { name = 'Unknown', nodeId = 'Unknown', location = 'Unknown', microcontroller = 'Unknown', microSpecs = 'Unknown', ipAddress = 'Unknown', macAddress = 'Unknown', ssid = 'Unknown', wifiSpecs = 'Unknown', firmware = 'Unknown', firmwareSpecs = 'Unknown', uptime = 'Unknown', uptimeSpecs = 'Unknown' } = data || {};
  const [pingText, setPingText] = useState('Ping Latency (18ms)');

  const handlePing = () => {
    setPingText('Pinging...');
    setTimeout(() => {
      const ms = Math.floor(14 + Math.random() * 8);
      setPingText(`Ping Latency (${ms}ms)`);
      appendLog('NET', `ICMP Echo reply from 192.168.1.142: time=${ms}ms TTL=64`, 'text-secondary-fixed');
    }, 400);
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col">
      {/* Card Header Banner */}
      <div className="px-space-xl py-space-lg bg-gradient-to-r from-surface-container-low via-surface-container-lowest to-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shadow-sm">
            <span className="material-symbols-outlined text-[28px]">memory</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{name}</span>
              <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-label-caps uppercase">{nodeId}</span>
              <span className="px-space-xs py-0.5 rounded-full bg-tertiary-container text-on-tertiary-container font-label-caps text-label-caps uppercase">{location}</span>
            </div>
            <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-[15px] text-tertiary">sensors</span>
              <span>Active WebSocket Bridge • Port 8883 (TLS 1.3) • Synchronized</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-space-sm flex-wrap">
          <button 
            className="px-space-md py-space-xs rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md flex items-center gap-space-2xs transition-colors" 
            onClick={handlePing}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-primary">network_ping</span>
            <span>{pingText}</span>
          </button>
          <button className="px-space-md py-space-xs rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md flex items-center gap-space-2xs transition-colors" type="button">
            <span className="material-symbols-outlined text-[16px]">edit</span>
            Rename
          </button>
          <button className="px-space-md py-space-xs rounded-xl bg-surface-container-low text-error hover:bg-error-container font-label-md text-label-md flex items-center gap-space-2xs transition-colors" type="button">
            <span className="material-symbols-outlined text-[16px]">power_settings_new</span>
            Decommission
          </button>
        </div>
      </div>
      
      {/* Specs & Telemetry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md p-space-xl">
        {/* Item 1 */}
        <div className="flex flex-col p-space-md rounded-xl bg-surface-container-low">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-caps text-label-caps uppercase">Microcontroller</span>
            <span className="material-symbols-outlined text-[18px]">developer_board</span>
          </div>
          <span className="font-label-md text-label-md text-on-surface mt-space-xs font-semibold">{microcontroller}</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">{microSpecs}</span>
        </div>
        
        {/* Item 2 */}
        <div className="flex flex-col p-space-md rounded-xl bg-surface-container-low">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-caps text-label-caps uppercase">Network Interface</span>
            <span className="material-symbols-outlined text-[18px]">lan</span>
          </div>
          <span className="font-label-md text-label-md text-on-surface mt-space-xs font-semibold">{ipAddress}</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant font-mono">{macAddress}</span>
        </div>
        
        {/* Item 3 */}
        <div className="flex flex-col p-space-md rounded-xl bg-surface-container-low">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-caps text-label-caps uppercase">Wi-Fi Telemetry</span>
            <span className="material-symbols-outlined text-[18px] text-tertiary">wifi_tethering</span>
          </div>
          <span className="font-label-md text-label-md text-on-surface mt-space-xs font-semibold">{ssid}</span>
          <span className="font-body-sm text-body-sm text-tertiary font-medium">{wifiSpecs}</span>
        </div>
        
        {/* Item 4 */}
        <div className="flex flex-col p-space-md rounded-xl bg-surface-container-low">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-caps text-label-caps uppercase">Firmware Cycle</span>
            <span className="material-symbols-outlined text-[18px]">verified</span>
          </div>
          <span className="font-label-md text-label-md text-on-surface mt-space-xs font-semibold">{firmware}</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">{firmwareSpecs}</span>
        </div>
        
        {/* Item 5 */}
        <div className="flex flex-col p-space-md rounded-xl bg-surface-container-low">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-caps text-label-caps uppercase">System Uptime</span>
            <span className="material-symbols-outlined text-[18px] text-primary">schedule</span>
          </div>
          <span className="font-label-md text-label-md text-on-surface mt-space-xs font-semibold">{uptime}</span>
          <span className="font-body-sm text-body-sm text-tertiary font-medium">{uptimeSpecs}</span>
        </div>
      </div>
    </div>
  );
};

export default MainNodeProfile;
