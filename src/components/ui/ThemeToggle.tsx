"use client"

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const { theme, toggleTheme } = useTheme();

  const sizeStyles = {
    sm: { width: '32px', height: '32px', fontSize: '14px' },
    md: { width: '40px', height: '40px', fontSize: '16px' },
    lg: { width: '48px', height: '48px', fontSize: '18px' }
  };

  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24
  };

  const toggleStyles = {
    ...sizeStyles[size],
    border: 'none',
    borderRadius: '50%',
    backgroundColor: theme === 'dark' 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.1)',
    color: theme === 'dark' ? '#f8fafc' : '#0f172a',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.4s ease',
    outline: 'none',
    position: 'relative' as const,
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
    boxShadow: theme === 'dark'
      ? '0 2px 8px rgba(0, 0, 0, 0.3)'
      : '0 2px 8px rgba(0, 0, 0, 0.1)'
  };

  const hoverStyles = {
    backgroundColor: theme === 'dark' 
      ? 'rgba(255, 255, 255, 0.2)' 
      : 'rgba(0, 0, 0, 0.15)',
    transform: 'scale(1.05)',
    boxShadow: theme === 'dark'
      ? '0 4px 16px rgba(0, 0, 0, 0.4)'
      : '0 4px 16px rgba(0, 0, 0, 0.15)'
  };

  return (
    <button
      className={className}
      style={toggleStyles}
      onClick={toggleTheme}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, { ...toggleStyles, ...hoverStyles });
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, toggleStyles);
      }}
      onFocus={(e) => {
        Object.assign(e.currentTarget.style, { ...toggleStyles, ...hoverStyles });
      }}
      onBlur={(e) => {
        Object.assign(e.currentTarget.style, toggleStyles);
      }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon 
          size={iconSize[size]} 
          style={{
            transition: 'all 0.4s ease',
            transform: 'rotate(0deg)'
          }}
        />
      ) : (
        <Sun 
          size={iconSize[size]} 
          style={{
            transition: 'all 0.4s ease',
            transform: 'rotate(180deg)'
          }}
        />
      )}
    </button>
  );
};

export default ThemeToggle;
