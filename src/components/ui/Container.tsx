"use client"

import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  padding?: boolean;
  center?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  className = '',
  padding = true,
  center = true
}) => {
  const getSizeStyles = () => {
    const sizeMap = {
      sm: '768px',     // Mobile-first approach
      md: '1024px',    // Tablet and small desktop
      lg: '1280px',    // Standard desktop (BUILD-PHASE-DOCUMENT default)
      xl: '1440px',    // Large desktop
      full: '100%'     // Full width container
    };

    return {
      maxWidth: sizeMap[size],
      width: '100%'
    };
  };

  const containerStyles = {
    ...getSizeStyles(),
    margin: center ? '0 auto' : '0',
    padding: padding ? 'var(--container-padding, clamp(1rem, 4vw, 2rem))' : '0',
    position: 'relative' as const
  };

  return (
    <div 
      style={containerStyles}
      className={`container container-${size} ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
