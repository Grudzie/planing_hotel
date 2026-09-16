import { hotel, images, stats } from '../data/hotel'
import { Icon } from './Icons'
import { Container, SectionHeading } from './ui'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="pb-20 sm:pb-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="relative pb-8 sm:pr-10">
          <div className="aspect-[4/3] overflow-hidden rounded-card bg-sand lg:aspect-[4/5]">
            <img
              src={images.building}
              alt="White hotel building with balconies overlooking the garden"
              loading="lazy"
              className="size-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 hidden w-2/5 overflow-hidden rounded-card border-4 border-white bg-sand shadow-float sm:block">
            <img
              src={images.restaurant}
              alt="Tables set for dinner in the hotel restaurant"
              loading="lazy"
              className="aspect-square size-full object-cover"
            />
          </div>
          <div className="absolute left-4 top-4 rounded-2xl bg-white/95 px-4 py-3 shadow-card">
            <p className="font-display text-2xl font-medium leading-none">Since 1998</p>
            <p className="mt-1 text-xs font-medium text-muted">Family-run hotel</p>
          </div>
        </div>

        <div>
          <SectionHeading id="about-title" eyebrow="About the hotel" title="A calm, light-filled retreat by the Baltic Sea" />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            <p>
              {hotel.name} is a family-run boutique hotel on a quiet, tree-lined street in Sopot, a short walk from the
              beach, the famous wooden pier and the Monte Cassino promenade.
            </p>
            <p>
              Our 48 rooms and suites mix Scandinavian calm with warm amber tones. Start the day with a slow breakfast,
              spend the afternoon in the heated pool or spa, and end it watching the sunset from the rooftop terrace.
            </p>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {stats.map(stat => (
              <div key={stat.label} className="flex flex-col-reverse rounded-2xl bg-cream p-4">
                <dt className="mt-1 text-sm text-muted">{stat.label}</dt>
                <dd className="font-display text-3xl font-medium tracking-tight">{stat.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
            <span className="flex items-center gap-2">
              <Icon name="clock" className="size-4 text-muted" />
              Check-in from {hotel.checkInTime}
            </span>
            <span className="flex items-center gap-2">
              <Icon name="clock" className="size-4 text-muted" />
              Check-out until {hotel.checkOutTime}
            </span>
          </p>
        </div>
      </Container>
    </section>
  )
}
