import { apiGet } from './api';

/** Fetches all Air Quality page data in parallel. */
export const fetchAirQualityAll = async () => {
  const [masterGauge, gasBreakdown, ambientDynamics, filtrationHealth] = await Promise.all([
    apiGet('/api/air-quality/master-gauge'),
    apiGet('/api/air-quality/gas-breakdown'),
    apiGet('/api/air-quality/ambient-dynamics'),
    apiGet('/api/air-quality/filtration-health'),
  ]);

  return {
    masterGauge: masterGauge.data,
    gasBreakdown: gasBreakdown.data,
    ambientDynamics: ambientDynamics.data,
    filtrationHealth: filtrationHealth.data,
  };
};
