import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DirectionsPage from './pages/DirectionsPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import { Privacy, Terms, Refunds, Cookies, BusinessDetails } from './pages/legal/LegalPages'
import DeleteMyData from './pages/legal/DeleteMyData'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/directions" element={<DirectionsPage />} />
      <Route path="/taita-taveta" element={<Navigate to="/#regional-map" replace />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/refunds" element={<Refunds />} />
      <Route path="/cookies" element={<Cookies />} />
      <Route path="/business" element={<BusinessDetails />} />
      <Route path="/delete-my-data" element={<DeleteMyData />} />
      <Route path="*" element={<div className="wrap page-hero"><h1>Page not found</h1><p>That page does not exist. Try the Explore page.</p></div>} />
    </Routes>
  )
}
