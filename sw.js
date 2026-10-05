// PassionMeet — service des notifications (v2 : icône Android corrigée) (à placer à la racine du site, à côté d'index.html)
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('push', (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (e) { data = { title: 'PassionMeet', body: event.data ? event.data.text() : '' }; }
  const title = data.title || 'PassionMeet';
  event.waitUntil(self.registration.showNotification(title, {
    body: data.body || '',
    icon: '/icon-192.png',
    badge: '/badge-96.png',   // Android : silhouette blanche sur fond transparent (sinon carré blanc)
    data: { url: data.url || '/' },
    tag: data.url || 'passionmeet',
    renotify: true
  }));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || '/';
  event.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of all) {
      if ('focus' in c) { await c.navigate(url).catch(() => {}); return c.focus(); }
    }
    return self.clients.openWindow(url);
  })());
});
