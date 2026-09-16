import { hotel, reviewScores, reviews } from '../data/hotel'
import { Container, RatingBadge, SectionHeading } from './ui'

export default function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="py-20 sm:py-24">
      <Container>
        <SectionHeading id="reviews-title" eyebrow="Guest reviews" title="Loved by our guests" />

        <div className="mt-10 grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]">
          <div className="rounded-card border border-line p-6">
            <RatingBadge score={hotel.rating} size="lg" />
            <p className="mt-2 text-sm text-muted">Based on {hotel.reviewCount.toLocaleString('en-GB')} verified guest reviews</p>
            <ul className="mt-6 space-y-4">
              {reviewScores.map(item => (
                <li key={item.label}>
                  <div className="flex justify-between text-sm">
                    <span>{item.label}</span>
                    <span className="font-semibold tabular-nums">{item.score.toFixed(1)}</span>
                  </div>
                  <div aria-hidden="true" className="mt-1.5 h-1.5 rounded-full bg-line">
                    <div className="h-full rounded-full bg-navy" style={{ width: `${item.score * 10}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <ul className="grid gap-4 md:grid-cols-3">
            {reviews.map(review => (
              <li key={review.name}>
                <article className="flex h-full flex-col rounded-card bg-cream p-6">
                  <RatingBadge score={review.score} />
                  <h3 className="mt-4 font-display text-xl font-medium tracking-tight">{review.title}</h3>
                  <blockquote className="mt-2 flex-1 text-muted">
                    <p>“{review.text}”</p>
                  </blockquote>
                  <footer className="mt-6 flex items-center gap-3">
                    <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-navy text-sm font-semibold text-white">
                      {review.name.charAt(0)}
                    </span>
                    <div className="text-sm">
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-muted">
                        {review.from} · {review.stay}
                      </p>
                    </div>
                  </footer>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
