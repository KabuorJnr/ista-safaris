import { useEffect, useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import SearchBar from './SearchBar'
import SafetyDialog from './SafetyDialog'
import { tsavoWeather } from '../../lib/weather'

export default function Hero({ onPick }: { onPick: (id: string) => void }) {
  const [wx, setWx] = useState<{ temp: number; label: string } | null>(null)
  const [safety, setSafety] = useState(false)
  useEffect(() => { tsavoWeather().then(setWx) }, [])
  return (
    <section className="hero" aria-label="Welcome">
      <div className="hero-in">
        <p className="hero-meta">
          <span>Tsavo East National Park</span>
          {wx && <><i aria-hidden="true" /><span>{wx.temp}°C</span><i aria-hidden="true" /><span>{wx.label}</span></>}
        </p>
        <p className="eyebrow gold">Your intelligent safari companion</p>
        <h1>The wild is calling.<br /><em>Go further.</em></h1>
        <p className="hero-sub">Navigate, discover, and hear the stories of Tsavo—even beyond the signal.</p>
        <SearchBar onPick={onPick} />
      </div>
      <button className="safety" onClick={() => setSafety(true)}><ShieldCheck size={22} strokeWidth={2} aria-hidden="true" />Safety center</button>
      <SafetyDialog open={safety} onClose={() => setSafety(false)} />
    </section>
  )
}
