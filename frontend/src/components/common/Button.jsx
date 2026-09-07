import React from 'react';

/**
 * Reusable Button component.
 * Consolidates the repeated button Tailwind class patterns.
 *
 * @param {'primary'|'secondary'|'ghost'|'danger'} variant
 * @param {'sm'|'md'} size
 * @param {string} [icon] - Material Symbol icon name
 * @param {boolean} [iconRight] - Whether icon goes on the right
 */
const Button = ({
  children,
  variant = 'secondary',
  size = 'md',
  icon,
  iconRight = false,
  className = '',
  ...props
}) => {
  const base = 'inline-flex items-center justify-center gap-space-2xs rounded-xl font-label-md text-label-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  const sizes = {
    sm: 'px-space-sm py-1',
    md: 'px-space-md py-space-xs',
  };

  const variants = {
    primary:   'bg-primary text-on-primary hover:opacity-90 shadow-sm',
    secondary: 'bg-surface-container text-on-surface hover:bg-surface-container-high',
    ghost:     'bg-transparent text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface',
    danger:    'bg-error-container text-on-error-container hover:opacity-90',
  };

  const iconEl = icon && (
    <span className="material-symbols-outlined text-[16px]">{icon}</span>
  );

  return (
    <button
      type="button"
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {!iconRight && iconEl}
      {children}
      {iconRight && iconEl}
    </button>
  );
};

export default Button;
