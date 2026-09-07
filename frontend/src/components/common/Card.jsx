import React from 'react';

/**
 * Reusable Card component.
 * Provides consistent card surface styling across all pages.
 *
 * @param {'default'|'low'|'lowest'} surface
 * @param {string} [className] - Additional Tailwind classes
 */
const Card = ({ children, surface = 'lowest', className = '', ...props }) => {
  const surfaces = {
    lowest: 'bg-surface-container-lowest',
    low:    'bg-surface-container-low',
    default: 'bg-surface-container',
  };

  return (
    <div
      className={`${surfaces[surface]} rounded-2xl shadow-sm p-space-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
