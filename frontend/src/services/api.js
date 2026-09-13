import { API_BASE_URL } from '../utils/constants';

/**
 * Lightweight API client built on the native Fetch API.
 *
 * All service files should import from here instead of calling `fetch()` directly.
 * This ensures:
 *  - A single place to configure the base URL (from env variable)
 *  - Consistent error handling for non-2xx responses
 *  - A single place to add auth headers when authentication is implemented
 */

/**
 * Makes a GET request to the API.
 * @param {string} path - Path relative to the API base URL (e.g. '/api/dashboard/status')
 * @returns {Promise<any>} Parsed JSON response body
 * @throws {Error} If the response is not OK or the network fails
 */
export const apiGet = async (path) => {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

/**
 * Makes a POST request to the API.
 * @param {string} path - Path relative to the API base URL
 * @param {object} body - Request body (will be JSON-serialized)
 * @returns {Promise<any>} Parsed JSON response body
 * @throws {Error} If the response is not OK or the network fails
 */
export const apiPost = async (path, body) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const apiPatch = async (path, body) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
