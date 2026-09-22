import { useEffect, useState } from 'react'
import { hotel, ratingLabel } from '../data/hotel'
import { addDays, plural, today } from '../lib/format'
import HeroVideo from './HeroVideo'
import { Icon } from './Icons'
import { Container } from './ui'

const perks = [
  'Free cancellation up to 48 h',
  'Breakfast included',
  '200 m from the beach',
  'Best price when you book direct',
]

export default function Hero({ booking, onSearch }) {
  const [draft, setDraft] = useState(booking)

  useEffect(() => setDraft(booking), [booking])

  const update = (field, value) =>
    setDraft(current => {
      const next = { ...current, [field]: value }
      if (field === 'checkIn' && value && next.checkOut <= value) next.checkOut = addDays(value, 1)
      return next
    })

  const handleSubmit = e => {
    e.preventDefault()
    onSearch(draft)
  }

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[46rem] flex-col justify-end overflow-hidden bg-navy lg:min-h-[92svh]"
    >
      <HeroVideo />
      {/* Three stacked scrims: side wash for the text column, floor for the search card, vignette for the edges. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-navy/90 via-navy/55 to-navy/15" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-navy via-navy/30 to-navy/45" />
      <div aria-hidden="true" className="hero-vignette absolute inset-0 -z-10" />

      <Container className="on-dark flex flex-1 flex-col justify-end pt-28 pb-8 sm:pt-32 lg:pt-40">
        <p className="hero-kicker">Sopot · Baltic coast</p>

        <h1
          id="hero-title"
          className="mt-6 max-w-4xl font-display text-[3.25rem] font-normal leading-[0.98] tracking-[-0.02em] text-white sm:text-7xl lg:text-[5.5rem]"
        >
          {hotel.name}
          <span className="mt-3 block text-2xl font-normal italic leading-snug text-white/80 sm:text-3xl lg:text-4xl">
            a quiet retreat on the Baltic shore
          </span>
        </h1>

        <p className="mt-7 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
          Twenty-four sea-view rooms, a heated pool and slow breakfasts, 200 m from the beach and the Sopot pier.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href="#reservation" className="btn btn-light btn-lg">
            Book your stay
            <Icon name="arrowRight" className="size-5" />
          </a>
          <a href="#rooms" className="btn btn-ghost-light btn-lg">
            View rooms
          </a>
          <p className="ml-1 inline-flex items-center gap-2 text-sm font-medium text-white/85">
            <Icon name="star" className="size-4 fill-amber text-amber" />
            <span className="font-semibold text-white">{hotel.rating}</span>
            {ratingLabel(hotel.rating)} · {hotel.reviewCount.toLocaleString('en-GB')} reviews
          </p>
        </div>
      </Container>

      <Container className="pb-12 lg:pb-16">
        <form
          onSubmit={handleSubmit}
          aria-label="Check availability"
          className="grid gap-1 rounded-card bg-white p-2 shadow-float md:grid-cols-[1fr_1fr_0.8fr_auto] md:items-center md:rounded-full"
        >
          <SearchField icon="calendar" label="Check-in">
            <input
              type="date"
              required
              min={today()}
              value={draft.checkIn}
              onChange={e => update('checkIn', e.target.value)}
              className="search-input"
            />
          </SearchField>
          <SearchField icon="calendar" label="Check-out" divider>
            <input
              type="date"
              required
              min={draft.checkIn ? addDays(draft.checkIn, 1) : today()}
              value={draft.checkOut}
              onChange={e => update('checkOut', e.target.value)}
              className="search-input"
            />
          </SearchField>
          <SearchField icon="users" label="Guests" divider>
            <select
              value={draft.guests}
              onChange={e => update('guests', Number(e.target.value))}
              className="search-input cursor-pointer appearance-none"
            >
              {[1, 2, 3, 4].map(n => (
                <option key={n} value={n}>
                  {plural(n, 'guest')}
                </option>
              ))}
            </select>
          </SearchField>
          <button type="submit" className="btn btn-primary btn-lg mt-1 md:mt-0 md:ml-2">
            Check availability
          </button>
        </form>

        <ul className="hero-proof mt-5">
          {perks.map(perk => (
            <li key={perk}>
              <Icon name="check" className="size-4 text-amber" />
              {perk}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

function SearchField({ icon, label, divider = false, children }) {
  return (
    <label
      className={`relative flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-2.5 transition-colors focus-within:ring-2 focus-within:ring-navy hover:bg-cream md:rounded-full ${
        divider ? 'md:before:absolute md:before:inset-y-3 md:before:-left-0.5 md:before:w-px md:before:bg-line' : ''
      }`}
    >
      <Icon name={icon} className="size-5 shrink-0 text-muted" />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-xs font-semibold text-muted">{label}</span>
        {children}
      </span>
    </label>
  )
}
