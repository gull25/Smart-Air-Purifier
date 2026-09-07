import { useState, useCallback } from 'react';
import usePolling from './usePolling';
import { fetchDashboardAll, updateFanControl as updateFanControlService } from '../services/dashboardService';
import { POLL_INTERVAL_LIVE } from '../utils/constants';

/**
 * Provides all data and actions needed by the Dashboard page.
 * Polls live telemetry every 5 seconds.
 */
const useDashboard = () => {
  const { data, loading, error, refetch } = usePolling(fetchDashboardAll, POLL_INTERVAL_LIVE);

  const handleFanControlUpdate = useCallback(async (speed, autoMode) => {
    try {
      const updatedFan = await updateFanControlService(speed, autoMode);
      // Optimistic local update so the UI reflects the change immediately
      // without waiting for the next poll cycle.
      refetch();
      return updatedFan;
    } catch (err) {
      console.error('Failed to update fan control:', err.message);
    }
  }, [refetch]);

  return {
    status: data?.status ?? null,
    aiInsight: data?.aiInsight ?? null,
    chartData: data?.chartData ?? null,
    hardware: data?.hardware ?? null,
    alerts: data?.alerts ?? null,
    loading,
    error,
    handleFanControlUpdate,
  };
};

export default useDashboard;
