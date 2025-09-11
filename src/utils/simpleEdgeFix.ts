/**
 * Simple Edge Browser Fix - Based on Community Research
 * Fixes: 1-hour timeout white page issue in Edge after Next.js builds
 */

function isEdge() {
  return typeof window !== 'undefined' && /Edg\//.test(navigator.userAgent);
}

// Fix Edge's aggressive cache timeout that causes white pages after ~1 hour
if (isEdge()) {
  // Clear Edge caches immediately - prevents the 1-hour conflict
  if ('caches' in window) {
    caches.keys().then(names => names.forEach(name => caches.delete(name)));
  }
  
  // Skip service workers in Edge - they conflict with Edge's cache timing
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(regs => 
      regs.forEach(reg => reg.unregister())
    );
  }
}

export {};
