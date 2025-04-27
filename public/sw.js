const CACHE_NAME = 'insta-slide-v1';

// Add all assets you want to cache here
const assetsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/logo_mini.webp',
  '/assets/preview_3.webp',
  '/icons/icon-180x180.png'
];

// Install event - cache all static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(assetsToCache);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Claim any clients immediately
      return self.clients.claim();
    })
  );
});

// Helper function to check if a request should be cached
const shouldCache = (url) => {
  const parsedUrl = new URL(url);
  
  // Always cache specific assets
  const alwaysCachePatterns = [
    '/assets/logo_mini.webp',
    '/assets/preview_3.webp'
  ];
  
  if (alwaysCachePatterns.some(pattern => parsedUrl.pathname.endsWith(pattern))) {
    return true;
  }

  // For other requests, only cache same-origin requests with supported schemes
  return (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') &&
         (parsedUrl.origin === self.location.origin);
};

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Check if the request should be cached
  if (!shouldCache(event.request.url)) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // Return cached response if found
        }
        
        // Otherwise fetch from network
        return fetch(event.request).then(response => {
          // Don't cache if response is not ok
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Cache the response
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
}); 