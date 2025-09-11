// Loading Spinner Component


import { LoadingSpinnerProps } from '@/lib/types';
import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner({
  size = 'md',
  color,
  className = '',
  ...props
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: styles.sm,
    md: styles.md,
    lg: styles.lg
  };

  const spinnerStyle = color ? { borderTopColor: color } : {};

  return (
    <div
      className={`${styles.spinner} ${sizeClasses[size]} ${className}`}
      style={spinnerStyle}
      role="status"
      aria-label="Loading..."
      {...props}
    >
      <span className={styles.srOnly}>Loading...</span>
    </div>
  );
}
