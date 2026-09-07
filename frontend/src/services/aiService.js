import { apiGet } from './api';

/** Fetches all AI Predictions page data in parallel. */
export const fetchAiPredictionsAll = async () => {
  const [metrics, chart, trajectory, xai, header] = await Promise.all([
    apiGet('/api/ai-predictions/metrics'),
    apiGet('/api/ai-predictions/chart'),
    apiGet('/api/ai-predictions/trajectory'),
    apiGet('/api/ai-predictions/xai'),
    apiGet('/api/ai-predictions/header'),
  ]);

  return {
    metrics: metrics.data,
    chart: chart.data,
    trajectory: trajectory.data,
    xai: xai.data,
    header: header.data,
  };
};
