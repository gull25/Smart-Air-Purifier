import React from 'react';

const LiveMechanicalTelemetry = ({ data }) => {
  const { motorTemp = 0, powerDraw = 0, vibration = '0', pressureDrop = 0 } = data || {};

  // Threshold computations
  const tempValue = parseFloat(motorTemp);
  const getTempStatus = () => {
    if (tempValue < 45) return { text: "Normal Thermal Spec", color: "bg-tertiary", textColor: "text-tertiary" };
    if (tempValue <= 60) return { text: "Elevated Temperature", color: "bg-secondary", textColor: "text-secondary" };
    return { text: "Overheat Warning", color: "bg-error", textColor: "text-error" };
  };
  const tempStatus = getTempStatus();

  const powerValue = parseFloat(powerDraw);
  const getPowerStatus = () => {
    if (powerValue < 30) return { text: "Efficiency Grade: A++", grade: "A++", color: "text-tertiary" };
    if (powerValue <= 60) return { text: "Efficiency Grade: A", grade: "A", color: "text-secondary" };
    return { text: "Efficiency Grade: B", grade: "B", color: "text-error" };
  };
  const powerStatus = getPowerStatus();

  const vibValue = parseFloat(vibration.replace(/[<>]/g, ''));
  const getVibStatus = () => {
    if (vibValue < 0.5) return { text: "Nominal Rotor Balance", color: "bg-tertiary", textColor: "text-tertiary" };
    return { text: "Elevated Vibration", color: "bg-secondary", textColor: "text-secondary" };
  };
  const vibStatus = getVibStatus();

  const dropValue = parseFloat(pressureDrop);
  const getDropStatus = () => {
    if (dropValue < 150) return { text: "Optimal Airflow", color: "bg-tertiary", textColor: "text-tertiary" };
    if (dropValue <= 250) return { text: "Flow Restricted", color: "bg-secondary", textColor: "text-secondary" };
    return { text: "Replace Filter", color: "bg-error", textColor: "text-error" };
  };
  const dropStatus = getDropStatus();
  return (
    <div className="flex flex-col gap-space-sm">
      <div className="flex items-center justify-between">
        <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Live Mechanical Telemetry &amp; Chamber Health</h4>
        <span className="font-body-sm text-body-sm text-on-surface-variant">Real-time brushless DC feedback</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {/* Metric 1: Motor Temp */}
        <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-bold">Motor Core Temp</span>
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">device_thermostat</span>
            </div>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-telemetry-value-lg text-telemetry-value-lg text-on-surface font-bold">{motorTemp}</span>
            <span className="font-headline-sm text-headline-sm text-on-surface-variant font-semibold">°C</span>
          </div>
          <div className="flex items-center gap-1.5 mt-auto pt-2">
            <span className={`w-2 h-2 rounded-full ${tempStatus.color}`}></span>
            <span className={`font-body-sm text-body-sm font-bold ${tempStatus.textColor}`}>{tempStatus.text}</span>
          </div>
        </div>
        
        {/* Metric 2: Power Draw */}
        <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-bold">Power Consumption</span>
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
            </div>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-telemetry-value-lg text-telemetry-value-lg text-on-surface font-bold">{powerDraw}</span>
            <span className="font-headline-sm text-headline-sm text-on-surface-variant font-semibold">Watts</span>
          </div>
          <div className="flex items-center gap-1.5 mt-auto pt-2">
            <span className={`material-symbols-outlined text-[16px] ${powerStatus.color}`}>energy_savings_leaf</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Efficiency Grade: <strong className={powerStatus.color}>{powerStatus.grade}</strong></span>
          </div>
        </div>
        
        {/* Metric 3: Vibration Analysis */}
        <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-bold">Centrifugal Vibration</span>
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">vibration</span>
            </div>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-telemetry-value-lg text-telemetry-value-lg text-on-surface font-bold">{vibration}</span>
            <span className="font-headline-sm text-headline-sm text-on-surface-variant font-semibold">mm/s</span>
          </div>
          <div className="flex items-center gap-1.5 mt-auto pt-2">
            <span className={`w-2 h-2 rounded-full ${vibStatus.color}`}></span>
            <span className={`font-body-sm text-body-sm font-bold ${vibStatus.textColor}`}>{vibStatus.text}</span>
          </div>
        </div>
        
        {/* Metric 4: Pressure Drop (Filter Health) */}
        <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-bold">HEPA H13 Drop</span>
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">filter_alt</span>
            </div>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-telemetry-value-lg text-telemetry-value-lg text-on-surface font-bold">{pressureDrop}</span>
            <span className="font-headline-sm text-headline-sm text-on-surface-variant font-semibold">Pa</span>
          </div>
          <div className="flex items-center gap-1.5 mt-auto pt-2">
            <span className={`w-2 h-2 rounded-full ${dropStatus.color}`}></span>
            <span className={`font-body-sm text-body-sm font-bold ${dropStatus.textColor}`}>{dropStatus.text}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMechanicalTelemetry;
