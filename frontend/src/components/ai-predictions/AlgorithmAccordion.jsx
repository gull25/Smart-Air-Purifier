import React, { useState } from 'react';

const AlgorithmAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full bg-surface-container-lowest rounded-2xl shadow-sm p-space-xl flex flex-col gap-space-md">
      <button 
        className="w-full flex items-center justify-between text-left group" 
        onClick={toggleAccordion}
        type="button"
      >
        <div className="flex items-center gap-space-md">
          <div className="w-10 h-10 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">help_outline</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
              How Does the Predictive Algorithm Work?
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">A plain-language guide to time-series extrapolation and proactive purification</p>
          </div>
        </div>
        <span 
          className={`material-symbols-outlined text-outline text-[24px] transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          expand_more
        </span>
      </button>

      {isOpen && (
        <div className="flex flex-col gap-space-md pt-space-md border-t-0 text-on-surface-variant font-body-md text-body-md leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-primary">01. Sensing</span>
              <span className="font-label-md text-label-md text-on-surface">Microsecond Sampling</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                The onboard ESP32 unit polls the MQ135 sensor every 250 milliseconds. Analog electro-chemical voltages are converted into temperature-compensated ppm values to eliminate false positives caused by humidity swings.
              </p>
            </div>
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-secondary">02. Inference</span>
              <span className="font-label-md text-label-md text-on-surface">Ensemble Modeling</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                A dual-stage pipeline runs on the edge gateway: a Long Short-Term Memory (LSTM) recurrent neural network tracks momentum across 120 previous time-steps, while a Random Forest regressor weights localized factors like occupancy and fan RPM.
              </p>
            </div>
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-tertiary">03. Mitigation</span>
              <span className="font-label-md text-label-md text-on-surface">Proactive Cycling</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Instead of waiting for harmful particulate density to peak, AeroPulse calculates the minimum effective fan speed required to flatten the curve, keeping sound output whisper-quiet and power consumption down by 34%.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlgorithmAccordion;
