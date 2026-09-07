import React from 'react';

const HardwareContext = () => {
  return (
    <div className="w-full bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-lg">
      <div className="flex items-center gap-space-md">
        <div className="w-16 h-16 rounded-xl bg-surface-container-high flex-shrink-0 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-[32px]">developer_board</span>
        </div>
        <div className="flex flex-col">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Hardware Interface Protocol</span>
          <span className="font-headline-sm text-headline-sm text-on-surface">Espressif ESP32-WROOM-32D Core • Rev 3</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">UART Baud: 115200 | Sensor Load: 3.3V Regulated Rail | I2C Addr: 0x48 (ADS1115 ADC Co-Processor)</span>
        </div>
      </div>
      <div className="flex items-center gap-space-md">
        <div className="flex flex-col text-right">
          <span className="font-label-caps text-label-caps text-tertiary uppercase font-bold">I/O Continuous Sync</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">Zero dropped packets over 72h</span>
        </div>
        <div className="w-3 h-3 rounded-full bg-tertiary animate-pulse"></div>
      </div>
    </div>
  );
};

export default HardwareContext;
