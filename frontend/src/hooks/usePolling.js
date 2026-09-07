import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Generic polling hook.
 *
 * Calls `fetchFn` immediately on mount, then again every `interval` milliseconds.
 * Cleans up the interval automatically on unmount.
 *
 * @param {() => Promise<any>} fetchFn - Async function that fetches and returns data
 * @param {number} interval - Polling interval in milliseconds
 * @returns {{ data: any, loading: boolean, error: string|null, refetch: () => void }}
 */
const usePolling = (fetchFn, interval) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Keep a stable ref to fetchFn so the effect doesn't re-run when the
  // parent component re-renders — fetchFn is recreated on each render
  // when defined inline, so we normalize it here.
  const fetchRef = useRef(fetchFn);
  fetchRef.current = fetchFn;

  const execute = useCallback(async () => {
    try {
      const result = await fetchRef.current();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load data');
    } finally {
      // Only set loading false after the very first fetch completes
      setLoading((prev) => (prev ? false : prev));
    }
  }, []);

  useEffect(() => {
    execute();
    const timerId = setInterval(execute, interval);
    return () => clearInterval(timerId);
  }, [execute, interval]);

  return { data, loading, error, refetch: execute };
};

export default usePolling;
