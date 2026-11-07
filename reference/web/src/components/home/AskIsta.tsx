import { useEffect, useRef, useState } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { SparkIcon } from '../icons'
import { PLACES } from '../../data/places'

function answer(q: string): string {
  const t = q.toLowerCase()
  const hit = PLACES.find((p) => t.includes(p.name.toLowerCase().split(' ')[0]))
  if (hit) return `${hit.name}: ${hit.tagline}. Use View place on the map for directions.`
  if (/elephant|animal|wildlife/.test(t)) return 'For wildlife, try Aruba Dam, Mzima Springs and Lake Jipe. Elephants often gather near water in the late afternoon.'
  if (/hill|view|forest/.test(t)) return 'Taita Hills has cloud forest and wide viewpoints. Mornings are usually clearest.'
  if (/offline|signal/.test(t)) return 'Press Download region on the Explore page to keep the map on this device.'
  if (/direction|route|get to/.test(t)) return 'Open Directions, enter where you are and where you are going, then press Show me the way.'
  return 'I can help with the six places on the map: Voi, Aruba Dam, Taita Hills, Mzima Springs, Lake Jipe and Lumo Sanctuary.'
}

export default function AskIsta() {
  const [open, setOpen] = useState(false)
  const [log, setLog] = useState<{ me: boolean; t: string }[]>([{ me: false, t: 'Jambo! Ask me about places in Taita Taveta and Tsavo.' }])
  const [q, setQ] = useState('')
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => { const d = ref.current; if (!d) return; if (open && !d.open) d.showModal(); if (!open && d.open) d.close() }, [open])
  return (
    <>
      <button className="ask" onClick={() => setOpen(true)} aria-haspopup="dialog">
        <span className="ic"><SparkIcon size={38} /></span>
        <span className="t"><small>Ask ISTA</small><b>Your local guide,<br />in any language.</b></span>
        <ArrowRight className="arr" size={24} strokeWidth={1.75} aria-hidden="true" />
      </button>
      <dialog ref={ref} className="dlg chat" onClose={() => setOpen(false)} aria-labelledby="ask-title">
        <button className="dlg-x" onClick={() => setOpen(false)} aria-label="Close"><X size={20} /></button>
        <span className="eyebrow">Ask ISTA</span>
        <h2 id="ask-title">Your local guide</h2>
        <div className="log" aria-live="polite">{log.map((m, i) => <div key={i} className={'msg ' + (m.me ? 'me' : 'bot')}>{m.t}</div>)}</div>
        <form onSubmit={(e) => { e.preventDefault(); if (!q.trim()) return; setLog([...log, { me: true, t: q }, { me: false, t: answer(q) }]); setQ('') }}>
          <label className="sr-only" htmlFor="ask-q">Your question</label>
          <input id="ask-q" className="field" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask about a place" />
          <button className="btn btn-forest" type="submit">Send</button>
        </form>
      </dialog>
    </>
  )
}
