const CACHE_NAME = 'pwa-example-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './icons/icon.png',
    './icons/icon.png'
];

// 在 install 事件中緩存所需的資源
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// 在 fetch 事件中，攔截請求並回應緩存的資源
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // 如果找到緩存的資源，則返回，否則去網絡請求
                return response || fetch(event.request);
            })
    );
});

// 在 activate 事件中清除舊的緩存
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
