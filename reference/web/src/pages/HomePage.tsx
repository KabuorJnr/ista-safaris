import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Hero from '../components/home/Hero'
import RegionalMap from '../components/home/RegionalMap'
import SmartSuggestion from '../components/home/SmartSuggestion'
import OfflineDownloadCard from '../components/home/OfflineDownloadCard'
import ExploreNearby from '../components/home/ExploreNearby'
import DiscoverList from '../components/home/DiscoverList'
import AskIsta from '../components/home/AskIsta'

const greeting = () => { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening' }

export default function HomePage() {
  const [selected, setSelected] = useState('voi')
  const [fly, setFly] = useState(0)
  const [filter, setFilter] = useState('All')
  const { hash } = useLocation()
  useEffect(() => { if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }) }, [hash])
  const select = (id: string) => { setSelected(id); setFly((n) => n + 1) }
  const pickFromSearch = (id: string) => { select(id); document.getElementById('regional-map')?.scrollIntoView({ behavior: 'smooth' }) }
  return (
    <>
      <Hero onPick={pickFromSearch} />
      <section className="explore wrap" aria-labelledby="explore-h">
        <div className="sec-head" id="regional-map">
          <div><span className="eyebrow">Know where you’re going</span><h2 id="explore-h">Explore Taita Taveta</h2><p>From misty hills to the red plains of Tsavo, discover the county’s essential stops.</p></div>
          <span className="live"><i aria-hidden="true" />Interactive map</span>
        </div>
        <RegionalMap selected={selected} onSelect={select} fly={fly} />
      </section>
      <section className="moment wrap">
        <div className="col-main">
          <div className="greet">
            <div><span className="eyebrow">Made for this moment</span><h2>{greeting()},<br />explorer.</h2></div>
            <Link className="arrow-link day" to="/#explore-nearby"><span>View day plan</span><ArrowRight size={20} strokeWidth={2} aria-hidden="true" /></Link>
          </div>
          <SmartSuggestion />
          <ExploreNearby filter={filter} setFilter={setFilter} />
        </div>
        <div className="col-side">
          <OfflineDownloadCard />
          <DiscoverList onFilter={setFilter} />
          <AskIsta />
        </div>
      </section>
    </>
  )
}
