"use client";

import { useEffect } from 'react';

/**
 * HydrationFix Component
 */

export default function HydrationFix() {
  useEffect(() => {
    // Handle browser extension attributes that cause hydration mismatches
    const handleExtensionAttributes = () => {
      // Grammarly extension attributes
      const grammarlyAttributes = [
        'data-new-gr-c-s-check-loaded',
        'data-gr-ext-installed'
      ];

      // Remove problematic attributes from body during hydration
      grammarlyAttributes.forEach(attr => {
        if (document.body.hasAttribute(attr)) {
          document.body.removeAttribute(attr);
        }
      });

      // Set up observer to handle dynamic attribute additions
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.target === document.body) {
            const attributeName = mutation.attributeName;
            if (attributeName && grammarlyAttributes.includes(attributeName)) {
              // Allow the extension to work but prevent console errors
              if (process.env.NODE_ENV === 'development') {
                console.log(`🔧 Browser extension attribute handled: ${attributeName}`);
              }
            }
          }
        });
      });

      observer.observe(document.body, {
        attributes: true,
        attributeFilter: grammarlyAttributes
      });

      // Cleanup function
      return () => observer.disconnect();
    };

    const cleanup = handleExtensionAttributes();
    return cleanup;
  }, []);

  // This component doesn't render anything visible
  return null;
}
