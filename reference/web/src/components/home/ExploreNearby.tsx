import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bookmark, Star, ChevronRight } from 'lucide-react'
import { RouteIcon } from '../icons'
import { NEARBY } from '../../data/content'
import { saved, toggleSaved } from '../../lib/consent'

const FILTERS = ['All', 'Wildlife', 'Landmarks'] as const

export default function ExploreNearby({ filter, setFilter }: { filter: string; setFilter: (f: string) => void }) {
  const [marks, setMarks] = useState<string[]>(saved(['mudanda']))
  const list = NEARBY.filter((n) => filter === 'All' || n.category === filter)
  return (
    <section className="nearby" id="explore-nearby" aria-labelledby="nearby-h">
      <div className="nearby-head">
        <h2 id="nearby-h">Explore nearby</h2>
        <div className="chips" role="group" aria-label="Filter places">
          {FILTERS.map((f) => <button key={f} className={filter === f ? 'on' : ''} aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>)}
        </div>
      </div>
      <div className={'cards n' + list.length}>
        {list.map((c, i) => {
          const on = marks.includes(c.id)
          return (
            <article key={c.id} className={'card' + (i === 0 && list.length === 3 ? ' tall' : '')}>
              <div className="card-img">
                <img src={c.image} alt={`${c.name}`} loading="lazy" />
                <span className={'tag ' + c.category.toLowerCase()}>{c.category}</span>
                <button className={'mark' + (on ? ' on' : '')} aria-pressed={on} aria-label={on ? `Remove ${c.name} from saved` : `Save ${c.name}`} onClick={() => setMarks(toggleSaved(c.id))}>
                  <Bookmark size={22} strokeWidth={2} fill={on ? 'currentColor' : 'none'} aria-hidden="true" />
                </button>
              </div>
              <div className="card-body">
                <div className="card-title"><h3>{c.name}</h3><span className="rate"><Star size={18} fill="currentColor" strokeWidth={0} aria-hidden="true" /><b>{c.rating}</b><span className="sr-only"> out of 5</span></span></div>
                <p>{c.desc}</p>
                <div className="card-meta">
                  <span><RouteIcon size={21} />{c.km}</span>
                  <span>{c.drive}</span>
                  <Link to={`/directions?to=${encodeURIComponent(c.to)}`}>Navigate <ChevronRight size={16} strokeWidth={2.5} aria-hidden="true" /></Link>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
