import { Check } from 'lucide-react'
import SignInForm from '../components/auth/SignInForm'
export default function SignInPage() {
  return (
    <div className="auth signin">
      <div className="auth-visual" style={{ backgroundImage: 'url(/images/sign-in.jpg)' }}>
        <div className="auth-copy">
          <span className="eyebrow gold">Welcome back, explorer</span>
          <h2>Your next<br />story<br />starts <em>here.</em></h2>
          <p>Sign in to continue your journeys, saved places, and offline adventures across Taita Taveta.</p>
          <div className="trust"><span className="ic"><Check size={24} strokeWidth={1.5} aria-hidden="true" /></span><span><b>Travel with confidence</b><small>Your account and trip details are protected.</small></span></div>
        </div>
      </div>
      <div className="auth-side"><SignInForm /></div>
    </div>
  )
}
