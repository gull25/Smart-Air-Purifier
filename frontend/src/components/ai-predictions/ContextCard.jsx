import React from 'react';

const ContextCard = () => {
  return (
    <div className="w-full bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm flex flex-col md:flex-row items-center gap-space-xl">
      <div className="w-full md:w-1/3 h-52 rounded-xl overflow-hidden relative shadow-sm">
        <img 
          className="w-full h-full object-cover" 
          alt="Close up photography of an advanced cleanroom IoT air sensor chamber with subtle cyan and teal ambient illumination, showing clean metallic casing and ventilation intake grilles in a sterile, modern high-tech research environment" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5kqYE1Jq4_s-ndiT3QjS3qr_hVZj3C0XUTcJoPrKlfmkCfz0rocdPklAqnvL9ahUma6f5NcX212E0m69mOAROuK-86_HhDJfZEEBPmdxfndqWF1dOzF0L8AKSH_dhQ256wDhjR0qMe9ikpvBJxuJ966bwG6m5dJwImcH3pZDzkxEnoSiV8t9RDMMXmi6S51GcgwLx2ySdU1gqn5cxUOBRlsSbnpqbjyajvO7axFcfEr208GUNaPZDKg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-space-md">
          <span className="font-label-caps text-label-caps text-white uppercase tracking-wider">Cleanroom Tier-1 Chamber</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-space-sm">
        <div className="flex items-center gap-2">
          <span className="px-space-xs py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-caps text-label-caps uppercase">Proactive Protection</span>
          <span className="text-on-surface-variant font-body-sm text-body-sm">Automated HEPA cycling in standby</span>
        </div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface">Preemptive Clean Air Protocol Ready</h3>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Rather than reacting after volatile gases accumulate in the breathing zone, AeroPulse AI models the indoor aerodynamic dispersion rate 30 minutes in advance. When current trends exceed 75 AQI, the centrifugal fan ramps dynamically to 70% before occupants notice particulate elevation.
        </p>
        <div className="flex items-center gap-space-md pt-space-xs">
          <button className="px-space-md py-space-xs bg-primary text-on-primary rounded-xl font-label-md text-label-md hover:bg-primary-container transition-all" type="button">
            Review Automated Rules
          </button>
          <button className="px-space-md py-space-xs bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-label-md text-label-md transition-all" type="button">
            Export Model Telemetry
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContextCard;
