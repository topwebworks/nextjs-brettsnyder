"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Simplified initialization for Edge compatibility - FIXED: Remove Edge delay that causes white page
  useEffect(() => {
    // Use a more defensive approach for Edge
    const initTheme = () => {
      try {
        setMounted(true);
        
        if (typeof window === 'undefined') return;
        
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        // Default to light mode instead of system preference
        const initialTheme = savedTheme || 'light';
        
        setThemeState(initialTheme);
        // Always set the attribute to ensure consistency
        document.documentElement.setAttribute('data-theme', initialTheme);
      } catch (error) {
        console.warn('Theme init failed:', error);
        setMounted(true);
        setThemeState('light');
        try {
          document.documentElement.setAttribute('data-theme', 'light');
        } catch {
          // Silent fallback
        }
      }
    };

    // FIXED: Initialize immediately for ALL browsers - no Edge delay to prevent white page after rebuild
    initTheme();
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      } catch (error) {
        console.warn('Theme setting failed:', error);
      }
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
