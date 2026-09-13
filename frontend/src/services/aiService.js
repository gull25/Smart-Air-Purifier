import { apiGet } from './api';

/** Fetches all AI Predictions page data in parallel. */
export const fetchAiPredictionsAll = async (timeframe = '1H') => {
  const [metrics, chart, trajectory, xai, header, config] = await Promise.all([
    apiGet('/api/ai-predictions/metrics'),
    apiGet(`/api/ai-predictions/chart?timeframe=${timeframe}`),
    apiGet('/api/ai-predictions/trajectory'),
    apiGet('/api/ai-predictions/xai'),
    apiGet('/api/ai-predictions/header'),
    apiGet('/api/device/config'),
  ]);

  return {
    metrics: metrics.data,
    chart: chart.data,
    trajectory: trajectory.data,
    xai: xai.data,
    header: header.data,
    config: config.data,
  };
};
