import { useEffect, useRef, useState } from 'react'
import { hotel, packages, rooms } from '../data/hotel'
import { addDays, formatDate, formatEUR, nightsBetween, plural, stayPrice, today } from '../lib/format'
import { Icon } from './Icons'
import { Container, RatingBadge, SectionHeading } from './ui'

const emptyGuest = { firstName: '', lastName: '', email: '', phone: '', requests: '', agree: false }

// Order used to focus the first invalid field after submit
const FIELD_ORDER = ['checkIn', 'checkOut', 'roomId', 'firstName', 'lastName', 'email', 'phone', 'agree']

function validate(booking, guest) {
  const errors = {}
  const room = rooms.find(r => r.id === booking.roomId)

  if (!booking.checkIn) errors.checkIn = 'Choose your check-in date.'
  else if (booking.checkIn < today()) errors.checkIn = 'Check-in can’t be in the past.'
  if (!booking.checkOut) errors.checkOut = 'Choose your check-out date.'
  else if (booking.checkIn && booking.checkOut <= booking.checkIn) errors.checkOut = 'Check-out must be after check-in.'

  if (!room) errors.roomId = 'Choose a room.'
  else if (booking.guests > room.maxGuests)
    errors.roomId = `This room fits up to ${plural(room.maxGuests, 'guest')}. Choose a larger room or fewer guests.`

  if (!guest.firstName.trim()) errors.firstName = 'Enter your first name.'
  if (!guest.lastName.trim()) errors.lastName = 'Enter your last name.'
  if (!guest.email.trim()) errors.email = 'Enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guest.email.trim())) errors.email = 'Enter a valid email, like name@example.com.'
  if (!guest.phone.trim()) errors.phone = 'Enter your phone number.'
  else if (!/^\+?[\d\s()-]{7,}$/.test(guest.phone.trim())) errors.phone = 'Enter a valid phone number, like +48 600 000 000.'
  if (!guest.agree) errors.agree = 'Please accept the booking terms to continue.'

  return errors
}

