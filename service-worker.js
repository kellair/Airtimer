// Service Worker for caching assets
const CACHE_NAME = 'airtimer-cache-v1';
const urlsToCache = [
    '/',
    '/index.html', // Adjust path if necessary
    '/styles.css', // Adjust path if necessary
    '/app.js', // Adjust path if necessary
    '/offline.html', // Adjust path if necessary
    '/favicon.ico' // Example of other resources
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // If resource is in cache, return it
                if (response) {
                    return response;
                }
                // Otherwise, try fetching from network
                return fetch(event.request)
                    .catch(() => caches.match('/offline.html')); // Show offline page on network failure
            })
    );
});
