import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import L from 'leaflet'
import { ChevronRight, MapPin, ArrowRight } from 'lucide-react'
import { PLACES, MAP_VIEW } from '../../data/places'

const pinIcon = (n: number, active: boolean) => L.divIcon({
  className: 'pin-wrap',
  html: `<div class="pin${active ? ' on' : ''}"><span>${n}</span></div>`,
  iconSize: [46, 56], iconAnchor: [23, 55],
})

export default function RegionalMap({ selected, onSelect, fly }: { selected: string; onSelect: (id: string) => void; fly: number }) {
  const el = useRef<HTMLDivElement>(null)
  const map = useRef<L.Map | null>(null)
  const markers = useRef<Record<string, L.Marker>>({})
  const place = PLACES.find((p) => p.id === selected) ?? PLACES[0]

  useEffect(() => {
    if (!el.current || map.current) return
    const m = L.map(el.current, { zoomSnap: 0, zoomControl: false, scrollWheelZoom: false })
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(m)
    L.control.zoom({ position: 'bottomright' }).addTo(m)
    if (el.current.clientWidth >= 700) m.setView(MAP_VIEW.center, MAP_VIEW.zoom)
    else m.fitBounds(L.latLngBounds(PLACES.map((p) => [p.lat, p.lng])), { paddingTopLeft: [40, 60], paddingBottomRight: [40, 170] })
    PLACES.forEach((p, i) => {
      markers.current[p.id] = L.marker([p.lat, p.lng], { icon: pinIcon(i + 1, false), title: p.name, alt: p.name, keyboard: false }).on('click', () => onSelect(p.id)).addTo(m)
    })
    map.current = m
    return () => { m.remove(); map.current = null }
  }, [])

  useEffect(() => {
    PLACES.forEach((p, i) => markers.current[p.id]?.setIcon(pinIcon(i + 1, p.id === selected)))
  }, [selected])

  useEffect(() => {
    if (fly && map.current) map.current.flyTo([place.lat, place.lng], 11.6, { duration: 1.1 })
  }, [fly])

  return (
    <div className="map-card">
      <div className="places">
        <div className="places-head"><h3>Places to explore</h3><span>{PLACES.length} locations</span></div>
        <ul>
          {PLACES.map((p) => (
            <li key={p.id}>
              <button className={'place-row' + (p.id === selected ? ' on' : '')} aria-pressed={p.id === selected} onClick={() => onSelect(p.id)}>
                <span className="num">{p.n}</span>
                <span className="txt"><b>{p.name}</b><small>{p.tagline}</small></span>
                <ChevronRight className="chev" size={20} strokeWidth={2} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="map-wrap">
        <div ref={el} className="map" role="application" aria-label="Map of places in Taita Taveta" />
        <div className="map-sel">
          <span className="ic"><MapPin size={24} strokeWidth={2} aria-hidden="true" /></span>
          <span className="t"><small>{place.kind}</small><b>{place.name}</b></span>
          <Link className="btn btn-terra sm" to={`/directions?to=${encodeURIComponent(place.name)}`}>View place <ArrowRight size={20} strokeWidth={2} aria-hidden="true" /></Link>
        </div>
      </div>
    </div>
  )
}
