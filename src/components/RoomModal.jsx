import { useEffect, useRef } from 'react'
import { formatEUR, nightsBetween, plural, stayPrice } from '../lib/format'
import { Icon } from './Icons'
import { RatingBadge } from './ui'

// Native <dialog> gives us focus trapping, Escape to close and focus restore for free.
export default function RoomModal({ room, booking, onClose, onReserve }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (room && !dialog.open) dialog.showModal()
    if (!room && dialog.open) dialog.close()
  }, [room])

  const close = () => dialogRef.current.close()
  const nights = Math.max(nightsBetween(booking.checkIn, booking.checkOut), 1)
  const fits = room ? booking.guests <= room.maxGuests : true

  const reserve = () => {
    close()
    onReserve(room.id)
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={e => e.target === dialogRef.current && close()}
      aria-labelledby="room-modal-title"
      className="m-auto w-[calc(100%-2rem)] max-w-4xl overflow-hidden rounded-card bg-white p-0 text-navy shadow-float backdrop:bg-navy/60 backdrop:backdrop-blur-sm"
    >
      {room && (
        <div className="grid max-h-[calc(100dvh-2rem)] overflow-y-auto md:grid-cols-2">
          <div className="bg-sand">
            <img src={room.image} alt={`${room.name} interior`} className="aspect-[4/3] w-full object-cover md:aspect-auto md:h-full" />
          </div>

          <div className="flex flex-col p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                {room.badge && <span className="rounded-md bg-navy px-2 py-1 text-xs font-semibold text-white">{room.badge}</span>}
                <h2 id="room-modal-title" className="mt-3 font-display text-3xl font-medium tracking-tight">
                  {room.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close room details"
                className="grid size-10 shrink-0 place-items-center rounded-full bg-cream transition-colors hover:bg-sand"
              >
                <Icon name="x" className="size-5" />
              </button>
            </div>

            <RatingBadge score={room.rating} reviews={room.reviews} className="mt-3" />
            <p className="mt-4 text-muted">{room.description}</p>

            <ul className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <li className="flex items-center gap-2">
                <Icon name="maximize" className="size-4 text-muted" />
                {room.size} m²
              </li>
              <li className="flex items-center gap-2">
                <Icon name="users" className="size-4 text-muted" />
                Up to {plural(room.maxGuests, 'guest')}
              </li>
              <li className="flex items-center gap-2">
                <Icon name="bed" className="size-4 text-muted" />
                {room.bed}
              </li>
              <li className="flex items-center gap-2">
                <Icon name="eye" className="size-4 text-muted" />
                {room.view}
              </li>
            </ul>

            <h3 className="mt-6 text-sm font-semibold">Room features</h3>
            <ul className="mt-2 grid grid-cols-2 gap-2 text-sm">
              {room.features.map(feature => (
                <li key={feature} className="flex items-center gap-2">
                  <Icon name="check" className="size-4 shrink-0 text-rating" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6">
              <div className="flex flex-wrap items-end justify-between gap-4 rounded-xl bg-cream p-4">
                <div>
                  <p className="text-sm text-muted">{formatEUR(room.price)} nightly</p>
                  <p className="text-2xl font-semibold">
                    {formatEUR(stayPrice(room.price, nights).total)}{' '}
                    <span className="text-sm font-normal text-muted">for {plural(nights, 'night')}, incl. taxes</span>
                  </p>
                </div>
                <button type="button" onClick={reserve} disabled={!fits} className="btn btn-primary">
                  Reserve this room
                </button>
              </div>
              {!fits && (
                <p className="mt-2 text-sm font-medium text-sale">
                  This room fits up to {plural(room.maxGuests, 'guest')}. Choose fewer guests or a larger room.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
