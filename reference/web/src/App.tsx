import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import CookieBanner from './components/layout/CookieBanner'
import AppRoutes from './routes'

export default function App() {
  const { pathname, hash } = useLocation()
  useEffect(() => { if (!hash) window.scrollTo(0, 0) }, [pathname, hash])
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main"><AppRoutes /></main>
      <Footer />
      <CookieBanner />
    </>
  )
}
