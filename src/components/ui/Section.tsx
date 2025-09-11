"use client"

import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  background?: 'primary' | 'secondary' | 'tertiary' | 'elevated' | 'transparent';
  padding?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  spacing?: 'tight' | 'normal' | 'loose' | 'none';
}


const Section: React.FC<SectionProps> = ({
  children,
  id,
  className = '',
  background = 'transparent',
  padding = 'lg',
  spacing = 'normal'
}) => {
  const getBackgroundStyles = () => {
    const backgroundMap = {
      primary: 'var(--bg-primary)',
      secondary: 'var(--bg-secondary)', 
      tertiary: 'var(--bg-tertiary)',
      elevated: 'var(--bg-elevated)',
      transparent: 'transparent'
    };

    return {
      backgroundColor: backgroundMap[background]
    };
  };

  const getPaddingStyles = () => {
    const paddingMap = {
      sm: 'clamp(2rem, 4vw, 3rem) 0',
      md: 'clamp(3rem, 6vw, 4rem) 0', 
      lg: 'clamp(4rem, 8vw, 6rem) 0',
      xl: 'clamp(6rem, 12vw, 8rem) 0',
      none: '0'
    };

    return {
      padding: paddingMap[padding]
    };
  };

  const getSpacingStyles = () => {
    const spacingMap = {
      tight: 'var(--space-md, 1rem)',
      normal: 'var(--space-lg, 1.5rem)', 
      loose: 'var(--space-xl, 2rem)',
      none: '0'
    };

    return {
      gap: spacingMap[spacing]
    };
  };

  const sectionStyles = {
    ...getBackgroundStyles(),
    ...getPaddingStyles(),
    width: '100%',
    position: 'relative' as const,
    transition: 'background-color 0.4s ease'
  };

  const contentStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    ...getSpacingStyles()
  };

  return (
    <section 
      id={id}
      style={sectionStyles}
      className={`section section-${background} section-${padding} ${className}`}
    >
      <div style={contentStyles} className="section-content">
        {children}
      </div>
    </section>
  );
};

export default Section;
