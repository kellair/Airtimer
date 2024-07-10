// Service Worker for caching assets
const CACHE_NAME = 'airtimer-cache-v1';
const urlsToCache = [
    '/',
    '/index.html', // Adjust path if necessary
    '/styles.css', // Adjust path if necessary
    '/app.js' // Adjust path if necessary
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
            .then(response => response || fetch(event.request))
    );
});
