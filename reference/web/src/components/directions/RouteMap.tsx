import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { MapPin } from 'lucide-react'
import { MAP_VIEW } from '../../data/places'

export default function RouteMap({ line }: { line: [number, number][] | null }) {
  const el = useRef<HTMLDivElement>(null)
  const map = useRef<L.Map | null>(null)
  const layer = useRef<L.LayerGroup | null>(null)
  useEffect(() => {
    if (!el.current || map.current) return
    const m = L.map(el.current, { zoomSnap: 0, zoomControl: false, scrollWheelZoom: false }).setView(MAP_VIEW.center, el.current.clientWidth >= 600 ? MAP_VIEW.zoom : 8.6)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(m)
    L.control.zoom({ position: 'bottomright' }).addTo(m)
    layer.current = L.layerGroup().addTo(m)
    map.current = m
    return () => { m.remove(); map.current = null }
  }, [])
  useEffect(() => {
    if (!map.current || !layer.current) return
    layer.current.clearLayers()
    if (line && line.length) {
      const pl = L.polyline(line, { color: '#bf553a', weight: 5, opacity: 0.9 }).addTo(layer.current)
      L.circleMarker(line[0], { radius: 8, color: '#23523b', weight: 3, fillColor: '#fff', fillOpacity: 1 }).addTo(layer.current)
      L.circleMarker(line[line.length - 1], { radius: 8, color: '#fff', weight: 3, fillColor: '#bf553a', fillOpacity: 1 }).addTo(layer.current)
      map.current.fitBounds(pl.getBounds().pad(0.15))
    }
  }, [line])
  return (
    <div className="route-map">
      <div ref={el} className="map" role="application" aria-label="Route map" />
      {!line && (
        <div className="route-empty">
          <MapPin size={24} strokeWidth={2} aria-hidden="true" />
          <span><small>Explore with confidence</small><b>Your route will appear here</b></span>
        </div>
      )}
    </div>
  )
}
