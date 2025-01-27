const CACHE_NAME = "next-pwa-cache-v1";
const urlsToCache = ["/", "/offline.html"];

// Installiere den Service Worker und cache wichtige Dateien
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Nutze den Cache für Anfragen
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches
        .match(event.request)
        .then((response) => response || caches.match("/offline.html"))
    )
  );
});

// Lösche alten Cache, wenn eine neue Version verfügbar ist
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
