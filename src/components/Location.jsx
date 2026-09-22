import { directions, hotel } from '../data/hotel'
import { Icon } from './Icons'
import { Container, SectionHeading } from './ui'

export default function Location() {
  const contacts = [
    { icon: 'mapPin', label: 'Address', value: hotel.address },
    { icon: 'phone', label: 'Phone', value: hotel.phone, href: hotel.phoneHref },
    { icon: 'mail', label: 'Email', value: hotel.email, href: `mailto:${hotel.email}` },
    { icon: 'clock', label: 'Reception', value: `Open 24/7 · Check-in ${hotel.checkInTime} · Check-out ${hotel.checkOutTime}` },
  ]

  return (
    <section id="location" aria-labelledby="location-title" className="py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading id="location-title" eyebrow="Location & contact" title="In the heart of Sopot, steps from the sea" />

          <ul className="mt-8 space-y-5">
            {contacts.map(item => (
              <li key={item.label} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-cream text-navy">
                  <Icon name={item.icon} className="size-5" />
                </span>
                <div>
                  <p className="text-sm text-muted">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="link">
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-semibold">{item.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 font-semibold">Getting here</h3>
          <ul className="mt-3 divide-y divide-line rounded-card border border-line">
            {directions.map(item => (
              <li key={item.place} className="flex justify-between gap-4 px-4 py-3 text-sm">
                <span>{item.place}</span>
                <span className="font-semibold">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-hidden rounded-card border border-line bg-sand shadow-card">
          <iframe
            title={`Map showing the area around ${hotel.name} in Sopot`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(hotel.mapQuery)}&z=15&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block aspect-[4/3] w-full lg:aspect-square"
          />
        </div>
      </Container>
    </section>
  )
}
