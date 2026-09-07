import React, { useState } from 'react';

const GatewayConfig = ({ data }) => {
  const { endpoint = 'Unknown', topics = [], tlsEnabled = true } = data || {};
  const [mtlsEnabled, setMtlsEnabled] = useState(tlsEnabled);
  const [samplingRate, setSamplingRate] = useState('100Hz');

  return (
    <div className="lg:col-span-5 bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-[20px] text-primary">router</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Gateway &amp; MQTT Core</h3>
        </div>
        <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-label-caps uppercase">TLS 1.3 Active</span>
      </div>
      
      <div className="flex flex-col gap-space-sm">
        <div className="flex flex-col gap-space-2xs">
          <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Broker Endpoint</label>
          <div className="flex items-center justify-between px-space-md py-space-xs bg-surface-container-low rounded-xl font-mono text-body-sm text-on-surface">
            <span className="truncate">{endpoint}</span>
            <span className="material-symbols-outlined text-[16px] text-tertiary">lock</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-space-2xs">
          <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Pub/Sub Mesh Topics</label>
          <div className="flex flex-col gap-space-2xs">
            {topics.map((topic, idx) => (
              <div key={idx} className="flex items-center justify-between px-space-sm py-1.5 bg-surface-container-low rounded-lg font-mono text-[12px] text-on-surface">
                <span className={`truncate text-${topic.color}`}>{topic.name}</span>
                <span className="text-on-surface-variant">{topic.type}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Hardware Sampling Rate Selector */}
        <div className="flex flex-col gap-space-2xs pt-space-xs">
          <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Hardware ADC Sampling &amp; Aggregation</label>
          <div className="grid grid-cols-3 gap-space-2xs">
            <button 
              className={`py-space-xs rounded-xl font-label-md text-label-md transition-colors ${samplingRate === '20Hz' ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container-high text-on-surface border-0'}`} 
              onClick={() => setSamplingRate('20Hz')}
              type="button"
            >
              20Hz / 0.5s
            </button>
            <button 
              className={`py-space-xs rounded-xl font-label-md text-label-md transition-colors ${samplingRate === '100Hz' ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container-high text-on-surface border-0'}`} 
              onClick={() => setSamplingRate('100Hz')}
              type="button"
            >
              100Hz / 1.0s
            </button>
            <button 
              className={`py-space-xs rounded-xl font-label-md text-label-md transition-colors ${samplingRate === '500Hz' ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container-high text-on-surface border-0'}`} 
              onClick={() => setSamplingRate('500Hz')}
              type="button"
            >
              500Hz / Burst
            </button>
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant">Aggregated to 1Hz streaming broadcast to limit internal Wi-Fi congestion.</span>
        </div>
        
        {/* Network Security Toggle */}
        <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low mt-space-2xs">
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-on-surface font-semibold">mTLS Client Certificate Auth</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Hardware-fused crypto key verification</span>
          </div>
          <div 
            className={`w-12 h-7 rounded-full relative cursor-pointer flex items-center p-1 transition-colors ${mtlsEnabled ? 'bg-primary' : 'bg-surface-container-highest'}`}
            onClick={() => setMtlsEnabled(!mtlsEnabled)}
          >
            <div className={`w-5 h-5 rounded-full transform transition-transform duration-200 ${mtlsEnabled ? 'bg-on-primary translate-x-5' : 'bg-on-surface-variant translate-x-0'}`}></div>
          </div>
        </div>
      </div>
      
      <div className="pt-space-xs flex items-center gap-space-sm">
        <button className="flex-1 py-space-xs px-space-md rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-colors" type="button">
          Update Gateway Config
        </button>
        <button className="py-space-xs px-space-md rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-colors flex items-center gap-space-2xs" type="button">
          <span className="material-symbols-outlined text-[16px]">file_download</span>
          Config.json
        </button>
      </div>
    </div>
  );
};

export default GatewayConfig;
