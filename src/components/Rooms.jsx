import { useRef, useState } from 'react'
import { roomCategories, rooms } from '../data/hotel'
import { formatDate, formatEUR, nightsBetween, plural, stayPrice } from '../lib/format'
import { Icon } from './Icons'
import { Container, RatingBadge, SectionHeading } from './ui'

export default function Rooms({ booking, onReserve, onDetails }) {
  const [category, setCategory] = useState('all')
  const tabRefs = useRef([])

  const nights = Math.max(nightsBetween(booking.checkIn, booking.checkOut), 1)
  const visibleRooms = category === 'all' ? rooms : rooms.filter(room => room.category === category)

  // Arrow-key navigation between tabs (WAI-ARIA tabs pattern)
  const handleTabKey = (e, index) => {
    const last = roomCategories.length - 1
    const nextIndex = { ArrowRight: index === last ? 0 : index + 1, ArrowLeft: index === 0 ? last : index - 1, Home: 0, End: last }[e.key]
    if (nextIndex === undefined) return
    e.preventDefault()
    setCategory(roomCategories[nextIndex].id)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <section id="rooms" tabIndex={-1} aria-labelledby="rooms-title" className="bg-cream py-20 outline-none sm:py-24">
      <Container>
        <SectionHeading
          id="rooms-title"
          eyebrow="Rooms & suites"
          title="Find your perfect room"
          subtitle={`Prices for ${formatDate(booking.checkIn)} – ${formatDate(booking.checkOut)} · ${plural(nights, 'night')} · ${plural(booking.guests, 'guest')}`}
        >
          <a href="#top" className="btn btn-outline btn-sm self-start sm:self-auto">
            <Icon name="calendar" className="size-4" />
            Change dates
          </a>
        </SectionHeading>

        <div role="tablist" aria-label="Room type" className="mt-8 flex overflow-x-auto border-b border-line">
          {roomCategories.map((item, index) => {
            const selected = item.id === category
            return (
              <button
                key={item.id}
                ref={el => (tabRefs.current[index] = el)}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={selected}
                aria-controls="rooms-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setCategory(item.id)}
                onKeyDown={e => handleTabKey(e, index)}
                className={`relative shrink-0 px-4 py-3 text-sm font-semibold transition-colors ${selected ? 'text-navy' : 'text-muted hover:text-navy'}`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 bottom-0 h-0.5 rounded-full ${selected ? 'bg-navy' : 'bg-transparent'}`}
                />
              </button>
            )
          })}
        </div>

        <div id="rooms-panel" role="tabpanel" aria-labelledby={`tab-${category}`} className="mt-8">
          {visibleRooms.length === 0 ? (
            <p className="rounded-card bg-white p-10 text-center text-muted">No rooms in this category right now.</p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleRooms.map(room => (
                <li key={room.id}>
                  <RoomCard room={room} nights={nights} guests={booking.guests} onReserve={onReserve} onDetails={onDetails} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  )
}

function RoomCard({ room, nights, guests, onReserve, onDetails }) {
  const [saved, setSaved] = useState(false)
  const { total } = stayPrice(room.price, nights)
  const oldTotal = room.oldPrice ? stayPrice(room.oldPrice, nights).total : null
  const fits = guests <= room.maxGuests

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card transition-shadow duration-200 hover:shadow-float">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <img
          src={room.image}
          alt={`${room.name} interior`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />
        {room.badge && (
          <span className="absolute left-3 top-3 rounded-md bg-navy px-2 py-1 text-xs font-semibold text-white">{room.badge}</span>
        )}
        <button
          type="button"
          aria-pressed={saved}
          aria-label={`Save ${room.name} to favourites`}
          onClick={() => setSaved(value => !value)}
          className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-white text-sale shadow-card transition-transform hover:scale-110"
        >
          <Icon name="heart" className={`size-5 ${saved ? 'fill-sale' : ''}`} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug">{room.name}</h3>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          <li className="flex items-center gap-1.5">
            <Icon name="maximize" className="size-4" />
            {room.size} m²
          </li>
          <li className="flex items-center gap-1.5">
            <Icon name="users" className="size-4" />
            Up to {room.maxGuests}
          </li>
          <li className="flex items-center gap-1.5">
            <Icon name="bed" className="size-4" />
            {room.bed}
          </li>
        </ul>
        <RatingBadge score={room.rating} reviews={room.reviews} className="mt-3" />

        <div className="mt-auto pt-5">
          {room.oldPrice && (
            <span className="inline-block rounded-md bg-sale px-2 py-0.5 text-xs font-semibold text-white">
              Book direct · {Math.round((1 - room.price / room.oldPrice) * 100)}% off
            </span>
          )}
          <p className="mt-2 text-sm">{formatEUR(room.price)} nightly</p>
          <p className="text-xl font-semibold">
            {formatEUR(total)} total{' '}
            {oldTotal && (
              <s className="text-sm font-normal text-muted">
                <span className="sr-only">was </span>
                {formatEUR(oldTotal)}
              </s>
            )}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-rating">
            <Icon name="check" className="size-4" />
            {plural(nights, 'night')}, incl. taxes & breakfast
          </p>
          {!fits && (
            <p className="mt-2 text-sm font-medium text-sale">
              Fits up to {plural(room.maxGuests, 'guest')}. You searched for {guests}.
            </p>
          )}

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => onDetails(room)} className="btn btn-outline btn-sm">
              View details
            </button>
            <button type="button" onClick={() => onReserve(room.id)} disabled={!fits} className="btn btn-primary btn-sm">
              Reserve
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
