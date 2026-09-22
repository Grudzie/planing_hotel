import { useState } from 'react'

// Hand-built dashboard charts. Each one ships a screen-reader table as its text alternative.

export function OccupancyRing({ value, label }) {
  const radius = 52
  const circumference = 2 * Math.PI * radius

  return (
    <div className="relative size-36 shrink-0">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90" role="img" aria-label={`${label}: ${value}%`}>
        <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--color-line)" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="var(--color-navy)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - value / 100)}
        />
      </svg>
      <div aria-hidden="true" className="absolute inset-0 grid place-content-center text-center">
        <span className="text-3xl font-semibold tabular-nums">{value}%</span>
        <span className="text-xs text-muted">occupied</span>
      </div>
    </div>
  )
}

export function WeekBars({ data, highlightIndex, caption }) {
  return (
    <figure className="min-w-0 flex-1">
      <div className="relative h-40">
        {[100, 50].map(line => (
          <div key={line} aria-hidden="true" className="absolute inset-x-0 border-t border-dashed border-line" style={{ bottom: `${line}%` }}>
            <span className="absolute -top-2 right-0 bg-white pl-1 text-[0.6875rem] leading-none text-muted">{line}%</span>
          </div>
        ))}

        <div aria-hidden="true" className="absolute inset-0 flex items-end gap-0.5 pr-10">
          {data.map((item, index) => {
            const highlighted = index === highlightIndex
            return (
              <div key={item.day} className="group relative flex h-full flex-1 items-end justify-center">
                <div
                  className={`w-3/5 max-w-8 rounded-t-[4px] transition-opacity group-hover:opacity-80 ${highlighted ? 'bg-navy' : 'bg-st-occupied'}`}
                  style={{ height: `${item.value}%` }}
                />
                {highlighted && (
                  <span className="absolute text-xs font-semibold tabular-nums" style={{ bottom: `calc(${item.value}% + 4px)` }}>
                    {item.value}%
                  </span>
                )}
                <span
                  className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-navy px-2 py-1 text-xs text-white opacity-0 shadow-card transition-opacity group-hover:opacity-100"
                  style={{ bottom: `calc(${Math.min(item.value, 82)}% + 24px)` }}
                >
                  {item.day}: {item.value}%
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div aria-hidden="true" className="mt-2 flex gap-0.5 pr-10 text-center text-xs text-muted">
        {data.map((item, index) => (
          <span key={item.day} className={`flex-1 ${index === highlightIndex ? 'font-semibold text-navy' : ''}`}>
            {item.day}
          </span>
        ))}
      </div>

      <table className="sr-only">
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Occupancy</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.day}>
              <td>{item.day}</td>
              <td>{item.value}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}

export function Sparkline({ data, labels, format, caption }) {
  const [active, setActive] = useState(null)
  const width = 300
  const height = 90
  const pad = 8
  const last = data.length - 1
  const min = Math.min(...data)
  const max = Math.max(...data)

  const x = i => (i / last) * width
  const y = v => pad + (1 - (v - min) / (max - min || 1)) * (height - pad * 2)
  const line = data.map((v, i) => `${x(i)},${y(v)}`).join(' ')
  const area = `M0,${height} ${data.map((v, i) => `L${x(i)},${y(v)}`).join(' ')} L${width},${height} Z`
  const shown = active ?? last

  const handlePointer = e => {
    const rect = e.currentTarget.getBoundingClientRect()
    const index = Math.round(((e.clientX - rect.left) / rect.width) * last)
    setActive(Math.max(0, Math.min(last, index)))
  }

  const handleKey = e => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    setActive(Math.max(0, Math.min(last, shown + (e.key === 'ArrowRight' ? 1 : -1))))
  }

  return (
    <figure>
      <div
        tabIndex={0}
        role="img"
        aria-label={`${caption}. ${labels[shown]}: ${format(data[shown])}. Use arrow keys to move between days.`}
        onPointerMove={handlePointer}
        onPointerLeave={() => setActive(null)}
        onKeyDown={handleKey}
        onBlur={() => setActive(null)}
        className="relative h-24 cursor-crosshair touch-none rounded-lg"
      >
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="size-full overflow-visible" aria-hidden="true">
          <path d={area} fill="var(--color-navy)" opacity="0.08" />
          <polyline
            points={line}
            fill="none"
            stroke="var(--color-navy)"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {active !== null && (
            <line
              x1={x(active)}
              x2={x(active)}
              y1="0"
              y2={height}
              stroke="var(--color-muted)"
              strokeWidth="1"
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
            />
          )}
        </svg>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy ring-2 ring-white"
          style={{ left: `${(x(shown) / width) * 100}%`, top: `${(y(data[shown]) / height) * 100}%` }}
        />

        {active !== null && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-1 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-navy px-2 py-1 text-xs text-white shadow-card"
            style={{ left: `clamp(3.5rem, ${(x(active) / width) * 100}%, calc(100% - 3.5rem))` }}
          >
            {labels[active]} · {format(data[active])}
          </span>
        )}
      </div>

      <div aria-hidden="true" className="mt-1 flex justify-between text-xs text-muted">
        <span>{labels[0]}</span>
        <span>{labels[last]}</span>
      </div>

      <table className="sr-only">
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v, i) => (
            <tr key={labels[i]}>
              <td>{labels[i]}</td>
              <td>{format(v)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}

export function StatusBar({ segments }) {
  const total = segments.reduce((sum, s) => sum + s.count, 0)

  return (
    <div>
      <div className="flex h-3 gap-0.5" role="img" aria-label={segments.map(s => `${s.label}: ${s.count} of ${total}`).join(', ')}>
        {segments.map(segment => (
          <div
            key={segment.id}
            className="group relative h-full first:rounded-l-full last:rounded-r-full"
            style={{ flex: `${segment.count} 1 0`, backgroundColor: `var(--color-st-${segment.id})` }}
          >
            <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-navy px-2 py-1 text-xs text-white opacity-0 shadow-card transition-opacity group-hover:opacity-100">
              {segment.label}: {segment.count}
            </span>
          </div>
        ))}
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
        {segments.map(segment => (
          <li key={segment.id} className="flex items-center gap-2">
            <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: `var(--color-st-${segment.id})` }} />
            <span className="min-w-0 flex-1 truncate text-muted">{segment.label}</span>
            <span className="font-semibold tabular-nums">{segment.count}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
