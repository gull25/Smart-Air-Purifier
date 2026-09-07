import usePolling from './usePolling';
import { fetchAiPredictionsAll } from '../services/aiService';
import { POLL_INTERVAL_LIVE } from '../utils/constants';

/**
 * Provides all data needed by the AI Predictions page.
 * Polls prediction outputs every 5 seconds.
 */
const useAiPredictions = () => {
  const { data, loading, error, refetch } = usePolling(fetchAiPredictionsAll, POLL_INTERVAL_LIVE);

  return {
    metrics: data?.metrics ?? null,
    chart: data?.chart ?? null,
    trajectory: data?.trajectory ?? null,
    xai: data?.xai ?? null,
    header: data?.header ?? null,
    loading,
    error,
    refetch,
  };
};

export default useAiPredictions;
