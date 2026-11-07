import { ThinArrow } from '../icons'
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import OfflineBadge from './OfflineBadge'
import { useAuth } from '../../lib/AuthContext'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { session, signOut } = useAuth()
  const { pathname } = useLocation()
  const close = () => setOpen(false)
  return (
    <header className={'hdr' + (open ? ' open' : '')}>
      <div className="hdr-in">
        <Link to="/" className="brand" onClick={close} aria-label="ISTA Safaris home">
          <img src="/icons/logo.png" alt="" width={60} height={60} />
          <b>ISTA</b><small>Safaris</small>
        </Link>
        <nav className="nav" aria-label="Main">
          <NavLink to="/" end onClick={close} className={() => (pathname === '/' ? 'active' : '')}>Explore</NavLink>
          <NavLink to="/directions" onClick={close}>Directions</NavLink>
          <Link to="/#regional-map" onClick={close}>Taita Taveta</Link>
        </nav>
        <div className="hdr-right">
          <OfflineBadge />
          {session ? (
            <button className="txt-link" onClick={() => { signOut(); close() }}>Sign out</button>
          ) : (
            <>
              <Link className="txt-link" to="/sign-in" onClick={close}>Sign in</Link>
              <Link className="btn btn-forest hdr-cta" to="/sign-up" onClick={close}>Create account <ThinArrow /></Link>
            </>
          )}
          <button className="menu-toggle" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}><span /><span /><span /></button>
        </div>
      </div>
    </header>
  )
}
