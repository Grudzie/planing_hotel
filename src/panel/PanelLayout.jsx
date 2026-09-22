import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { navItems } from './data/panelData'
import PanelHeader from './components/PanelHeader'
import Sidebar from './components/Sidebar'

export default function PanelLayout({ user, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const current = navItems.find(item => (item.end ? location.pathname === item.to : location.pathname.startsWith(item.to)))
  const title = current?.label ?? 'Dashboard'

  useEffect(() => {
    document.title = `${title} · Amber Bay PMS`
  }, [title])

  const signOut = () => {
    onSignOut()
    navigate('/panel/login')
  }

  return (
    <div className="min-h-dvh bg-cream">
      <Sidebar user={user} onSignOut={signOut} open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="lg:pl-72">
        <PanelHeader user={user} title={title} onOpenMenu={() => setMenuOpen(true)} />
        <main id="panel-main" tabIndex={-1} className="px-4 py-6 outline-none sm:px-6 sm:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
