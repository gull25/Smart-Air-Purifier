import usePolling from './usePolling';
import { fetchAirQualityAll } from '../services/airQualityService';
import { POLL_INTERVAL_LIVE } from '../utils/constants';

/**
 * Provides all data needed by the Air Quality page.
 * Polls live sensor readings every 5 seconds.
 */
const useAirQuality = () => {
  const { data, loading, error, refetch } = usePolling(fetchAirQualityAll, POLL_INTERVAL_LIVE);

  return {
    masterGauge: data?.masterGauge ?? null,
    gasBreakdown: data?.gasBreakdown ?? null,
    ambientDynamics: data?.ambientDynamics ?? null,
    filtrationHealth: data?.filtrationHealth ?? null,
    loading,
    error,
    refetch,
  };
};

export default useAirQuality;
