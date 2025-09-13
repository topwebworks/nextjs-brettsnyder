"use client"

import React from 'react';
import styles from './AtmosphericBackground.module.css';

interface AtmosphericBackgroundProps {
  /** Background intensity variant */
  variant?: 'subtle' | 'medium' | 'rich';
  /** Custom color scheme for orbs */
  colors?: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  /** Override default orb count */
  orbCount?: 0 | 2 | 3 | 4;
  /** Specify which orbs to show by ID (1=purple top-left, 2=green top-right, 3=orange middle-left, 4=blue bottom-right) */
  orbIds?: number[];
  /** Include theme-aware background gradients */
  includeBackground?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * AtmosphericBackground Component
 * 
 * A sophisticated atmospheric background system with floating orbs and theme-aware gradients.
 * Extracted from the about page for reuse across the portfolio.
 * 
 * Features:
 * - Vibrant color gradients with good visibility (handled by global CSS)
 * - Configurable floating orbs (selectable by ID or count)
 * - Multiple intensity variants
 * - Smooth animations with reduced motion support
 * - Custom color schemes
 * - Theme-aware background gradients (dark/light mode support)
 * 
 * Orb IDs:
 * 1: Purple orb (top-left)
 * 2: Green orb (top-right)
 * 3: Orange orb (middle-left)
 * 4: Blue orb (bottom-right)
 * 
 * Note: Background gradients are applied via global CSS for production reliability.
 */
export default function AtmosphericBackground({
  variant = 'medium', // Default to balanced visibility
  orbCount = 4, // Show all four orbs by default (legacy support)
  orbIds, // New flexible orb selection system
  includeBackground = true,
  className = '',
  style = {}
}: AtmosphericBackgroundProps) {
  
  // Determine which orbs to show - orbIds takes precedence over orbCount
  const activeOrbs = orbIds || (orbCount === 0 ? [] : 
    orbCount === 2 ? [3, 4] : // Show bottom orbs for count 2
    orbCount === 3 ? [1, 2, 3] : // Show first 3 orbs for count 3
    [1, 2, 3, 4] // Show all orbs for count 4
  );
  
  // Variant-based opacity and size adjustments
  const variantConfig = {
    subtle: { opacity: 0.4, sizeMultiplier: 0.9, blur: 50 },   // Gentle atmospheric effects
    medium: { opacity: 0.55, sizeMultiplier: 1.1, blur: 70 },  // Balanced visibility (reduced from 0.7)
    rich: { opacity: 1.0, sizeMultiplier: 1.3, blur: 90 }      // Full dramatic effect
  };
  
  const config = variantConfig[variant];
  
  // Background wrapper component
  const BackgroundWrapper = ({ children }: { children: React.ReactNode }) => {
    if (!includeBackground) {
      return <>{children}</>;
    }
    
    // Calculate opacity multiplier for CSS variables
    const opacityMultiplier = config.opacity / 0.55;
    
    return (
      <div
        className={`${styles.backgroundWrapper} ${styles[`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`]} atmospheric-background ${className}`}
        style={{
          '--atmospheric-opacity': opacityMultiplier,
          ...style
        } as React.CSSProperties}
      >
        {children}
      </div>
    );
  };
  
  return (
    <BackgroundWrapper>
      {/* Primary Orb - Large Purple - Top Left (ID: 1) - Now animated */}
      {activeOrbs.includes(1) && (
        <div 
          className={`${styles.atmosphericOrb} ${styles.orbPrimary} ${className}`}
        style={{
          width: `${420 * config.sizeMultiplier}px`,
          height: `${420 * config.sizeMultiplier}px`,
          background: `
            radial-gradient(circle at 30% 40%, 
              rgba(168, 85, 247, ${0.8 * config.opacity}) 0%, 
              rgba(168, 85, 247, ${0.5 * config.opacity}) 30%, 
              rgba(168, 85, 247, ${0.3 * config.opacity}) 60%, 
              rgba(168, 85, 247, ${0.1 * config.opacity}) 80%, 
              transparent 100%
            ),
            linear-gradient(135deg, 
              rgba(168, 85, 247, ${0.6 * config.opacity}) 0%, 
              rgba(168, 85, 247, ${0.4 * config.opacity}) 50%, 
              rgba(168, 85, 247, ${0.2 * config.opacity}) 100%
            )
          `,
          filter: `blur(${config.blur}px)`,
          opacity: config.opacity,
          boxShadow: `
            0 0 ${140 * config.sizeMultiplier}px rgba(168, 85, 247, ${0.5 * config.opacity}),
            0 0 ${70 * config.sizeMultiplier}px rgba(168, 85, 247, ${0.3 * config.opacity}),
            inset 0 0 ${50 * config.sizeMultiplier}px rgba(168, 85, 247, ${0.2 * config.opacity})
          `,
          ...style
        }}
      />
      )}
      
      {/* Secondary Orb - Large Green - Top Right (ID: 2) - Now static and bigger */}
      {activeOrbs.includes(2) && (
        <div 
        className={`${styles.atmosphericOrb} ${styles.orbSecondary} ${className}`}
        style={{
          width: `${420 * config.sizeMultiplier}px`,
          height: `${420 * config.sizeMultiplier}px`,
          background: `
            radial-gradient(circle at 60% 30%, 
              rgba(34, 197, 94, ${0.5 * config.opacity}) 0%, 
              rgba(34, 197, 94, ${0.3 * config.opacity}) 35%, 
              rgba(34, 197, 94, ${0.15 * config.opacity}) 65%, 
              rgba(34, 197, 94, ${0.06 * config.opacity}) 85%, 
              transparent 100%
            ),
            linear-gradient(135deg, 
              rgba(34, 197, 94, ${0.4 * config.opacity}) 0%, 
              rgba(34, 197, 94, ${0.2 * config.opacity}) 50%, 
              rgba(34, 197, 94, ${0.08 * config.opacity}) 100%
            )
          `,
          filter: `blur(${config.blur - 10}px)`,
          opacity: config.opacity * 0.9,
          boxShadow: `
            0 0 ${140 * config.sizeMultiplier}px rgba(34, 197, 94, ${0.4 * config.opacity}),
            0 0 ${80 * config.sizeMultiplier}px rgba(34, 197, 94, ${0.3 * config.opacity}),
            inset 0 0 ${50 * config.sizeMultiplier}px rgba(34, 197, 94, ${0.15 * config.opacity})
          `
        }}
      />
      )}
      
      {/* Accent Orb - Small Orange - Middle Left (ID: 3) - Static for performance */}
      {activeOrbs.includes(3) && (
        <div 
          className={`${styles.atmosphericOrb} ${styles.orbAccent} ${className}`}
          style={{
            width: `${240 * config.sizeMultiplier}px`,
            height: `${240 * config.sizeMultiplier}px`,
            background: `
              radial-gradient(circle at 50% 50%, 
                rgba(251, 146, 60, ${0.5 * config.opacity}) 0%, 
                rgba(251, 146, 60, ${0.3 * config.opacity}) 45%, 
                rgba(251, 146, 60, ${0.12 * config.opacity}) 75%, 
                transparent 100%
              )
            `,
            filter: `blur(${config.blur - 15}px)`,
            opacity: config.opacity * 0.85,
            boxShadow: `
              0 0 ${100 * config.sizeMultiplier}px rgba(251, 146, 60, ${0.3 * config.opacity}),
              inset 0 0 ${35 * config.sizeMultiplier}px rgba(251, 146, 60, ${0.12 * config.opacity})
            `
          }}
        />
      )}
      
      {/* Extra Ambient Orb - Bottom Right Blue (ID: 4) - Static for performance */}
      {activeOrbs.includes(4) && (
        <div 
          className={`${styles.atmosphericOrb} ${styles.orbAmbient} ${className}`}
          style={{
            width: `${280 * config.sizeMultiplier}px`,
            height: `${280 * config.sizeMultiplier}px`,
            background: `
              radial-gradient(circle at 40% 60%, 
                rgba(59, 130, 246, ${0.4 * config.opacity}) 0%, 
                rgba(59, 130, 246, ${0.25 * config.opacity}) 45%,
                rgba(59, 130, 246, ${0.1 * config.opacity}) 75%, 
                transparent 100%
              )
            `,
            filter: `blur(${config.blur - 10}px)`,
            opacity: config.opacity * 0.8,
            boxShadow: `
              0 0 ${120 * config.sizeMultiplier}px rgba(59, 130, 246, ${0.25 * config.opacity}),
              inset 0 0 ${30 * config.sizeMultiplier}px rgba(59, 130, 246, ${0.08 * config.opacity})
            `
          }}
        />
      )}
    </BackgroundWrapper>
  );
}
