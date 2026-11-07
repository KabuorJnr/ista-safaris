import { useEffect, useState } from 'react'
export default function OfflineBadge() {
  const [online, setOnline] = useState(navigator.onLine)
  useEffect(() => {
    const on = () => setOnline(true), off = () => setOnline(false)
    window.addEventListener('online', on); window.addEventListener('offline', off)
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off) }
  }, [])
  return <span className={'status' + (online ? '' : ' off')} role="status"><i aria-hidden="true" />{online ? 'Offline ready' : 'Offline mode'}</span>
}
