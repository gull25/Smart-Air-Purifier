import React from 'react';

/**
 * Reusable Badge / chip component.
 *
 * @param {'primary'|'secondary'|'tertiary'|'error'|'surface'} variant
 */
const Badge = ({ children, variant = 'surface', className = '' }) => {
  const variants = {
    primary:   'bg-primary-container text-on-primary-container',
    secondary: 'bg-secondary-container text-on-secondary-container',
    tertiary:  'bg-tertiary-container text-on-tertiary-container',
    error:     'bg-error-container text-on-error-container',
    surface:   'bg-surface-container-highest text-on-surface-variant',
  };

  return (
    <span
      className={`px-space-xs py-0.5 rounded-full font-label-caps text-label-caps uppercase ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
