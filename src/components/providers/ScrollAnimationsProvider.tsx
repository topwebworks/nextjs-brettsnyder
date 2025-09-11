'use client';

import { useEffect } from 'react';
import { initScrollAnimations, destroyScrollAnimations } from '../../utils/scrollAnimations';

interface ScrollAnimationsProviderProps {
  children: React.ReactNode;
}

/**
 * Provider component that initializes the global scroll animation system
 */
export function ScrollAnimationsProvider({ children }: ScrollAnimationsProviderProps) {
  useEffect(() => {
    // Initialize scroll animations when the component mounts
    initScrollAnimations();

    // Cleanup when the component unmounts
    return () => {
      destroyScrollAnimations();
    };
  }, []);

  return <>{children}</>;
}
