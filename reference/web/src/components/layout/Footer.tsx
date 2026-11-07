import { Link } from 'react-router-dom'
// Not in the design. Kept small because the legal pages and data deletion path must stay reachable.
export default function Footer() {
  return (
    <footer className="ftr">
      <div className="ftr-in">
        <span>© {new Date().getFullYear()} ISTA Safaris · Map data © OpenStreetMap contributors</span>
        <nav aria-label="Legal">
          <Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/refunds">Refunds</Link><Link to="/cookies">Cookies</Link><Link to="/business">Business details</Link><Link to="/delete-my-data">Delete my data</Link>
        </nav>
      </div>
    </footer>
  )
}
