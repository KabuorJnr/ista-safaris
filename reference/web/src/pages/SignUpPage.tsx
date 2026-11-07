import SignUpForm from '../components/auth/SignUpForm'
export default function SignUpPage() {
  return (
    <div className="auth signup">
      <div className="auth-visual" style={{ backgroundImage: 'url(/images/sign-up.jpg)' }}>
        <div className="auth-copy">
          <span className="eyebrow gold">Join the journey</span>
          <h2>Go further.<br /><em>Know more.</em></h2>
          <p>Create your traveler profile for personalized routes, local stories, and a smarter safari experience.</p>
          <ul className="pills"><li>Offline-ready guides</li><li>Personal trip planning</li><li>Local safety support</li></ul>
        </div>
      </div>
      <div className="auth-side"><SignUpForm /></div>
    </div>
  )
}
