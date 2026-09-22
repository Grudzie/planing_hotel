import { ratingLabel } from '../data/hotel'

export function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

export function SectionHeading({ id, eyebrow, title, subtitle, light = false, className = '', children }) {
  return (
    <div className={`flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between ${className}`}>
      <div className="max-w-2xl">
        {eyebrow && (
          <p className={`mb-3 text-sm font-semibold uppercase tracking-[0.14em] ${light ? 'text-white/80' : 'text-muted'}`}>
            {eyebrow}
          </p>
        )}
        <h2 id={id} className="font-display text-3xl font-medium tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
          {title}
        </h2>
        {subtitle && <p className={`mt-3 text-base sm:text-lg ${light ? 'text-white/85' : 'text-muted'}`}>{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

export function RatingBadge({ score, reviews, size = 'md', className = '' }) {
  const large = size === 'lg'
  return (
    <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}>
      <span
        className={`rounded-md bg-rating font-semibold tabular-nums text-white ${large ? 'px-2.5 py-1.5 text-xl' : 'px-1.5 py-0.5 text-sm'}`}
      >
        {score.toFixed(1)}
      </span>
      <span className={`font-semibold ${large ? 'text-xl' : 'text-sm'}`}>{ratingLabel(score)}</span>
      {reviews != null && <span className="text-sm text-muted">({reviews.toLocaleString('en-GB')} reviews)</span>}
    </div>
  )
}
