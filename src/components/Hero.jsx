import { useEffect, useState } from 'react'
import { hotel, images, ratingLabel } from '../data/hotel'
import { addDays, plural, today } from '../lib/format'
import { Icon } from './Icons'
import { Container } from './ui'

const perks = ['Free cancellation up to 48 h', 'Breakfast included', 'Best price when you book direct']

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
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy">
      <img src={images.hero} alt="" fetchPriority="high" className="absolute inset-0 -z-10 size-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-navy/85 via-navy/50 to-navy/10" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-navy/80 via-transparent to-navy/30" />

      <Container className="on-dark pt-20 pb-10 sm:pt-28 lg:pt-36">
        <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
          <Icon name="star" className="size-4 fill-amber text-amber" />
          {hotel.rating} {ratingLabel(hotel.rating)} · {hotel.reviewCount.toLocaleString('en-GB')} guest reviews
        </p>

        <h1
          id="hero-title"
          className="mt-6 max-w-3xl font-display text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Welcome to {hotel.name}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">
          A boutique seaside hotel in Sopot, just 200 m from the Baltic beach. Sea-view rooms, a heated pool and slow
          breakfasts, at the best price when you book direct.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#reservation" className="btn btn-light btn-lg">
            Book now
            <Icon name="arrowRight" className="size-5" />
          </a>
          <a href="#rooms" className="btn btn-ghost-light btn-lg">
            View rooms
          </a>
        </div>
      </Container>

      <Container className="pb-14 lg:pb-20">
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

        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white">
          {perks.map(perk => (
            <li key={perk} className="flex items-center gap-2">
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
