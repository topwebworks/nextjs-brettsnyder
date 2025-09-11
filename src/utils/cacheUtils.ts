/**
 * Cache Management & Busting Utilities
 * 
 * This module provides utilities for managing browser and service worker caches,
 * particularly useful during development when you need to clear stale cached content.
 * 
 * QUICK CACHE CLEARING METHODS:
 * 
 * 1. BROWSER CONSOLE (Fastest):
 *    - Open DevTools (F12) → Console
 *    - Type: clearAllCacheNow()
 *    - Automatically clears all caches and refreshes
 * 
 * 2. PROGRAMMATIC (From code):
 *    - Call emergencyCacheClear() for immediate clearing
 *    - Call clearAllCache() for standard development clearing
 * 
 * 3. MANUAL BROWSER:
 *    - DevTools → Application → Storage → Clear Storage
 *    - Or: Ctrl+Shift+Delete → Clear browsing data
 * 
 * USE CASES:
 * - Seeing old/stale content after deployments
 * - Service worker not updating properly
 * - Images or data from previous development sessions
 * - Testing cache invalidation strategies
 */

/**
 * Generate cache-busting parameter for images during development
 */
export function getCacheBustParam(): string {
  if (process.env.NODE_ENV === 'development') {
    return `?v=${Date.now()}`;
  }
  return '';
}

/**
 * Add cache busting to image URLs when needed
 */
export function addCacheBust(imageUrl: string): string {
  if (process.env.NODE_ENV === 'development') {
    const separator = imageUrl.includes('?') ? '&' : '?';
    return `${imageUrl}${separator}v=${Date.now()}`;
  }
  return imageUrl;
}

/**
 * Force cache invalidation for a specific URL
 * Useful for manual cache clearing
 */
export function invalidateCache(url: string) {
  if (typeof window !== 'undefined' && 'caches' in window) {
    caches.open('personal-portfolio-v1').then(cache => {
      cache.delete(url);
      console.log(`Cache invalidated for: ${url}`);
    });
  }
}

/**
 * EMERGENCY: Clear all cached content (USE THIS NOW)
 */
export function emergencyCacheClear() {
  if (typeof window !== 'undefined') {
    console.log('🚨 EMERGENCY CACHE CLEAR INITIATED');
    
    // 1. Clear all service worker caches
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        console.log('Found caches:', cacheNames);
        cacheNames.forEach(cacheName => {
          caches.delete(cacheName);
          console.log(`🗑️ Deleted cache: ${cacheName}`);
        });
      });
    }
    
    // 2. Unregister all service workers
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          registration.unregister();
          console.log('🗑️ Unregistered service worker');
        });
      });
    }
    
    // 3. Clear browser storage
    if (window.localStorage) {
      window.localStorage.clear();
      console.log('🗑️ Cleared localStorage');
    }
    
    if (window.sessionStorage) {
      window.sessionStorage.clear();
      console.log('🗑️ Cleared sessionStorage');
    }
    
    console.log('✅ Emergency cache clear complete - refresh page');
    
    // 4. Force page refresh after clearing
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}

/**
 * Clear all cached content (development helper)
 */
export function clearAllCache() {
  if (typeof window !== 'undefined' && 'caches' in window) {
    caches.keys().then(cacheNames => {
      cacheNames.forEach(cacheName => {
        caches.delete(cacheName);
        console.log(`Deleted cache: ${cacheName}`);
      });
    });
  }
}
