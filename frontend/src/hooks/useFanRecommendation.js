import { useRef } from 'react';
import usePolling from './usePolling';
import { fetchFanRecommendationAll } from '../services/fanService';
import { POLL_INTERVAL_LIVE } from '../utils/constants';

/**
 * Provides all data needed by the Fan Recommendation page.
 *
 * The `targetSpeed` from the API is only applied on the FIRST successful fetch.
 * Subsequent poll cycles will not overwrite a speed that the user has manually set.
 * This fixes the bug where the poll loop reset user input every 5 seconds.
 */
const useFanRecommendation = () => {
  const isFirstFetch = useRef(true);
  const { data, loading, error, refetch } = usePolling(fetchFanRecommendationAll, POLL_INTERVAL_LIVE);

  // Extract targetSpeed only on first fetch; null on subsequent fetches
  // so the calling component can ignore it and preserve user input.
  let initialTargetSpeed = null;
  if (data?.aiDecision && isFirstFetch.current) {
    initialTargetSpeed = data.aiDecision.targetSpeed;
    isFirstFetch.current = false;
  }

  return {
    aiDecision: data?.aiDecision ?? null,
    telemetry: data?.telemetry ?? null,
    hardwareFlow: data?.hardwareFlow ?? null,
    initialTargetSpeed,   // Only non-null on the very first successful fetch
    loading,
    error,
    refetch,
  };
};

export default useFanRecommendation;
