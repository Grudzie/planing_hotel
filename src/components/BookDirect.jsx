import { directBenefits, images } from '../data/hotel'
import { Icon } from './Icons'
import { Container } from './ui'

export default function BookDirect() {
  return (
    <section id="book-direct" aria-labelledby="book-direct-title" className="py-20 sm:py-28">
      <Container className="grid items-center gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-20">
        <div className="relative">
          <div className="aspect-4/5 overflow-hidden rounded-card bg-sand">
            <img
              src={images.terrace}
              alt="Sun loungers on the hotel terrace looking out over the sea"
              loading="lazy"
              className="size-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden rounded-card bg-navy px-7 py-6 text-white shadow-float sm:block lg:-right-10">
            <p className="font-display text-3xl leading-none">Best rate</p>
            <p className="mt-2.5 text-[0.6875rem] uppercase tracking-[0.2em] text-white/70">Guaranteed, always</p>
          </div>
        </div>

        <div>
          <p className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            <span aria-hidden="true" className="h-px w-10 bg-amber" />
            Booked direct
          </p>

          <h2 id="book-direct-title" className="mt-6 max-w-xl font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
            Always better when you book with us
          </h2>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            Reserve on this page and you get our lowest rate, flexible terms and the quiet extras a booking site cannot
            offer.
          </p>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {directBenefits.map(benefit => (
              <li key={benefit.title} className="flex gap-5 py-5">
                <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full border border-line text-navy">
                  <Icon name={benefit.icon} className="size-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold">{benefit.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{benefit.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a href="#reservation" className="btn btn-primary btn-lg">
              Book your stay
              <Icon name="arrowRight" className="size-5" />
            </a>
            <a href="#rooms" className="link">
              View rooms
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
