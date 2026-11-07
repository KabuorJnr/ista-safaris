import { PLACES } from '../data/places'

export function registerSW() {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => { navigator.serviceWorker.register('/sw.js').catch(() => {}) })
  }
}

function tileUrls(): string[] {
  // OpenStreetMap tiles for zoom 9 to 11 around each place (small region pack).
  const urls = new Set<string>()
  for (const p of PLACES) for (const z of [9, 10, 11]) {
    const n = 2 ** z
    const x = Math.floor(((p.lng + 180) / 360) * n)
    const lat = (p.lat * Math.PI) / 180
    const y = Math.floor(((1 - Math.log(Math.tan(lat) + 1 / Math.cos(lat)) / Math.PI) / 2) * n)
    for (const dx of [-1, 0, 1]) for (const dy of [-1, 0, 1]) urls.add(`https://tile.openstreetmap.org/${z}/${x + dx}/${y + dy}.png`)
  }
  return [...urls]
}

export async function downloadRegion(onProgress: (done: number, total: number) => void): Promise<number> {
  const urls = tileUrls()
  const reg = 'serviceWorker' in navigator ? await navigator.serviceWorker.ready.catch(() => null) : null
  if (!reg || !reg.active) {
    // Fallback (dev mode): fetch tiles into the Cache API directly.
    const cache = await caches.open('ista-region'); let done = 0
    for (const u of urls) { try { const r = await fetch(u, { mode: 'no-cors' }); await cache.put(u, r) } catch { /* skip */ } onProgress(++done, urls.length) }
    return done
  }
  return new Promise((resolve) => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'REGION_PROGRESS') onProgress(e.data.done, e.data.total)
      if (e.data?.type === 'REGION_DONE') { navigator.serviceWorker.removeEventListener('message', handler); resolve(urls.length) }
    }
    navigator.serviceWorker.addEventListener('message', handler)
    reg.active!.postMessage({ type: 'DOWNLOAD_REGION', urls })
  })
}
