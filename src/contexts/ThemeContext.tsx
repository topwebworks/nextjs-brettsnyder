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
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Simplified initialization for Edge compatibility - FIXED: Remove Edge delay that causes white page
  useEffect(() => {
    // Use a more defensive approach for Edge
    const initTheme = () => {
      try {
        setMounted(true);
        
        if (typeof window === 'undefined') return;
        
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const initialTheme = savedTheme || systemTheme;
        
        setThemeState(initialTheme);
        // Always set the attribute to ensure consistency
        document.documentElement.setAttribute('data-theme', initialTheme);
      } catch (error) {
        console.warn('Theme init failed:', error);
        setMounted(true);
        setThemeState('dark');
        try {
          document.documentElement.setAttribute('data-theme', 'dark');
        } catch {
          // Silent fallback
        }
      }
    };

    // FIXED: Initialize immediately for ALL browsers - no Edge delay to prevent white page after rebuild
    initTheme();
  }, []);

  // Listen for system theme changes - simplified for Edge
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem('theme')) {
          const newTheme = e.matches ? 'dark' : 'light';
          setThemeState(newTheme);
          document.documentElement.setAttribute('data-theme', newTheme);
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } catch (error) {
      console.warn('System theme listener failed:', error);
    }
  }, [mounted]);

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

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: () => {}, setTheme: () => {}, mounted: false }}>
        {children}
      </ThemeContext.Provider>
    );
  }

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
