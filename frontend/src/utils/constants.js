// Application-wide constants.
// Centralizing these avoids magic strings/numbers scattered through the codebase.

/** API base URL — configured via VITE_API_URL environment variable */
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://smart-air-purifier.onrender.com';

// ─── Polling Intervals ────────────────────────────────────────────────────────
/** Live telemetry (AQI, fan RPM, temperatures) — refreshed frequently */
export const POLL_INTERVAL_LIVE = 5_000;     // 5 seconds

/** Semi-static data (analytics trends, compliance) — refreshed infrequently */
export const POLL_INTERVAL_SEMI = 30_000;    // 30 seconds

// ─── Fan Physics ──────────────────────────────────────────────────────────────
/** Minimum RPM at 0% PWM duty */
export const FAN_BASE_RPM = 600;

/** RPM gained per 1% PWM duty cycle */
export const FAN_RPM_PER_PERCENT = 18.8;

/**
 * Calculate fan RPM from a PWM duty cycle percentage.
 * @param {number} dutyPercent - 0 to 100
 * @returns {number} Rounded RPM
 */
export const calcFanRpm = (dutyPercent) =>
  Math.round(FAN_BASE_RPM + dutyPercent * FAN_RPM_PER_PERCENT);

// ─── AQI Categories ───────────────────────────────────────────────────────────
export const AQI_CATEGORIES = [
  { max: 50,  label: 'Good',                  color: 'text-tertiary' },
  { max: 100, label: 'Moderate',              color: 'text-yellow-500' },
  { max: 150, label: 'Unhealthy for Sensitive', color: 'text-orange-500' },
  { max: 200, label: 'Unhealthy',             color: 'text-error' },
  { max: 300, label: 'Very Unhealthy',        color: 'text-purple-600' },
  { max: 500, label: 'Hazardous',             color: 'text-rose-900' },
];

/**
 * Get AQI category label for a given AQI value.
 * @param {number} aqi
 * @returns {{ label: string, color: string }}
 */
export const getAqiCategory = (aqi) =>
  AQI_CATEGORIES.find((c) => aqi <= c.max) ?? AQI_CATEGORIES[AQI_CATEGORIES.length - 1];
