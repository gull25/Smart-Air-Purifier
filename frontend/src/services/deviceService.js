import { apiGet, apiPost } from './api';

/** Fetches all Device Management page data in parallel. */
export const fetchDeviceAll = async () => {
  const [status, nodeProfile, peripherals, gatewayConfig, diagnostics] = await Promise.all([
    apiGet('/api/device/status'),
    apiGet('/api/device/node-profile'),
    apiGet('/api/device/peripherals'),
    apiGet('/api/device/gateway-config'),
    apiGet('/api/device/diagnostics'),
  ]);

  return {
    status: status.data,
    nodeProfile: nodeProfile.data,
    peripherals: peripherals.data,
    gatewayConfig: gatewayConfig.data,
    diagnostics: diagnostics.data,
  };
};

export const updateFanSpeed = async (speed) => {
  return await apiPost('/api/device/fan', { state: speed > 0 });
};

export const updateAutoMode = async (isAuto) => {
  return await apiPost('/api/device/mode', { autoMode: isAuto });
};
