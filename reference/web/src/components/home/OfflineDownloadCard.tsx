import { useState } from 'react'
import { ArrowDownToLine as Download } from 'lucide-react'
import { downloadRegion } from '../../lib/offline'
import { REGION_SIZE } from '../../data/content'

export default function OfflineDownloadCard() {
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'err'>('idle')
  const [pct, setPct] = useState(0)
  const go = async () => {
    setState('busy'); setPct(0)
    try { await downloadRegion((d, t) => setPct(Math.round((d / t) * 100))); setState('done') } catch { setState('err') }
  }
  return (
    <aside className="dl-card" aria-label="Offline region">
      <span className="dot" aria-hidden="true" />
      <span className="ic"><Download size={24} strokeWidth={2} aria-hidden="true" /></span>
      <h3>Download Tsavo offline</h3>
      <p>Stay on track when the signal disappears. Includes maps, stories, and safety info.</p>
      <div className="meta"><span>{REGION_SIZE}</span><span>{state === 'done' ? 'Saved on this device' : 'Updated today'}</span></div>
      {state === 'err' && <p className="dl-err" role="alert">Download failed. Check your connection and try again.</p>}
      <button className="btn btn-gold" onClick={go} disabled={state === 'busy'} aria-live="polite">
        <Download size={20} strokeWidth={2} aria-hidden="true" />
        {state === 'busy' ? `Saving ${pct}%` : state === 'done' ? 'Region saved' : 'Download region'}
      </button>
    </aside>
  )
}
