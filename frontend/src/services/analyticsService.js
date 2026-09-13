import { apiGet } from './api';

export const fetchHistoricalTelemetry = async (timeframe) => {
  const res = await apiGet(`/api/analytics/historical-telemetry?timeframe=${encodeURIComponent(timeframe)}`);
  return res.data;
};
