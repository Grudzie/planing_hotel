import { useEffect, useState } from 'react'
import { hotel } from '../data/hotel'
import { Icon, Logo } from './Icons'

const links = [
  { href: '#about', label: 'About' },
  { href: '#rooms', label: 'Rooms' },
  { href: '#offers', label: 'Offers' },
  { href: '#amenities', label: 'Amenities' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#location', label: 'Location' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = e => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <header className="on-dark sticky top-0 z-40 bg-navy text-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-navy"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5 rounded-lg" aria-label={`${hotel.name}, back to top`}>
          <Logo className="size-8" />
          <span className="font-display text-xl font-semibold tracking-tight">{hotel.shortName}</span>
        </a>

        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={hotel.phoneHref}
          className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-white/85 hover:text-white xl:flex"
        >
          <Icon name="phone" className="size-4" />
          {hotel.phone}
        </a>

        <a href="#reservation" className="btn btn-light btn-sm ml-auto lg:ml-0">
          Book now
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen(open => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="grid size-10 place-items-center rounded-full transition-colors hover:bg-white/10 lg:hidden"
        >
          <Icon name={menuOpen ? 'x' : 'menu'} className="size-6" />
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-white/10 lg:hidden">
          <ul className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
            {links.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-3 py-3 font-medium transition-colors hover:bg-white/10"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href={hotel.phoneHref} className="flex items-center gap-2 rounded-xl px-3 py-3 font-medium hover:bg-white/10">
                <Icon name="phone" className="size-4" />
                {hotel.phone}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
