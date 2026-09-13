import React, { useState, useEffect } from 'react';
import useFanRecommendation from '../../hooks/useFanRecommendation';
import { PageLoader, PageError } from '../../components/common/Loader';
import FanHeader from '../../components/fan-recommendation-page/FanHeader';
import AIDecisionCard from '../../components/fan-recommendation-page/AIDecisionCard';
import HardwareControlFlow from '../../components/fan-recommendation-page/HardwareControlFlow';
import AIConfigPanel from '../../components/fan-recommendation-page/AIConfigPanel';
import ManualControlConsole from '../../components/fan-recommendation-page/ManualControlConsole';
import LiveMechanicalTelemetry from '../../components/fan-recommendation-page/LiveMechanicalTelemetry';
import { updateFanControl } from '../../services/dashboardService';
import { updateAiConfig } from '../../services/fanService';

const FanRecommendation = () => {
  // UI-local state — these belong here, not in a global store
  const [currentSpeed, setCurrentSpeed] = useState(50);
  const [targetSpeed, setTargetSpeed] = useState(50);
  const [controlMode, setControlMode] = useState('auto'); // 'auto' | 'semi' | 'manual'
  const [aggressiveness, setAggressiveness] = useState('Balanced'); 
  const [nightMode, setNightMode] = useState(true);
  const [sensitivity, setSensitivity] = useState(55);

  const { aiDecision, telemetry, hardwareFlow, aiConfig, initialTargetSpeed, loading, error, refetch } =
    useFanRecommendation();

  // Load config from backend once
  const isFirstLoad = React.useRef(true);
  useEffect(() => {
    if (aiConfig && isFirstLoad.current) {
      setAggressiveness(aiConfig.aiAggressiveness);
      setNightMode(aiConfig.nightModeEnabled);
      setSensitivity(aiConfig.aqiSensitivity);
      isFirstLoad.current = false;
    }
  }, [aiConfig]);

  // Apply target speed from API only once on first successful data load.
  // This prevents poll cycles from overwriting speed the user manually set.
  useEffect(() => {
    if (initialTargetSpeed !== null) {
      setTargetSpeed(initialTargetSpeed);
    }
  }, [initialTargetSpeed]);

  useEffect(() => {
    // Add a slight debounce or just call it directly for now
    const timer = setTimeout(() => {
      updateFanControl(currentSpeed, controlMode === 'auto').catch(console.error);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentSpeed, controlMode]);

  // Sync config changes to backend
  useEffect(() => {
    if (isFirstLoad.current) return; // Don't sync on mount
    updateAiConfig({
      aiAggressiveness: aggressiveness,
      nightModeEnabled: nightMode,
      aqiSensitivity: sensitivity
    }).catch(console.error);
  }, [aggressiveness, nightMode, sensitivity]);

  if (loading) return <PageLoader message="Loading Fan Telemetry..." />;
  if (error) return <PageError message={error} onRetry={refetch} />;
  
  const applyTargetSpeed = () => setCurrentSpeed(targetSpeed);
  const keepBaseline = () => setCurrentSpeed(50);

  return (
    <div className="flex flex-col w-full">
      <div className="p-space-lg md:p-page-pad-desktop flex flex-col gap-space-xl max-w-[1440px] mx-auto w-full">
        <FanHeader controlMode={controlMode} setControlMode={setControlMode} />

        <AIDecisionCard
          applyTargetSpeed={applyTargetSpeed}
          currentSpeed={currentSpeed}
          keepBaseline={keepBaseline}
          setTargetSpeed={setTargetSpeed}
          targetSpeed={targetSpeed}
          data={aiDecision}
        />

        <HardwareControlFlow data={hardwareFlow} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          <AIConfigPanel 
            aggressiveness={aggressiveness} 
            setAggressiveness={setAggressiveness} 
            nightMode={nightMode}
            setNightMode={setNightMode}
            sensitivity={sensitivity}
            setSensitivity={setSensitivity}
          />
          <ManualControlConsole currentSpeed={currentSpeed} setCurrentSpeed={setCurrentSpeed} setControlMode={setControlMode} />
        </div>

        <LiveMechanicalTelemetry data={telemetry} />
      </div>
    </div>
  );
};

export default FanRecommendation;
