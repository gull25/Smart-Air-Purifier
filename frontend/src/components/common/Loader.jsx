import React from 'react';

/**
 * Full-page loading spinner.
 * @param {{ message?: string }} props
 */
export const PageLoader = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center w-full min-h-[60vh] gap-4">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    <p className="font-label-md text-on-surface-variant uppercase tracking-widest">{message}</p>
  </div>
);

/**
 * Full-page error state with a retry button.
 * @param {{ message?: string, onRetry?: () => void }} props
 */
export const PageError = ({ message = 'Something went wrong.', onRetry }) => (
  <div className="flex flex-col items-center justify-center w-full min-h-[60vh] gap-4">
    <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center">
      <span className="material-symbols-outlined text-error text-[28px]">wifi_off</span>
    </div>
    <div className="flex flex-col items-center gap-1 text-center max-w-sm">
      <p className="font-label-md text-on-surface font-semibold">Connection Error</p>
      <p className="font-body-sm text-on-surface-variant">{message}</p>
    </div>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="px-space-md py-space-xs rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:opacity-90 transition-opacity"
      >
        Retry
      </button>
    )}
  </div>
);

export default PageLoader;
