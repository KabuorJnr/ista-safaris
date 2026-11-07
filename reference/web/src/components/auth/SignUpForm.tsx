import { ThinArrow } from '../icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PasswordField from './PasswordField'
import { supabase } from '../../lib/supabase'

const COUNTRIES = ['Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'Ethiopia', 'South Africa', 'Nigeria', 'United Kingdom', 'United States', 'Germany', 'France', 'Italy', 'India', 'China', 'Other']
const LANGS = ['English', 'Kiswahili', 'Français', 'Deutsch', 'Italiano', '中文']

export default function SignUpForm() {
  const [f, setF] = useState({ name: '', phone: '', email: '', country: '', lang: 'English', pw: '', pw2: '' })
  const [agree, setAgree] = useState(false)
  const [err, setErr] = useState(''); const [ok, setOk] = useState(''); const [busy, setBusy] = useState(false)
  const set = (k: keyof typeof f) => (v: string) => setF({ ...f, [k]: v })
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(''); setOk('')
    if (f.pw !== f.pw2) { setErr('The two passwords do not match.'); return }
    if (!agree) { setErr('Please tick the box to confirm your age and agree to the terms.'); return }
    if (!supabase) { setErr('Accounts are not connected yet. Add the Supabase keys described in the README.'); return }
    setBusy(true)
    const { error } = await supabase.auth.signUp({ email: f.email, password: f.pw, options: { data: { full_name: f.name, phone: f.phone, country: f.country, language: f.lang } } })
    setBusy(false)
    if (error) setErr(error.message); else setOk('Account created. Check your email to confirm your address, then sign in.')
  }
  return (
    <form className="auth-form" onSubmit={submit}>
      <span className="eyebrow">Start exploring</span>
      <h1>Create your account.</h1>
      <p className="lead">Tell us a little about you to personalize your ISTA experience.</p>
      <div className="two">
        <div className="fld"><label className="lbl" htmlFor="name">Full name</label><input id="name" className="field" value={f.name} onChange={(e) => set('name')(e.target.value)} placeholder="Your full name" autoComplete="name" required /></div>
        <div className="fld"><label className="lbl" htmlFor="phone">Contact number</label><input id="phone" className="field" type="tel" value={f.phone} onChange={(e) => set('phone')(e.target.value)} placeholder="+254 700 000 000" autoComplete="tel" /></div>
      </div>
      <div className="fld"><label className="lbl" htmlFor="em">Email address</label><input id="em" className="field" type="email" value={f.email} onChange={(e) => set('email')(e.target.value)} placeholder="you@example.com" autoComplete="email" required /></div>
      <div className="two">
        <div className="fld"><label className="lbl" htmlFor="country">Country of origin</label><select id="country" className="field" value={f.country} onChange={(e) => set('country')(e.target.value)} required><option value="">Select country</option>{COUNTRIES.map((c) => <option key={c}>{c}</option>)}</select></div>
        <div className="fld"><label className="lbl" htmlFor="lang">Preferred language</label><select id="lang" className="field" value={f.lang} onChange={(e) => set('lang')(e.target.value)}>{LANGS.map((c) => <option key={c}>{c}</option>)}</select></div>
      </div>
      <PasswordField id="pw" label="Password" value={f.pw} onChange={set('pw')} placeholder="At least 8 characters" autoComplete="new-password" />
      <div className="fld"><label className="lbl" htmlFor="pw2">Confirm password</label><input id="pw2" className="field" type="password" value={f.pw2} onChange={(e) => set('pw2')(e.target.value)} placeholder="Repeat your password" autoComplete="new-password" required minLength={8} /></div>
      <label className="check"><input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} /><span>I am 18 or older (or have a parent or guardian’s permission) and I agree to the <Link to="/terms">terms</Link> and <Link to="/privacy">privacy policy</Link>.</span></label>
      <button className="btn btn-forest submit" disabled={busy}>{busy ? 'Creating…' : <>Create my account <ThinArrow /></>}</button>
      {err && <p className="err" role="alert">{err}</p>}
      {ok && <p className="ok" role="status">{ok}</p>}
      <p className="alt">Already exploring with ISTA? <Link to="/sign-in">Sign in</Link></p>
      <p className="fine">By creating an account, you agree to ISTA’s <Link to="/terms">terms</Link> and <Link to="/privacy">privacy policy</Link>.</p>
    </form>
  )
}
