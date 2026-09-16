import { hotel } from '../data/hotel'
import { Logo } from './Icons'
import { Container } from './ui'

const columns = [
  {
    title: 'Hotel',
    links: [
      { href: '#about', label: 'About us' },
      { href: '#rooms', label: 'Rooms & suites' },
      { href: '#amenities', label: 'Amenities' },
      { href: '#reviews', label: 'Guest reviews' },
    ],
  },
  {
    title: 'Plan your stay',
    links: [
      { href: '#reservation', label: 'Reserve online' },
      { href: '#offers', label: 'Special offers' },
      { href: '#location', label: 'Location & directions' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="on-dark bg-navy text-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <a href="#top" className="inline-flex items-center gap-2.5 rounded-lg">
            <Logo className="size-9" />
            <span className="font-display text-2xl font-semibold tracking-tight">{hotel.name}</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">
            A boutique seaside hotel in Sopot, 200 m from the Baltic beach.
          </p>
          <a href="#reservation" className="btn btn-light btn-sm mt-6">
            Book now
          </a>
        </div>

        {columns.map(column => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="text-sm font-semibold">{column.title}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {column.links.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/75 underline-offset-4 hover:text-white hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="text-sm font-semibold">Contact</h2>
          <address className="mt-4 space-y-3 text-sm not-italic text-white/75">
            <p>{hotel.address}</p>
            <p>
              <a href={hotel.phoneHref} className="hover:text-white hover:underline">
                {hotel.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${hotel.email}`} className="hover:text-white hover:underline">
                {hotel.email}
              </a>
            </p>
          </address>
        </div>
      </Container>

      <div className="border-t border-white/15">
        <Container className="flex flex-col gap-2 py-6 text-xs text-white/65 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {hotel.name}. All rights reserved.
          </p>
          <p>
            Photos from Unsplash · Placeholder content ·{' '}
            <a href="/panel/login" className="underline underline-offset-4 hover:text-white">
              Staff login
            </a>
          </p>
        </Container>
      </div>
    </footer>
  )
}
