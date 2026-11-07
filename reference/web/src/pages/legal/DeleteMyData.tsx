import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../lib/AuthContext'
import { saved } from '../../lib/consent'

export default function DeleteMyData() {
  const { session } = useAuth()
  const [msg, setMsg] = useState(''); const [err, setErr] = useState('')
  const clearLocal = () => { try { localStorage.clear() } catch { /* ignore */ } setMsg('Data saved on this device was cleared.') }
  void saved
  const request = async () => {
    setErr(''); setMsg('')
    if (!supabase || !session) { setErr('Sign in to send a deletion request, or email [PRIVACY EMAIL].'); return }
    const { error } = await supabase.from('deletion_requests').insert({ user_id: session.user.id })
    if (error) setErr(error.message); else setMsg('Your request was received. We will delete your account data within [30] days and confirm by email.')
  }
  return (
    <div className="wrap legal-wrap">
      <div className="page-hero"><span className="eyebrow">Your data</span><h1>Delete my data</h1><p>You can ask us to delete your account and the details we hold about you.</p></div>
      <div className="legal">
        <h2>Account data</h2>
        {session ? <button className="btn btn-terra" onClick={request}>Request deletion of my account data</button> : <p><Link to="/sign-in">Sign in</Link> to send a request, or email [PRIVACY EMAIL].</p>}
        <h2>This device</h2><p>Clear saved places and your cookie choice stored in this browser.</p>
        <button className="btn btn-forest" onClick={clearLocal}>Clear data on this device</button>
        {err && <p className="err" role="alert">{err}</p>}
        {msg && <div className="ok" role="status">{msg}</div>}
      </div>
    </div>
  )
}
