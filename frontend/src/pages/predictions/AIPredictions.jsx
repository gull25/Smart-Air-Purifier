import React from 'react';
import useAiPredictions from '../../hooks/useAiPredictions';
import { PageLoader, PageError } from '../../components/common/Loader';
import PredictionsHeader from '../../components/ai-predictions/PredictionsHeader';
import TimeHorizonSelector from '../../components/ai-predictions/TimeHorizonSelector';
import PredictionMetrics from '../../components/ai-predictions/PredictionMetrics';
import ForecastChart from '../../components/ai-predictions/ForecastChart';
import TrajectoryMatrix from '../../components/ai-predictions/TrajectoryMatrix';
import XAIFeatureImportance from '../../components/ai-predictions/XAIFeatureImportance';
import ContextCard from '../../components/ai-predictions/ContextCard';
import AlgorithmAccordion from '../../components/ai-predictions/AlgorithmAccordion';

const AIPredictions = () => {
  const { metrics, chart, trajectory, xai, header, loading, error, refetch } = useAiPredictions();

  if (loading) return <PageLoader message="Connecting to Inference Engine..." />;
  if (error) return <PageError message={error} onRetry={refetch} />;

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-[1440px] mx-auto px-page-pad-mobile lg:px-page-pad-desktop py-space-xl flex flex-col gap-space-xl">
        <PredictionsHeader data={header} />
        <TimeHorizonSelector />
        <PredictionMetrics data={metrics} />
        <ForecastChart data={chart} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          <TrajectoryMatrix data={trajectory} />
          <XAIFeatureImportance data={xai} />
        </div>

        <ContextCard />
        <AlgorithmAccordion />
      </div>
    </div>
  );
};

export default AIPredictions;
