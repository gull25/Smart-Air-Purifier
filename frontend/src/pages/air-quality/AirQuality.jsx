import React from 'react';
import useAirQuality from '../../hooks/useAirQuality';
import { PageLoader, PageError } from '../../components/common/Loader';
import TelemetryHeader from '../../components/air-quality-page/TelemetryHeader';
import MasterAQIGauge from '../../components/air-quality-page/MasterAQIGauge';
import GasBreakdown from '../../components/air-quality-page/GasBreakdown';
import AmbientDynamics from '../../components/air-quality-page/AmbientDynamics';
import AQIClassificationScale from '../../components/air-quality-page/AQIClassificationScale';
import HistoricalTelemetryChart from '../../components/air-quality-page/HistoricalTelemetryChart';
import FiltrationHealth from '../../components/air-quality-page/FiltrationHealth';
import FilterLifeAction from '../../components/air-quality-page/FilterLifeAction';
import HardwareContext from '../../components/air-quality-page/HardwareContext';

const AirQuality = () => {
  const { masterGauge, gasBreakdown, ambientDynamics, filtrationHealth, loading, error, refetch } = useAirQuality();

  if (loading) return <PageLoader message="Loading Telemetry..." />;
  if (error) return <PageError message={error} onRetry={refetch} />;

  return (
    <div className="flex flex-col w-full">
      <div className="px-page-pad-mobile md:px-page-pad-desktop">
        <TelemetryHeader />
      </div>

      <div className="w-full px-page-pad-mobile md:px-page-pad-desktop pb-space-3xl flex flex-col gap-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg pt-space-lg">
          {masterGauge && <MasterAQIGauge data={masterGauge} />}
          {gasBreakdown && <GasBreakdown data={gasBreakdown} />}
          {ambientDynamics && <AmbientDynamics data={ambientDynamics} />}
        </div>

        <AQIClassificationScale />

        <HistoricalTelemetryChart />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
          {filtrationHealth && <FiltrationHealth data={filtrationHealth} />}
          {filtrationHealth && <FilterLifeAction data={filtrationHealth} />}
        </div>

        <HardwareContext />
      </div>
    </div>
  );
};

export default AirQuality;
