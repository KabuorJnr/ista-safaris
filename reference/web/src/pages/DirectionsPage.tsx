import { Link } from 'react-router-dom'
import RoutePlanner from '../components/directions/RoutePlanner'
export default function DirectionsPage() {
  return (
    <section className="dir-band">
      <div className="dir-in">
        <div className="dir-head">
          <div><span className="eyebrow gold">ISTA navigation</span><h1>Where are you<br /><em>heading next?</em></h1><p>Plan your journey across Taita Taveta with live routes and clear, step-by-step guidance.</p></div>
          <Link className="back" to="/"><span aria-hidden="true">←</span> Back to explore</Link>
        </div>
        <RoutePlanner />
      </div>
    </section>
  )
}
