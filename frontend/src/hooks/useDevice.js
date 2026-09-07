import usePolling from './usePolling';
import { fetchDeviceAll } from '../services/deviceService';
import { POLL_INTERVAL_LIVE } from '../utils/constants';

/**
 * Provides all data needed by the Device Management page.
 * Live device telemetry is polled every 5 seconds.
 */
const useDevice = () => {
  const { data, loading, error, refetch } = usePolling(fetchDeviceAll, POLL_INTERVAL_LIVE);

  return {
    status: data?.status ?? null,
    nodeProfile: data?.nodeProfile ?? null,
    peripherals: data?.peripherals ?? null,
    gatewayConfig: data?.gatewayConfig ?? null,
    diagnostics: data?.diagnostics ?? null,
    loading,
    error,
    refetch,
  };
};

export default useDevice;
