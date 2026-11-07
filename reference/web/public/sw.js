// Simple offline support: cache the app shell and previously viewed pages and map tiles.
const CACHE = 'ista-v1'
const SHELL = ['/', '/index.html', '/manifest.webmanifest', '/icons/logo.png', '/images/hero.jpg']
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL))); self.skipWaiting() })
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE && k !== 'ista-region').map((k) => caches.delete(k)))).then(() => self.clients.claim())) })
self.addEventListener('fetch', (e) => {
  const req = e.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  if (url.hostname.endsWith('supabase.co')) return
  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      if (res.ok && (url.origin === location.origin || url.hostname.endsWith('tile.openstreetmap.org') || url.hostname.endsWith('unsplash.com') || url.hostname.endsWith('gstatic.com') || url.hostname.endsWith('googleapis.com'))) {
        const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy))
      }
      return res
    }).catch(() => req.mode === 'navigate' ? caches.match('/index.html') : Response.error()))
  )
})
self.addEventListener('message', async (e) => {
  if (e.data && e.data.type === 'DOWNLOAD_REGION') {
    const cache = await caches.open('ista-region')
    let done = 0
    for (const u of e.data.urls) { try { const r = await fetch(u, { mode: 'no-cors' }); await cache.put(u, r) } catch (_) {} ; done++; e.source && e.source.postMessage({ type: 'REGION_PROGRESS', done, total: e.data.urls.length }) }
    e.source && e.source.postMessage({ type: 'REGION_DONE' })
  }
})
