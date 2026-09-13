import { apiGet, apiPatch } from './api';

/** Fetches all Fan Recommendation page data in parallel. */
export const fetchFanRecommendationAll = async () => {
  const [aiDecision, telemetry, hardwareFlow, aiConfig] = await Promise.all([
    apiGet('/api/fan-recommendation/ai-decision'),
    apiGet('/api/fan-recommendation/telemetry'),
    apiGet('/api/fan-recommendation/hardware-flow'),
    apiGet('/api/device/config'),
  ]);

  return {
    aiDecision: aiDecision.data,
    telemetry: telemetry.data,
    hardwareFlow: hardwareFlow.data,
    aiConfig: aiConfig.data,
  };
};

export const updateAiConfig = async (config) => {
  return await apiPatch('/api/device/config', config);
};
