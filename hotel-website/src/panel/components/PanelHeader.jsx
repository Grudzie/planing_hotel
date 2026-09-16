import { useEffect, useRef, useState } from 'react'
import { hotel } from '../../data/hotel'
import { notifications, searchIndex } from '../data/panelData'
import { PanelIcon } from './PanelIcons'

export default function PanelHeader({ user, title, onOpenMenu }) {
  const [query, setQuery] = useState('')
  const [bellOpen, setBellOpen] = useState(false)
  const bellRef = useRef(null)
  const unread = notifications.filter(n => n.unread).length

  const matches = query.trim()
    ? searchIndex.filter(item => `${item.label} ${item.meta} ${item.type}`.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 6)
    : []

  useEffect(() => {
    if (!bellOpen) return
    const onDown = e => !bellRef.current?.contains(e.target) && setBellOpen(false)
    const onKey = e => e.key === 'Escape' && setBellOpen(false)
    document.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [bellOpen])

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open menu"
          aria-controls="panel-sidebar"
          className="grid size-10 shrink-0 place-items-center rounded-full text-navy hover:bg-cream lg:hidden"
        >
          <PanelIcon name="menu" className="size-6" />
        </button>

        <div className="min-w-0 lg:hidden">
          <p className="truncate font-display text-lg font-semibold tracking-tight">{hotel.shortName}</p>
        </div>
        <h1 className="hidden min-w-0 truncate text-lg font-semibold lg:block">{title}</h1>

        <div className="relative ml-auto w-full max-w-sm">
          <label htmlFor="panel-search" className="sr-only">
            Search reservations, guests and rooms
          </label>
          <PanelIcon name="search" className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted" />
          <input
            id="panel-search"
            type="search"
            role="combobox"
            aria-expanded={matches.length > 0}
            aria-controls="panel-search-results"
            autoComplete="off"
            placeholder="Search reservation, guest, room…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="field-input min-h-11 pl-10 text-sm"
          />
          {matches.length > 0 && (
            <ul
              id="panel-search-results"
              className="absolute inset-x-0 top-full z-10 mt-2 overflow-hidden rounded-card border border-line bg-white py-1 shadow-float"
            >
              {matches.map(item => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-cream"
                  >
                    <span className="rounded-md bg-cream px-1.5 py-0.5 text-xs font-semibold text-muted">{item.type}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{item.label}</span>
                      <span className="block truncate text-xs text-muted">{item.meta}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div ref={bellRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setBellOpen(open => !open)}
            aria-expanded={bellOpen}
            aria-label={`Notifications, ${unread} unread`}
            className="relative grid size-10 place-items-center rounded-full text-navy hover:bg-cream"
          >
            <PanelIcon name="bell" />
            {unread > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-sale text-[0.6875rem] font-semibold text-white tabular-nums">
                {unread}
              </span>
            )}
          </button>

          {bellOpen && (
            <div className="absolute right-0 top-full z-10 mt-2 w-80 overflow-hidden rounded-card border border-line bg-white shadow-float">
              <p className="border-b border-line px-4 py-3 text-sm font-semibold">Notifications</p>
              <ul className="max-h-80 divide-y divide-line overflow-y-auto">
                {notifications.map(item => (
                  <li key={item.id} className={`px-4 py-3 text-sm ${item.unread ? 'bg-cream/60' : ''}`}>
                    <div className="flex items-start gap-2">
                      {item.unread && <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-full bg-sale" />}
                      <div className="min-w-0">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-muted">{item.text}</p>
                        <p className="mt-1 text-xs text-muted">{item.time}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <span
          aria-hidden="true"
          title={user.name}
          className="grid size-10 shrink-0 place-items-center rounded-full bg-navy text-sm font-semibold text-white"
        >
          {user.initials}
        </span>
        <span className="sr-only">Signed in as {user.name}</span>
      </div>
    </header>
  )
}
