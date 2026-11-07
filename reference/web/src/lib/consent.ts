const KEY = 'ista-consent-v1'
export type Consent = { essential: true; decided: boolean; at: string }
export function getConsent(): Consent | null {
  try { const v = localStorage.getItem(KEY); return v ? (JSON.parse(v) as Consent) : null } catch { return null }
}
export function setConsent() {
  // ISTA uses essential storage only (consent choice, saved places, offline cache). No analytics or advertising.
  try { localStorage.setItem(KEY, JSON.stringify({ essential: true, decided: true, at: new Date().toISOString() })) } catch { /* ignore */ }
}
export function saved(defaults: string[] = []): string[] {
  try { const v = localStorage.getItem('ista-saved'); return v ? JSON.parse(v) : defaults } catch { return defaults }
}
export function toggleSaved(id: string): string[] {
  const s = new Set(saved(['mudanda'])); s.has(id) ? s.delete(id) : s.add(id)
  const out = [...s]
  try { localStorage.setItem('ista-saved', JSON.stringify(out)) } catch { /* ignore */ }
  return out
}
