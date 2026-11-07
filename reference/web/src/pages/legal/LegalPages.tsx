import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

function Doc({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="wrap legal-wrap">
      <div className="page-hero"><span className="eyebrow">Legal</span><h1>{title}</h1><p>Last updated: [DATE]. Items in square brackets are placeholders the operator must complete before launch.</p></div>
      <div className="legal">{children}</div>
    </div>
  )
}

export const Privacy = () => (
  <Doc title="Privacy policy">
    <h2>Who we are</h2><p>[BUSINESS NAME] ("ISTA Safaris") operates this app. Contact: [PRIVACY EMAIL]. See <Link to="/business">business details</Link>.</p>
    <h2>What we collect</h2>
    <ul><li>Account details you give us: full name, email, country, preferred language, and an optional contact number.</li><li>Your saved places and cookie choice, stored on your device.</li><li>Your location only when you press "use my location". It is used to plan a route and is not stored by us.</li></ul>
    <h2>Why we use it</h2><p>To run your account, personalise language and content, and plan routes. We do not sell your data and we do not use it for advertising.</p>
    <h2>Third parties</h2><p>Supabase hosts accounts. OpenStreetMap supplies map tiles. Nominatim and OSRM receive the place names or coordinates you search for when you request directions.</p>
    <h2>Children</h2><p>Use by anyone under 18 requires a parent or guardian's agreement.</p>
    <h2>Your rights</h2><p>You may access, correct or delete your data. Use the <Link to="/delete-my-data">data deletion page</Link> or write to [PRIVACY EMAIL]. [Add the rights and regulator for your jurisdiction, for example the Kenya Data Protection Act, 2019.]</p>
    <h2>Retention</h2><p>Account data is kept until you ask us to delete it. [Confirm retention periods.]</p>
  </Doc>
)

export const Terms = () => (
  <Doc title="Terms of service">
    <h2>Using ISTA</h2><p>ISTA Safaris is a travel guide for Taita Taveta. Information is provided in good faith and may be incomplete; distances, times and locations are estimates. Check road, park and weather conditions locally before travelling.</p>
    <h2>Your account</h2><p>Keep your password private. You must give accurate details and be 18 or older, or have a parent or guardian's agreement.</p>
    <h2>Acceptable use</h2><p>Do not misuse the service, attempt to break it, or use it unlawfully.</p>
    <h2>Liability</h2><p>[Have a qualified lawyer complete liability, governing law ([COUNTRY]) and dispute terms.]</p>
    <h2>Contact</h2><p>[SUPPORT EMAIL]</p>
  </Doc>
)

export const Refunds = () => (
  <Doc title="Refund and cancellation policy">
    <p>ISTA Safaris currently takes no payments and charges no fees, so there is nothing to refund.</p>
    <p>[If paid bookings or tours are added, set out here the price display, cancellation windows, refund timelines and how to claim.]</p>
  </Doc>
)

export const Cookies = () => (
  <Doc title="Cookie policy">
    <p>We use only essential storage: your sign in session, your saved places, and your cookie choice. We use no advertising or analytics cookies.</p>
    <p>You can clear this data in your browser settings at any time. Map tiles come from OpenStreetMap, which may receive your IP address when tiles load.</p>
  </Doc>
)

export const BusinessDetails = () => (
  <Doc title="Business details">
    <ul><li>Legal name: [BUSINESS NAME]</li><li>Registration number: [REGISTRATION NUMBER]</li><li>Registered address: [ADDRESS]</li><li>Email: [SUPPORT EMAIL]</li><li>Phone: [PHONE]</li><li>Tourism licence (if applicable): [LICENCE NUMBER]</li></ul>
  </Doc>
)
