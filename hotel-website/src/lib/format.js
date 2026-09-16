import { TAX_RATE } from '../data/hotel'

const DAY_MS = 86_400_000

// Dates are handled as local "YYYY-MM-DD" strings, the same format <input type="date"> uses.
export function toISODate(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
  return local.toISOString().slice(0, 10)
}

export const today = () => toISODate(new Date())

export function addDays(iso, days) {
  const date = new Date(`${iso}T00:00:00`)
  date.setDate(date.getDate() + days)
  return toISODate(date)
}

export function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0
  const nights = Math.round((new Date(`${checkOut}T00:00:00`) - new Date(`${checkIn}T00:00:00`)) / DAY_MS)
  return nights > 0 ? nights : 0
}

const dateFormat = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
export const formatDate = iso => (iso ? dateFormat.format(new Date(`${iso}T00:00:00`)) : '')

const euro = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
export const formatEUR = amount => euro.format(amount)

export const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`

export function stayPrice(nightlyRate, nights) {
  const subtotal = nightlyRate * nights
  const taxes = Math.round(subtotal * TAX_RATE)
  return { subtotal, taxes, total: subtotal + taxes }
}
