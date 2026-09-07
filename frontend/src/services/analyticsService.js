import { apiGet } from './api';

/** Fetches all Analytics page data in parallel. */
export const fetchAnalyticsAll = async (dateRange = '7d') => {
  const [kpiSummary, aiDiagnostic, aqiTrends, compliance, gasMatrix, anomalies] = await Promise.all([
    apiGet(`/api/analytics/kpi-summary?dateRange=${dateRange}`),
    apiGet(`/api/analytics/ai-diagnostic?dateRange=${dateRange}`),
    apiGet(`/api/analytics/aqi-trends?dateRange=${dateRange}`),
    apiGet(`/api/analytics/compliance?dateRange=${dateRange}`),
    apiGet(`/api/analytics/gas-matrix?dateRange=${dateRange}`),
    apiGet(`/api/analytics/historical-anomalies?dateRange=${dateRange}`),
  ]);

  return {
    kpiSummary: kpiSummary.data,
    aiDiagnostic: aiDiagnostic.data,
    aqiTrends: aqiTrends.data,
    compliance: compliance.data,
    gasMatrix: gasMatrix.data,
    anomalies: anomalies.data,
  };
};
