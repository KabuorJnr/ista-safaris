import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Compass, ArrowRight, Map as MapIcon } from 'lucide-react'
import { RouteIcon } from '../icons'
import RouteMap from './RouteMap'
import { PLACES, findPlace } from '../../data/places'

type Pt = { lat: number; lng: number }

async function geocode(q: string): Promise<Pt> {
  const known = findPlace(q)
  if (known) return { lat: known.lat, lng: known.lng }
  const r = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=ke&q=${encodeURIComponent(q)}`)
  const j = (await r.json()) as { lat: string; lon: string }[]
  if (!j.length) throw new Error(`We could not find “${q}”. Try a nearby town or one of the six places.`)
  return { lat: +j[0].lat, lng: +j[0].lon }
}

export default function RoutePlanner() {
  const [params] = useSearchParams()
  const [from, setFrom] = useState('')
  const [to, setTo] = useState(params.get('to') ?? '')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [line, setLine] = useState<[number, number][] | null>(null)
  const [info, setInfo] = useState<{ km: number; min: number; steps: string[] } | null>(null)
  useEffect(() => { const t = params.get('to'); if (t) setTo(t) }, [params])

  const locate = () => {
    if (!navigator.geolocation) { setErr('Location is not available in this browser.'); return }
    navigator.geolocation.getCurrentPosition((p) => setFrom(`${p.coords.latitude.toFixed(5)}, ${p.coords.longitude.toFixed(5)}`), () => setErr('We could not get your location. Type where you are instead.'), { timeout: 8000 })
  }

  const go = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(''); setInfo(null); setLine(null)
    if (!from.trim() || !to.trim()) { setErr('Enter both your current location and a destination.'); return }
    if (!navigator.onLine) { setErr('You are offline. Routes need a connection; saved map areas still work.'); return }
    setBusy(true)
    try {
      const coord = /^\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*$/.test(from)
      const a: Pt = coord ? { lat: +from.split(',')[0], lng: +from.split(',')[1] } : await geocode(from)
      const b = await geocode(to)
      const r = await fetch(`https://router.project-osrm.org/route/v1/driving/${a.lng},${a.lat};${b.lng},${b.lat}?overview=full&geometries=geojson&steps=true`)
      const j = await r.json()
      if (j.code !== 'Ok' || !j.routes?.length) throw new Error('No driving route was found between those places.')
      const rt = j.routes[0]
      setLine(rt.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]))
      type Step = { name: string; maneuver: { type: string; modifier?: string } }
      const steps: string[] = (rt.legs[0].steps as Step[]).filter((s) => s.name || s.maneuver.type === 'arrive').map((s) => {
        const m = s.maneuver.type === 'arrive' ? 'Arrive' : s.maneuver.type === 'depart' ? 'Start' : `${s.maneuver.type === 'turn' ? 'Turn' : 'Continue'}${s.maneuver.modifier ? ' ' + s.maneuver.modifier : ''}`
        return `${m}${s.name ? ' on ' + s.name : ''}`
      })
      setInfo({ km: rt.distance / 1000, min: rt.duration / 60, steps })
    } catch (ex) { setErr(ex instanceof Error ? ex.message : 'Something went wrong. Please try again.') }
    setBusy(false)
  }

  return (
    <div className="dir-card">
      <form className="dir-form" onSubmit={go} noValidate>
        <div className="dir-top">
          <span className="ic"><RouteIcon size={26} /></span>
          <div><span className="eyebrow sm">Plan a route</span><h2>Get directions</h2></div>
        </div>
        <label className="lbl" htmlFor="from">Current location</label>
        <div className="loc from">
          <i className="ring" aria-hidden="true" />
          <input id="from" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="e.g. Voi, Kenya" autoComplete="off" />
          <button type="button" className="locate" onClick={locate} aria-label="Use my current location"><Compass size={22} strokeWidth={2} aria-hidden="true" /></button>
        </div>
        <span className="dash" aria-hidden="true" />
        <label className="lbl" htmlFor="to">Destination</label>
        <div className="loc to">
          <i className="dot" aria-hidden="true" />
          <input id="to" value={to} onChange={(e) => setTo(e.target.value)} placeholder="e.g. Taita Hills" list="places" autoComplete="off" />
          <datalist id="places">{PLACES.map((p) => <option key={p.id} value={p.name} />)}</datalist>
        </div>
        <button className="btn btn-terra go" disabled={busy}>{busy ? 'Finding your route…' : <>Show me the way <ArrowRight size={22} strokeWidth={2} aria-hidden="true" /></>}</button>
        <hr />
        {err && <p className="err" role="alert">{err}</p>}
        {info ? (
          <div className="result" aria-live="polite"><b>{info.km.toFixed(1)} km · about {Math.round(info.min)} min by car</b><ol>{info.steps.map((s, i) => <li key={i}>{s}</li>)}</ol><small>Routing by OSRM using OpenStreetMap data. Estimates only; check road conditions locally.</small></div>
        ) : (
          <p className="hint"><MapIcon size={28} strokeWidth={1.75} aria-hidden="true" />Enter two locations to see your route, travel time, and directions.</p>
        )}
      </form>
      <RouteMap line={line} />
    </div>
  )
}
