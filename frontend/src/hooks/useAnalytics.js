import { useState, useCallback } from 'react';
import usePolling from './usePolling';
import { fetchAnalyticsAll } from '../services/analyticsService';
import { POLL_INTERVAL_SEMI } from '../utils/constants';

/**
 * Provides all data needed by the Analytics page.
 * Analytics data is historical/aggregated — polled every 30 seconds
 * instead of every 5, reducing unnecessary network traffic.
 */
const useAnalytics = () => {
  const [dateRange, setDateRange] = useState('7d');

  // Wrap fetchAnalyticsAll to pass the dateRange
  const fetcher = useCallback(() => fetchAnalyticsAll(dateRange), [dateRange]);

  const { data, loading, error, refetch } = usePolling(fetcher, POLL_INTERVAL_SEMI);

  return {
    kpiSummary: data?.kpiSummary ?? null,
    aiDiagnostic: data?.aiDiagnostic ?? null,
    aqiTrends: data?.aqiTrends ?? null,
    compliance: data?.compliance ?? null,
    gasMatrix: data?.gasMatrix ?? null,
    anomalies: data?.anomalies ?? null,
    loading,
    error,
    refetch,
    dateRange,
    setDateRange,
  };
};

export default useAnalytics;
