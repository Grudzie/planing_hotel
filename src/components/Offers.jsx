import { packages, rooms } from '../data/hotel'
import { plural } from '../lib/format'
import { Icon } from './Icons'
import { Container } from './ui'

export default function Offers({ onChoose }) {
  return (
    <section id="offers" aria-labelledby="offers-title" className="py-20 sm:py-24">
      <Container>
        <div className="on-dark rounded-card bg-navy p-5 text-white sm:p-8 lg:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-5">
              <span aria-hidden="true" className="hidden size-14 shrink-0 place-items-center rounded-2xl bg-amber text-navy sm:grid">
                <Icon name="tag" className="size-7" />
              </span>
              <div>
                <h2 id="offers-title" className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
                  Autumn by the sea: save up to 20%
                </h2>
                <p className="mt-2 text-white/85">
                  Exclusive packages when you book direct, with late check-out and a welcome drink on arrival.
                </p>
              </div>
            </div>
            <a href="#reservation" className="btn btn-light self-start sm:self-auto">
              Book now
            </a>
          </div>

          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {packages.map(pkg => {
              const room = rooms.find(r => r.id === pkg.roomId)
              return (
                <li key={pkg.id}>
                  <article className="on-light group flex h-full flex-col overflow-hidden rounded-card bg-white text-navy">
                    <div className="aspect-[16/10] overflow-hidden bg-sand">
                      <img
                        src={pkg.image}
                        alt=""
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="self-start rounded-md bg-sale px-2 py-0.5 text-xs font-semibold text-white">Save {pkg.save}%</span>
                      <h3 className="mt-3 text-lg font-semibold">{pkg.title}</h3>
                      <p className="mt-1 text-sm text-muted">{pkg.text}</p>
                      <p className="mt-3 mb-5 flex items-center gap-1.5 text-sm text-rating">
                        <Icon name="check" className="size-4" />
                        {plural(pkg.nights, 'night')} · {room.name} · breakfast
                      </p>
                      <button type="button" onClick={() => onChoose(pkg)} className="btn btn-outline btn-sm mt-auto w-full">
                        Book this package
                      </button>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </section>
  )
}
