import { useState } from 'react'
import { Link } from 'react-router'
import { formatEUR } from '../../lib/format'
import { OccupancyRing, Sparkline, StatusBar, WeekBars } from '../components/Charts'
import { PanelIcon } from '../components/PanelIcons'
import { arrivals as initialArrivals, departures as initialDepartures, kpis, occupancy, revenueTrend, roomStatus, tasks as initialTasks } from '../data/panelData'

const arrivalStatus = {
  confirmed: { label: 'Confirmed', icon: 'clock', className: 'bg-cream text-navy' },
  guaranteed: { label: 'Guaranteed', icon: 'check', className: 'bg-cream text-navy' },
  'checked-in': { label: 'Checked in', icon: 'check', className: 'bg-rating/10 text-rating' },
}

const departureStatus = {
  pending: { label: 'Due out', icon: 'clock', className: 'bg-cream text-navy' },
  'late-checkout': { label: 'Late check-out', icon: 'clock', className: 'bg-amber/15 text-navy' },
  'checked-out': { label: 'Checked out', icon: 'check', className: 'bg-rating/10 text-rating' },
}

const priorityStyles = {
  high: 'bg-sale/10 text-sale',
  normal: 'bg-cream text-navy',
  low: 'bg-cream text-muted',
}

// Labels for the last N days, ending today
function lastDays(count) {
  const format = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' })
  return Array.from({ length: count }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (count - 1 - i))
    return format.format(date)
  })
}

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard({ user }) {
  const [arrivals, setArrivals] = useState(initialArrivals)
  const [departures, setDepartures] = useState(initialDepartures)
  const [tasks, setTasks] = useState(initialTasks)

  const today = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())
  const todayIndex = occupancy.week.findIndex(d => d.day === new Intl.DateTimeFormat('en-GB', { weekday: 'short' }).format(new Date()))
  const revenueLabels = lastDays(revenueTrend.length)
  const readyRooms = roomStatus.find(s => s.id === 'free')?.count ?? 0
  const openTasks = tasks.filter(t => !t.done).length

  const checkIn = id => setArrivals(list => list.map(a => (a.id === id ? { ...a, status: 'checked-in' } : a)))
  const checkOut = id => setDepartures(list => list.map(d => (d.id === id ? { ...d, status: 'checked-out', balance: 0 } : d)))
  const toggleTask = id => setTasks(list => list.map(t => (t.id === id ? { ...t, done: !t.done } : t)))

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted">{today}</p>
          <h2 className="mt-1 font-display text-3xl font-medium tracking-tight sm:text-4xl">
            {greeting()}, {user.name.split(' ')[0]}
          </h2>
          <p className="mt-1 text-sm text-muted">{user.shift}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/panel/front-desk" className="btn btn-outline btn-sm">
            <PanelIcon name="key" className="size-4" />
            Check in guest
          </Link>
          <Link to="/panel/reservations" className="btn btn-primary btn-sm">
            <PanelIcon name="plus" className="size-4" />
            New reservation
          </Link>
        </div>
      </div>

      <section aria-label="Today at a glance" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map(kpi => {
          const up = kpi.trend >= 0
          const trendColor = kpi.tone === 'navy' ? 'text-muted' : up ? 'text-rating' : 'text-sale'
          return (
            <article key={kpi.id} className="rounded-card bg-white p-5 shadow-card">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-medium text-muted">{kpi.label}</h3>
                <span className="grid size-9 place-items-center rounded-xl bg-cream text-navy">
                  <PanelIcon name={kpi.icon} className="size-5" />
                </span>
              </div>
              <p className="mt-3 text-3xl font-semibold tabular-nums">{kpi.currency ? formatEUR(kpi.value) : kpi.value}</p>
              <p className="mt-2 flex flex-wrap items-center gap-x-2 text-sm">
                <span className={`inline-flex items-center gap-1 font-semibold tabular-nums ${trendColor}`}>
                  <PanelIcon name={up ? 'arrowUp' : 'arrowDown'} className="size-3.5" />
                  {up ? '+' : ''}
                  {kpi.trend}
                  {kpi.currency ? '%' : ''}
                  <span className="sr-only"> compared with yesterday</span>
                </span>
                <span className="text-muted">{kpi.sub}</span>
              </p>
            </article>
          )
        })}
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card title="Occupancy" subtitle="Today and 7-day forecast" className="xl:col-span-2">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center">
            <div className="flex flex-col items-center">
              <OccupancyRing value={occupancy.today} label="Occupancy today" />
              <p className="mt-3 text-sm text-muted">
                <span className="font-semibold text-navy">{occupancy.rooms.occupied}</span> of {occupancy.rooms.total} rooms
              </p>
            </div>
            <WeekBars data={occupancy.week} highlightIndex={todayIndex} caption="Occupancy forecast for this week, percent of rooms" />
          </div>
        </Card>

        <Card title="Room status" subtitle={`${occupancy.rooms.total} rooms in total`} action={<CardLink to="/panel/rooms">All rooms</CardLink>}>
          <p className="mb-5 flex items-baseline gap-2">
            <span className="text-4xl font-semibold tabular-nums text-st-free">{readyRooms}</span>
            <span className="text-sm text-muted">rooms ready to sell tonight</span>
          </p>
          <StatusBar segments={roomStatus} />
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card
          title="Today's arrivals"
          subtitle={`${arrivals.filter(a => a.status !== 'checked-in').length} still to check in`}
          className="xl:col-span-2"
          action={<CardLink to="/panel/front-desk">Front desk</CardLink>}
        >
          <div aria-hidden="true" className="hidden grid-cols-[1.6fr_1.2fr_0.6fr_1fr_7rem] gap-4 border-b border-line pb-2 text-xs font-semibold uppercase tracking-wide text-muted md:grid">
            <span>Guest</span>
            <span>Room</span>
            <span>ETA</span>
            <span>Status</span>
            <span className="text-right">Action</span>
          </div>
          <ul className="divide-y divide-line">
            {arrivals.map(arrival => {
              const status = arrivalStatus[arrival.status]
              const done = arrival.status === 'checked-in'
              return (
                <li key={arrival.id} className="grid gap-2 py-3 md:grid-cols-[1.6fr_1.2fr_0.6fr_1fr_7rem] md:items-center md:gap-4">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{arrival.guest}</p>
                    <p className="truncate text-xs text-muted">
                      {arrival.id}
                      {arrival.note && ` · ${arrival.note}`}
                    </p>
                  </div>
                  <p className="text-sm">
                    <span className="font-semibold">Room {arrival.room}</span>
                    <span className="block text-xs text-muted">
                      {arrival.type} · {arrival.nights} {arrival.nights === 1 ? 'night' : 'nights'} · {arrival.guests} guests
                    </span>
                  </p>
                  <p className="text-sm tabular-nums">
                    <span className="text-muted md:hidden">ETA </span>
                    {arrival.eta}
                  </p>
                  <StatusPill {...status} />
                  <div className="md:text-right">
                    <button
                      type="button"
                      onClick={() => checkIn(arrival.id)}
                      disabled={done}
                      aria-label={done ? `${arrival.guest} checked in` : `Check in ${arrival.guest}`}
                      className="btn btn-outline btn-sm w-full md:w-auto"
                    >
                      {done ? 'Done' : 'Check in'}
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </Card>

        <Card title="Revenue" subtitle={`Last ${revenueTrend.length} days`} action={<CardLink to="/panel/reports">Reports</CardLink>}>
          <p className="text-3xl font-semibold tabular-nums">{formatEUR(revenueTrend.reduce((sum, v) => sum + v, 0))}</p>
          <p className="mb-6 mt-1 text-sm text-muted">
            <span className="font-semibold text-rating">+12%</span> vs previous {revenueTrend.length} days
          </p>
          <Sparkline data={revenueTrend} labels={revenueLabels} format={formatEUR} caption="Daily revenue for the last 12 days" />
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Departures" subtitle={`${departures.filter(d => d.status !== 'checked-out').length} still to check out`}>
          <ul className="divide-y divide-line">
            {departures.map(departure => {
              const status = departureStatus[departure.status]
              const done = departure.status === 'checked-out'
              return (
                <li key={departure.id} className="flex flex-wrap items-center gap-3 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{departure.guest}</p>
                    <p className="text-xs text-muted">
                      Room {departure.room} · out by {departure.out}
                    </p>
                  </div>
                  {departure.balance > 0 && (
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-sale">
                      <PanelIcon name="alert" className="size-4" />
                      {formatEUR(departure.balance)} due
                    </span>
                  )}
                  <StatusPill {...status} />
                  {!done && (
                    <button type="button" onClick={() => checkOut(departure.id)} className="btn btn-outline btn-sm" aria-label={`Check out ${departure.guest}`}>
                      Check out
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        </Card>

        <Card title="Tasks" subtitle={`${openTasks} of ${tasks.length} open`}>
          <ul className="space-y-2">
            {tasks.map(task => (
              <li key={task.id}>
                <label className="flex cursor-pointer items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-cream">
                  <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} className="mt-0.5 size-5 shrink-0 cursor-pointer accent-navy" />
                  <span className="min-w-0 flex-1">
                    <span className={`block text-sm ${task.done ? 'text-muted line-through' : 'font-medium'}`}>{task.text}</span>
                    <span className="mt-1 flex items-center gap-2 text-xs text-muted">
                      <span className={`rounded-md px-1.5 py-0.5 font-semibold capitalize ${priorityStyles[task.priority]}`}>{task.priority}</span>
                      {task.due}
                    </span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}

function Card({ title, subtitle, action, className = '', children }) {
  return (
    <section className={`rounded-card bg-white p-5 shadow-card sm:p-6 ${className}`}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

function CardLink({ to, children }) {
  return (
    <Link to={to} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-navy hover:underline">
      {children}
      <PanelIcon name="chevronRight" className="size-4" />
    </Link>
  )
}

function StatusPill({ label, icon, className }) {
  return (
    <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>
      <PanelIcon name={icon} className="size-3.5" />
      {label}
    </span>
  )
}
