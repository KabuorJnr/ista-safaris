import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
export default function SafetyDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => { const d = ref.current; if (!d) return; if (open && !d.open) d.showModal(); if (!open && d.open) d.close() }, [open])
  return (
    <dialog ref={ref} className="dlg" onClose={onClose} aria-labelledby="safety-title">
      <button className="dlg-x" onClick={onClose} aria-label="Close"><X size={20} /></button>
      <span className="eyebrow">Safety center</span>
      <h2 id="safety-title">Travel safely in Tsavo</h2>
      <ul>
        <li>In an emergency in Kenya, call <a href="tel:999">999</a> or <a href="tel:112">112</a>.</li>
        <li>Stay inside your vehicle in the parks unless you are at a marked site.</li>
        <li>Follow ranger instructions and keep a safe distance from all animals.</li>
        <li>Carry water and tell someone your route before you set off.</li>
      </ul>
    </dialog>
  )
}
