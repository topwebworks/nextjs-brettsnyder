"use client"

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconProps {
  icon: LucideIcon;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'muted' | 'accent' | 'inherit';
  className?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 'md',
  color = 'inherit',
  className = '',
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = false,
  ...props
}) => {
  // Size mapping using our design system
  const sizeMap = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32
  };

  // Color mapping to our CSS custom properties
  const colorMap = {
    primary: 'var(--text-primary)',
    secondary: 'var(--text-secondary)', 
    muted: 'var(--text-muted)',
    accent: 'var(--text-accent)',
    inherit: 'currentColor'
  };

  const iconSize = sizeMap[size];
  const iconColor = colorMap[color];

  return (
    <IconComponent
      size={iconSize}
      color={iconColor}
      className={`inline-block ${className}`}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      {...props}
    />
  );
};

export default Icon;
