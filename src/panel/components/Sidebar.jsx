import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router'
import { Logo } from '../../components/Icons'
import { hotel } from '../../data/hotel'
import { navItems } from '../data/panelData'
import { PanelIcon } from './PanelIcons'

export default function Sidebar({ user, onSignOut, open, onClose }) {
  const panelRef = useRef(null)

  // Mobile drawer: Escape closes, focus moves into the drawer
  useEffect(() => {
    if (!open) return
    const onKey = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    panelRef.current?.querySelector('a, button')?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-navy/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        ref={panelRef}
        id="panel-sidebar"
        className={`on-dark fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-navy text-white transition-transform duration-200 motion-reduce:transition-none lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 shrink-0 items-center gap-2.5 px-5">
          <Logo className="size-8" />
          <span className="font-display text-lg font-semibold tracking-tight">{hotel.shortName}</span>
          <span className="rounded-md bg-white/15 px-1.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wide">PMS</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="ml-auto grid size-9 place-items-center rounded-full hover:bg-white/10 lg:hidden"
          >
            <PanelIcon name="x" />
          </button>
        </div>

        <nav aria-label="Panel sections" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navItems.map(item => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive ? 'bg-white text-navy' : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <PanelIcon name={item.icon} className="size-5 shrink-0" />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums ${
                            isActive ? 'bg-navy text-white' : 'bg-white/15 text-white'
                          }`}
                        >
                          {item.badge}
                          <span className="sr-only"> open items</span>
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sticky bottom-0 shrink-0 border-t border-white/15 bg-navy p-4">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-amber font-semibold text-navy">
              {user.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className="truncate text-xs text-white/70">{user.role}</p>
              <p className="truncate text-xs text-white/55">@{user.username}</p>
            </div>
          </div>
          <button type="button" onClick={onSignOut} className="btn btn-ghost-light btn-sm mt-3 w-full">
            <PanelIcon name="logout" className="size-4" />
            Log out
          </button>
        </div>
      </aside>
    </>
  )
}
