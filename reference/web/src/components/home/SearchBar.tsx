import { useState } from 'react'
import { Search, Mic } from 'lucide-react'
import { PLACES } from '../../data/places'

type Rec = { start: () => void; onresult: (e: { results: { 0: { transcript: string } }[] }) => void; onend: () => void; lang: string }

export default function SearchBar({ onPick }: { onPick: (id: string) => void }) {
  const [q, setQ] = useState('')
  const [listening, setListening] = useState(false)
  const term = q.trim().toLowerCase()
  const hits = term ? PLACES.filter((p) => (p.name + ' ' + p.tagline + ' ' + p.kind).toLowerCase().includes(term)) : []
  const pick = (id: string) => { onPick(id); setQ('') }
  const W = window as unknown as { SpeechRecognition?: new () => Rec; webkitSpeechRecognition?: new () => Rec }
  const SR = W.SpeechRecognition ?? W.webkitSpeechRecognition
  const listen = () => {
    if (!SR) return
    const r = new SR(); r.lang = 'en-KE'
    r.onresult = (e) => setQ(e.results[0][0].transcript)
    r.onend = () => setListening(false)
    setListening(true); r.start()
  }
  return (
    <form className="search" role="search" onSubmit={(e) => { e.preventDefault(); if (hits[0]) pick(hits[0].id) }}>
      <Search className="search-ic" size={26} strokeWidth={2} aria-hidden="true" />
      <label className="sr-only" htmlFor="search">Search places, wildlife, or experiences</label>
      <input id="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search places, wildlife, or experiences" autoComplete="off" />
      <button type="button" className={'mic' + (listening ? ' on' : '')} onClick={listen} disabled={!SR} aria-label={SR ? 'Search by voice' : 'Voice search is not supported in this browser'}>
        <Mic size={24} strokeWidth={2} aria-hidden="true" />
      </button>
      {term && (
        <ul className="search-results">
          {hits.length ? hits.map((p) => <li key={p.id}><button type="button" onClick={() => pick(p.id)}><b>{p.name}</b><small>{p.tagline}</small></button></li>) : <li className="empty">No places match “{q}”.</li>}
        </ul>
      )}
    </form>
  )
}
