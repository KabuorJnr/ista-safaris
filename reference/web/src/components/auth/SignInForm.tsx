import { ThinArrow } from '../icons'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordField from './PasswordField'
import { supabase } from '../../lib/supabase'

export default function SignInForm() {
  const nav = useNavigate()
  const [email, setEmail] = useState(''); const [pw, setPw] = useState(''); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false)
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr('')
    if (!supabase) { setErr('Accounts are not connected yet. Add the Supabase keys described in the README.'); return }
    setBusy(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw })
    setBusy(false)
    if (error) setErr(error.message); else nav('/')
  }
  return (
    <form className="auth-form" onSubmit={submit}>
      <span className="eyebrow">Traveler account</span>
      <h1>Good to see you again.</h1>
      <p className="lead">Enter your details to access your ISTA companion.</p>
      <div className="fld"><label className="lbl" htmlFor="email">Email address</label>
        <input id="email" className="field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required /></div>
      <PasswordField id="pw" label="Password" value={pw} onChange={setPw} placeholder="Enter your password" autoComplete="current-password" />
      <button className="btn btn-forest submit" disabled={busy}>{busy ? 'Signing in…' : <>Sign in <ThinArrow /></>}</button>
      {err && <p className="err" role="alert">{err}</p>}
      <p className="alt">New to ISTA Safaris? <Link to="/sign-up">Create an account</Link></p>
    </form>
  )
}
