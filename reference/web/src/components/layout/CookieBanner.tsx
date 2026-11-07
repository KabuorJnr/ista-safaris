import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getConsent, setConsent } from '../../lib/consent'

export default function CookieBanner() {
  const [show, setShow] = useState(!getConsent())
  if (!show) return null
  const decide = () => { setConsent(); setShow(false) }
  return (
    <div className="cookie" role="dialog" aria-label="Cookie notice">
      <p>ISTA uses only essential storage: your sign in, saved places and the offline map. No advertising or tracking cookies. <Link to="/cookies">Cookie policy</Link></p>
      <div className="acts">
        <button className="btn btn-line" onClick={decide}>Reject non-essential</button>
        <button className="btn btn-forest" onClick={decide}>Accept</button>
      </div>
    </div>
  )
}
