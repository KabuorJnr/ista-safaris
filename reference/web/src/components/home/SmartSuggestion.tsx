import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SparkIcon } from '../icons'
export default function SmartSuggestion() {
  return (
    <div className="suggest">
      <span className="ic"><SparkIcon size={34} /></span>
      <div className="t">
        <span className="eyebrow sm">Smart suggestion</span>
        <h3>Aruba Dam is just 2.4 km away</h3>
        <p>Elephants often gather near the water around this time.</p>
      </div>
      <Link className="arrow-link" to="/directions?to=Aruba%20Dam">Take me there <ArrowRight size={20} strokeWidth={2} aria-hidden="true" /></Link>
    </div>
  )
}
