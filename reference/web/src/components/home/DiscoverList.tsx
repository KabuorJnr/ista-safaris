import { Link } from 'react-router-dom'
import { Compass, MapPin, Home, ChevronRight } from 'lucide-react'
import { SparkIcon } from '../icons'
import { DISCOVER } from '../../data/content'
const ICONS = { wildlife: Compass, landmarks: MapPin, stays: Home, culture: SparkIcon } as const

export default function DiscoverList({ onFilter }: { onFilter: (f: string) => void }) {
  return (
    <section className="discover" aria-labelledby="discover-h">
      <div className="discover-head"><h2 id="discover-h">Discover</h2><Link to="/#regional-map">See all</Link></div>
      <ul>
        {DISCOVER.map((d) => {
          const Icon = ICONS[d.id as keyof typeof ICONS]
          const f = d.id === 'wildlife' ? 'Wildlife' : d.id === 'landmarks' ? 'Landmarks' : 'All'
          return (
            <li key={d.id}>
              <a href="#explore-nearby" onClick={() => onFilter(f)}>
                <span className="ic"><Icon size={22} /></span>
                <span className="t"><b>{d.title}</b><small>{d.sub}</small></span>
                <ChevronRight className="chev" size={20} strokeWidth={2} aria-hidden="true" />
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
