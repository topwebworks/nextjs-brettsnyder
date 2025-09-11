'use client';

import { useEffect } from 'react';
import { initScrollAnimations } from '../../utils/scrollAnimations';

interface ScrollAnimationsProviderProps {
  children: React.ReactNode;
}

/**
 * Provider component that ensures scroll animation system is initialized
 * MEMORY SAFE: Does not destroy global manager to avoid breaking other sections
 */
export function ScrollAnimationsProvider({ children }: ScrollAnimationsProviderProps) {
  useEffect(() => {
    // Initialize scroll animations when the component mounts
    // This is safe to call multiple times
    initScrollAnimations();

    // DO NOT cleanup when component unmounts - let global auto-init handle lifecycle
    // This prevents destroying animations for sections outside this provider
    return () => {
      // No cleanup - keeps Skills section working
    };
  }, []);

  return <>{children}</>;
}
