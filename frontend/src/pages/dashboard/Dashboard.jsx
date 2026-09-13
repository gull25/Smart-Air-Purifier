import React from 'react';
import useDashboard from '../../hooks/useDashboard';
import { calcFanRpm } from '../../utils/constants';
import { PageLoader, PageError } from '../../components/common/Loader';
import AQICard from '../../components/air-quality/AQICard';
import PredictionCard from '../../components/ai/PredictionCard';
import DeviceStatus from '../../components/device/DeviceStatus';
import AIInsight from '../../components/ai/AIInsight';
import AQIChart from '../../components/charts/AQIChart';
import FanControl from '../../components/device/FanControl';

const Dashboard = () => {
  const {
    status,
    aiInsight,
    chartData,
    hardware,
    alerts,
    loading,
    error,
    handleFanControlUpdate,
  } = useDashboard();

  if (loading) return <PageLoader message="Loading Telemetry..." />;
  if (error) return <PageError message={error} />;

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1440px] mx-auto w-full px-space-md lg:px-page-pad-desktop py-space-xl flex flex-col gap-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg max-w-6xl mx-auto w-full">
          {status && <AQICard data={status.aqi} />}
          {aiInsight && <PredictionCard data={aiInsight} />}
          {status && <DeviceStatus data={status.fan} />}
        </div>

        {aiInsight && (
          <AIInsight
            data={aiInsight}
            onApplyRecommendation={(speed) => handleFanControlUpdate(speed, true)}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
          {chartData && <AQIChart data={chartData} />}
          {status && <FanControl data={status.fan} aiRecSpeed={aiInsight?.recommendedSpeed} onUpdate={handleFanControlUpdate} />}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
