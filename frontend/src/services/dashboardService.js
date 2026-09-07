import { apiGet, apiPost } from './api';

/** Fetches all dashboard data in parallel. */
export const fetchDashboardAll = async () => {
  const [status, aiInsight, chartData, hardware, alerts] = await Promise.all([
    apiGet('/api/dashboard/status'),
    apiGet('/api/dashboard/ai-insight'),
    apiGet('/api/dashboard/chart-data'),
    apiGet('/api/dashboard/hardware'),
    apiGet('/api/dashboard/alerts'),
  ]);

  return {
    status: status.data,
    aiInsight: aiInsight.data,
    chartData: chartData.data,
    hardware: hardware.data,
    alerts: alerts.data,
  };
};

/**
 * Sends a fan control command to the backend.
 * @param {number} speed - Target speed percentage (0–100)
 * @param {boolean} autoMode - Whether AI auto mode is enabled
 */
export const updateFanControl = async (speed, autoMode) => {
  const res = await apiPost('/api/dashboard/fan-control', { speed, autoMode });
  return res.data;
};
