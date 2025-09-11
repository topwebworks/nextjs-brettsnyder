"use client";

import React from 'react';
import { 
  LucideIcon, 
  Download, 
  Mail, 
  User, 
  ArrowRight, 
  ArrowLeft,
  ExternalLink, 
  Github,
  Calendar,
  Zap,
  Heart,
  Code,
  Lightbulb,
  Target,
  ChevronDown
} from 'lucide-react';
import styles from './Button.module.css';

// Button variant types
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

// Icon mapping for server-safe icon handling
const iconMap: Record<string, LucideIcon> = {
  'download': Download,
  'mail': Mail,
  'user': User,
  'arrow-right': ArrowRight,
  'arrow-left': ArrowLeft,
  'external-link': ExternalLink,
  'github': Github,
  'calendar': Calendar,
  'zap': Zap,
  'heart': Heart,
  'code': Code,
  'lightbulb': Lightbulb,
  'target': Target,
  'chevron-down': ChevronDown,
};

// Button props interface
export interface ButtonProps {
  children?: React.ReactNode; // Make optional for icon-only buttons
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon | string; // Accept both icon component and string
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

/**
 * Professional Button Component
 * 
 * Features:
 * - Three variants: primary, secondary, ghost
 * - Three sizes: small, medium, large
 * - Icon support (always on right side)
 * - Light/dark mode support via CSS custom properties
 * - Pill-shaped design
 * - Responsive: stacks at 100% width on mobile (480px and below)
 * - Clean, modern, professional design
 * - Memory-safe implementation
 */

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  icon,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  style = {},
  'aria-label': ariaLabel,
  ...rest
}) => {
  // Resolve icon - handle both component and string cases
  const ResolvedIcon = React.useMemo(() => {
    if (!icon) return null;
    if (typeof icon === 'string') {
      return iconMap[icon] || null;
    }
    return icon;
  }, [icon]);

  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    !children && ResolvedIcon ? styles.iconOnly : '', // Add icon-only class when no children but has icon
    disabled ? styles.disabled : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel || (ResolvedIcon && !children ? `${variant} button` : undefined)}
      className={buttonClasses}
      style={style}
      {...rest}
    >
      {children && (
        <span className={styles.content}>
          {children}
        </span>
      )}
      {ResolvedIcon && (
        <span className={styles.icon}>
          <ResolvedIcon strokeWidth={1.8} />
        </span>
      )}
    </button>
  );
};

export default Button;
