// Service worker voor de ZCFC Nieuwsfeed.
// Bewust nétwerk-eerst: de standen moeten altijd vers zijn. De cache is
// alleen een vangnet als er geen verbinding is. Verhoog CACHE bij wijzigingen.
const CACHE = 'zcfc-v1';
const BASIS = ['./', './index.html', './icoon-192.png', './icoon-512.png', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(BASIS))
      .catch(() => {})           // één ontbrekend bestand mag de installatie niet blokkeren
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(namen => Promise.all(namen.filter(n => n !== CACHE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Alleen eigen bestanden bewaren; de data-worker blijft altijd live
        if (res.ok && new URL(e.request.url).origin === location.origin) {
          const kopie = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, kopie)).catch(() => {});
        }
        return res;
      })
      .catch(() =>
        caches.match(e.request).then(r =>
          r || (e.request.mode === 'navigate' ? caches.match('./index.html') : undefined)
        )
      )
  );
});