export default function Reservation({ booking, setBooking }) {
  const [guest, setGuest] = useState(emptyGuest)
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState('idle') // idle | loading | success
  const [confirmation, setConfirmation] = useState(null)

  // Errors show only after the first submit attempt, then update live as the guest types
  const errors = submitted ? validate(booking, guest) : {}
  const errorCount = Object.keys(errors).length

  const setStay = (field, value) =>
    setBooking(current => {
      const next = { ...current, [field]: value }
      if (field === 'checkIn' && value && next.checkOut <= value) next.checkOut = addDays(value, 1)
      return next
    })
  const setGuestField = (field, value) => setGuest(current => ({ ...current, [field]: value }))

  const fieldProps = name => ({
    id: `res-${name}`,
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `res-${name}-error` : undefined,
  })

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
    const found = validate(booking, guest)
    const firstInvalid = FIELD_ORDER.find(field => found[field])
    if (firstInvalid) {
      document.getElementById(`res-${firstInvalid}`)?.focus()
      return
    }

    setStatus('loading')
    // Demo only: replace this timeout with a request to your booking API.
    setTimeout(() => {
      setConfirmation({
        code: `AB-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
        name: guest.firstName.trim(),
        email: guest.email.trim(),
        booking: { ...booking },
      })
      setStatus('success')
    }, 1000)
  }

  const startOver = () => {
    setGuest(emptyGuest)
    setSubmitted(false)
    setConfirmation(null)
    setStatus('idle')
  }

  return (
    <section id="reservation" tabIndex={-1} aria-labelledby="reservation-title" className="bg-cream py-20 outline-none sm:py-24">
      <Container>
        <SectionHeading
          id="reservation-title"
          eyebrow="Online reservation"
          title="Reserve your stay"
          subtitle="Best price guaranteed. No payment needed now, you pay at the hotel."
        />

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="rounded-card bg-white p-5 shadow-card sm:p-8">
            {status === 'success' ? (
              <Confirmation data={confirmation} onStartOver={startOver} />
            ) : (
              <form noValidate onSubmit={handleSubmit}>
                {submitted && errorCount > 0 && (
                  <div role="alert" className="mb-6 flex gap-3 rounded-xl border border-sale/30 bg-sale/5 p-4 text-sm font-medium text-sale">
                    <Icon name="alert" className="size-5 shrink-0" />
                    Please fix {plural(errorCount, 'field')} below to continue.
                  </div>
                )}

                <fieldset>
                  <legend className="flex items-center gap-3 text-lg font-semibold">
                    <StepNumber n={1} />
                    Your stay
                  </legend>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <Field name="checkIn" label="Check-in" error={errors.checkIn}>
                      <input
                        type="date"
                        min={today()}
                        value={booking.checkIn}
                        onChange={e => setStay('checkIn', e.target.value)}
                        className="field-input"
                        {...fieldProps('checkIn')}
                      />
                    </Field>
                    <Field name="checkOut" label="Check-out" error={errors.checkOut}>
                      <input
                        type="date"
                        min={booking.checkIn ? addDays(booking.checkIn, 1) : today()}
                        value={booking.checkOut}
                        onChange={e => setStay('checkOut', e.target.value)}
                        className="field-input"
                        {...fieldProps('checkOut')}
                      />
                    </Field>
                    <Field name="roomId" label="Room" error={errors.roomId}>
                      <select value={booking.roomId} onChange={e => setStay('roomId', e.target.value)} className="field-input" {...fieldProps('roomId')}>
                        {rooms.map(room => (
                          <option key={room.id} value={room.id}>
                            {room.name} · {formatEUR(room.price)}/night · up to {room.maxGuests}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field name="guests" label="Guests">
                      <select
                        value={booking.guests}
                        onChange={e => setStay('guests', Number(e.target.value))}
                        className="field-input"
                        {...fieldProps('guests')}
                      >
                        {[1, 2, 3, 4].map(n => (
                          <option key={n} value={n}>
                            {plural(n, 'guest')}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </fieldset>

                <fieldset className="mt-10">
                  <legend className="flex items-center gap-3 text-lg font-semibold">
                    <StepNumber n={2} />
                    Guest details
                  </legend>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <Field name="firstName" label="First name" error={errors.firstName}>
                      <input
                        type="text"
                        autoComplete="given-name"
                        value={guest.firstName}
                        onChange={e => setGuestField('firstName', e.target.value)}
                        className="field-input"
                        {...fieldProps('firstName')}
                      />
                    </Field>
                    <Field name="lastName" label="Last name" error={errors.lastName}>
                      <input
                        type="text"
                        autoComplete="family-name"
                        value={guest.lastName}
                        onChange={e => setGuestField('lastName', e.target.value)}
                        className="field-input"
                        {...fieldProps('lastName')}
                      />
                    </Field>
                    <Field name="email" label="Email" error={errors.email}>
                      <input
                        type="email"
                        autoComplete="email"
                        placeholder="name@example.com"
                        value={guest.email}
                        onChange={e => setGuestField('email', e.target.value)}
                        className="field-input"
                        {...fieldProps('email')}
                      />
                    </Field>
                    <Field name="phone" label="Phone" error={errors.phone}>
                      <input
                        type="tel"
                        autoComplete="tel"
                        placeholder="+48 600 000 000"
                        value={guest.phone}
                        onChange={e => setGuestField('phone', e.target.value)}
                        className="field-input"
                        {...fieldProps('phone')}
                      />
                    </Field>
                    <Field name="requests" label="Special requests" optional className="sm:col-span-2">
                      <textarea
                        rows={3}
                        placeholder="E.g. late arrival, extra pillows, dietary needs"
                        value={guest.requests}
                        onChange={e => setGuestField('requests', e.target.value)}
                        className="field-input resize-y"
                        {...fieldProps('requests')}
                      />
                    </Field>
                  </div>
                </fieldset>

                <div className="mt-6">
                  <label htmlFor="res-agree" className="flex cursor-pointer items-start gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={guest.agree}
                      onChange={e => setGuestField('agree', e.target.checked)}
                      className="mt-0.5 size-5 shrink-0 cursor-pointer accent-navy"
                      {...fieldProps('agree')}
                    />
                    I agree to the booking terms and privacy policy.
                  </label>
                  {errors.agree && <ErrorText name="agree">{errors.agree}</ErrorText>}
                </div>

                <div className="mt-8 flex flex-col-reverse gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex items-center gap-2 text-sm text-muted">
                    <Icon name="shield" className="size-5 text-rating" />
                    Secure booking · Demo form, no data is sent
                  </p>
                  <button type="submit" disabled={status === 'loading'} aria-busy={status === 'loading'} className="btn btn-primary btn-lg">
                    {status === 'loading' ? (
                      <>
                        <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Confirming…
                      </>
                    ) : (
                      'Confirm reservation'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          <BookingSummary booking={booking} setBooking={setBooking} />
        </div>
      </Container>
    </section>
  )
}

function BookingSummary({ booking, setBooking }) {
  const room = rooms.find(r => r.id === booking.roomId)
  const nights = nightsBetween(booking.checkIn, booking.checkOut)
  const selectedPackage = packages.find(p => p.id === booking.packageId)
  const price = room && nights ? stayPrice(room.price, nights) : null
  const savings = price && room.oldPrice ? stayPrice(room.oldPrice, nights).total - price.total : 0

  return (
    <aside aria-labelledby="summary-title" className="overflow-hidden rounded-card bg-white shadow-card lg:sticky lg:top-24">
      {room && <img src={room.image} alt="" className="aspect-[16/9] w-full bg-sand object-cover" />}
      <div className="p-5 sm:p-6">
        <h3 id="summary-title" className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
          Your booking
        </h3>
        {room && (
          <>
            <p className="mt-2 text-xl font-semibold">{room.name}</p>
            <RatingBadge score={room.rating} reviews={room.reviews} className="mt-2" />
          </>
        )}

        {selectedPackage && (
          <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-amber bg-amber/10 px-3 py-2 text-sm">
            <span>
              <span className="font-semibold">{selectedPackage.title}</span> package · save {selectedPackage.save}% at check-in
            </span>
            <button
              type="button"
              onClick={() => setBooking(current => ({ ...current, packageId: null }))}
              aria-label={`Remove ${selectedPackage.title} package`}
              className="grid size-8 shrink-0 place-items-center rounded-full hover:bg-amber/20"
            >
              <Icon name="x" className="size-4" />
            </button>
          </div>
        )}

        <dl className="mt-5 grid grid-cols-2 gap-4 rounded-xl bg-cream p-4 text-sm">
          <div>
            <dt className="text-muted">Check-in</dt>
            <dd className="font-semibold">{formatDate(booking.checkIn) || '—'}</dd>
            <dd className="text-muted">from {hotel.checkInTime}</dd>
          </div>
          <div>
            <dt className="text-muted">Check-out</dt>
            <dd className="font-semibold">{formatDate(booking.checkOut) || '—'}</dd>
            <dd className="text-muted">until {hotel.checkOutTime}</dd>
          </div>
          <div>
            <dt className="text-muted">Length of stay</dt>
            <dd className="font-semibold">{nights ? plural(nights, 'night') : '—'}</dd>
          </div>
          <div>
            <dt className="text-muted">Guests</dt>
            <dd className="font-semibold">{plural(booking.guests, 'guest')}</dd>
          </div>
        </dl>

        {price ? (
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt>
                {formatEUR(room.price)} × {plural(nights, 'night')}
              </dt>
              <dd className="tabular-nums">{formatEUR(price.subtotal)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Taxes & fees (8%)</dt>
              <dd className="tabular-nums">{formatEUR(price.taxes)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-line pt-3">
              <dt className="font-semibold">Total</dt>
              <dd className="text-2xl font-semibold tabular-nums">{formatEUR(price.total)}</dd>
            </div>
            {savings > 0 && (
              <p className="rounded-lg bg-rating/10 px-3 py-2 font-medium text-rating">
                You save {formatEUR(savings)} by booking direct
              </p>
            )}
          </dl>
        ) : (
          <p className="mt-5 rounded-xl border border-dashed border-line p-4 text-sm text-muted">
            Choose valid dates and a room to see your total price.
          </p>
        )}

        <ul className="mt-5 space-y-2 text-sm">
          {['Free cancellation up to 48 h before arrival', 'Breakfast included', 'Pay at the hotel, no deposit'].map(item => (
            <li key={item} className="flex items-center gap-2">
              <Icon name="check" className="size-4 shrink-0 text-rating" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

function Confirmation({ data, onStartOver }) {
  const headingRef = useRef(null)
  const room = rooms.find(r => r.id === data.booking.roomId)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div className="py-6 text-center sm:py-10">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-rating text-white">
        <Icon name="check" className="size-8" />
      </span>
      <h3 ref={headingRef} tabIndex={-1} className="mt-6 font-display text-3xl font-medium tracking-tight outline-none">
        Thank you, {data.name}!
      </h3>
      <p className="mx-auto mt-3 max-w-md text-muted">
        Your reservation is confirmed. We’ve sent the details to <strong className="text-navy">{data.email}</strong>.
      </p>
      <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm">
        Booking reference <strong className="tracking-wider">{data.code}</strong>
      </p>

      <dl className="mx-auto mt-8 grid max-w-lg gap-4 text-left text-sm sm:grid-cols-3">
        <div className="rounded-xl border border-line p-4">
          <dt className="text-muted">Room</dt>
          <dd className="mt-1 font-semibold">{room?.name}</dd>
        </div>
        <div className="rounded-xl border border-line p-4">
          <dt className="text-muted">Dates</dt>
          <dd className="mt-1 font-semibold">
            {formatDate(data.booking.checkIn)} – {formatDate(data.booking.checkOut)}
          </dd>
        </div>
        <div className="rounded-xl border border-line p-4">
          <dt className="text-muted">Guests</dt>
          <dd className="mt-1 font-semibold">{plural(data.booking.guests, 'guest')}</dd>
        </div>
      </dl>

      <p className="mt-6 text-xs text-muted">Demo mode: no email was actually sent and nothing was stored.</p>
      <button type="button" onClick={onStartOver} className="btn btn-outline mt-6">
        Make another reservation
      </button>
    </div>
  )
}

function Field({ name, label, error, optional = false, className = '', children }) {
  return (
    <div className={className}>
      <label htmlFor={`res-${name}`} className="field-label">
        {label}
        {optional && <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {children}
      {error && <ErrorText name={name}>{error}</ErrorText>}
    </div>
  )
}

function ErrorText({ name, children }) {
  return (
    <p id={`res-${name}-error`} className="field-error">
      <Icon name="alert" className="mt-px size-4 shrink-0" />
      {children}
    </p>
  )
}

function StepNumber({ n }) {
  return (
    <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-navy text-sm font-semibold text-white">
      {n}
    </span>
  )
}
