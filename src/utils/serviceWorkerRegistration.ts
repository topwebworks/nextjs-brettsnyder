"use client";

/**
 * Service Worker Registration
 * Handles registration and lifecycle of the service worker for caching
 * FIREFOX COMPATIBLE VERSION - Prevents endless refresh loops
 */

// BROWSER DETECTION - Firefox and Edge handle service worker updates differently
const isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
const isEdge = typeof navigator !== 'undefined' && /Edg\//.test(navigator.userAgent);

export function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    
    // EDGE FIX: Don't register service worker in Edge - causes white page issues
    if (isEdge) {
      console.log('🦘 Edge detected: Skipping service worker registration to prevent cache conflicts');
      return;
    }
    window.addEventListener('load', () => {
      // FIREFOX FIX: Use a more conservative approach to avoid endless refresh loops
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('✅ Service Worker registered:', registration.scope);
          
          // Firefox-compatible update handling - avoid immediate refresh
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                // FIREFOX FIX: Only refresh if there's actually a controller AND this is a real update
                if (newWorker.state === 'installed' && 
                    navigator.serviceWorker.controller && 
                    !document.hidden && 
                    !sessionStorage.getItem('sw-refresh-pending')) {
                  
                  // Prevent multiple refreshes in the same session
                  sessionStorage.setItem('sw-refresh-pending', 'true');
                  
                  if (isFirefox) {
                    console.log('🦊 Firefox detected: Service worker updated, refresh on next navigation');
                    // For Firefox, don't auto-refresh - let the user navigate naturally
                    // The new service worker will be active on the next page load
                    return;
                  }
                  
                  console.log('🔄 New service worker available, will refresh once');
                  
                  // For Chrome/Edge: Use setTimeout to avoid immediate refresh during navigation
                  setTimeout(() => {
                    window.location.reload();
                  }, 100);
                }
              });
            }
          });
          
          // Clean up session flag when service worker successfully updates
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            sessionStorage.removeItem('sw-refresh-pending');
          });
        })
        .catch((error) => {
          console.log('❌ Service Worker registration failed:', error);
        });
    });
  }
}

export function unregisterServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
        console.log('Service Worker unregistered');
      })
      .catch((error) => {
        console.error('Service Worker unregistration failed:', error);
      });
  }
}
