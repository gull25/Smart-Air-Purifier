import { apiGet } from './api';

/** Fetches all Fan Recommendation page data in parallel. */
export const fetchFanRecommendationAll = async () => {
  const [aiDecision, telemetry, hardwareFlow] = await Promise.all([
    apiGet('/api/fan-recommendation/ai-decision'),
    apiGet('/api/fan-recommendation/telemetry'),
    apiGet('/api/fan-recommendation/hardware-flow'),
  ]);

  return {
    aiDecision: aiDecision.data,
    telemetry: telemetry.data,
    hardwareFlow: hardwareFlow.data,
  };
};
