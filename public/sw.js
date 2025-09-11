// Service Worker for RockitCode Portfolio
// This provides basic caching and offline functionality

// =============================================================================
// DEVELOPMENT FLAG + EDGE DETECTION
// =============================================================================
const DISABLE_CACHING = false; // Re-enabled caching for production
const IS_EDGE = self.navigator && /Edg\//.test(self.navigator.userAgent);
// EDGE FIX: Disable service worker completely in Edge to prevent 404s after builds
if (IS_EDGE) {
  console.log('🦘 Edge detected: Service worker disabled to prevent cache issues');
  // In Edge, just pass everything through to network
  self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request));
  });
  // Skip all other functionality
  return;
}
// =============================================================================

const CACHE_NAME = 'personal-portfolio-v4-2025-09-11'; // CACHE VERSION BUMP - fixes scroll animation cache issue
const STATIC_CACHE_URLS = [
  '/',
  // Only cache resources that actually exist
  // '/manifest.json', // REMOVED: This file doesn't exist and causes cache failures
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  if (DISABLE_CACHING) {
    console.log('Caching disabled for development');
    // FIREFOX FIX: Don't force skipWaiting immediately - let Firefox handle naturally
    return;
  }
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets');
        // Cache each URL individually to handle failures gracefully
        return Promise.allSettled(
          STATIC_CACHE_URLS.map(url => 
            cache.add(url).catch(error => {
              console.warn(`Failed to cache ${url}:`, error);
              return null; // Continue with other URLs
            })
          )
        );
      })
      .then((results) => {
        const successful = results.filter(result => result.status === 'fulfilled').length;
        const failed = results.filter(result => result.status === 'rejected').length;
        console.log(`✅ Cache installation: ${successful} successful, ${failed} failed`);
      })
      .catch((error) => {
        console.error('Cache installation failed:', error);
      })
  );
  
  // FIREFOX FIX: Only skip waiting when explicitly requested via message
  // Don't force it automatically during install
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // DELETE ALL old caches, not just different versions
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ All old caches cleared');
      // FIREFOX FIX: Let clients.claim() work naturally without forcing
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache when offline, otherwise fetch from network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  // If caching is disabled, always fetch from network
  if (DISABLE_CACHING) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response as it can only be consumed once
            const responseToCache = response.clone();

            // Cache successful responses for future use
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // If both cache and network fail, show a fallback page for navigation requests
            if (event.request.destination === 'document') {
              return caches.match('/');
            }
          });
      })
  );
});

// Handle service worker updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('Received SKIP_WAITING message - Firefox compatible update');
    self.skipWaiting();
  }
});
