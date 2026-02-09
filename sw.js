const CACHE_NAME = 'grammar-master-v1';

// List all the files you want to work offline
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/literature.html',
  'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
  'https://res.cloudinary.com/dqy6ontyx/image/upload/v1770629332/dg_m9gsuo.png',
  'https://res.cloudinary.com/dqy6ontyx/image/upload/v1770629393/favicon-32x32_ioyy6p.png'
];

// 1. Install Phase: Download files into cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets for offline mode');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Activate Phase: Clean up old versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// 3. Fetch Phase: Serve from cache if offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return from cache, otherwise go to network
      return response || fetch(event.request);
    }).catch(() => {
      // Optional: Return a custom offline page if both fail
    })
  );
});
```
