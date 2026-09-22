import { amenities } from '../data/hotel'
import { Icon } from './Icons'
import { Container, SectionHeading } from './ui'

export default function Amenities() {
  return (
    <section id="amenities" aria-labelledby="amenities-title" className="bg-cream py-20 sm:py-24">
      <Container>
        <SectionHeading
          id="amenities-title"
          eyebrow="Amenities"
          title="Everything for an easy stay"
          subtitle="Included for every hotel guest, with no hidden resort fees."
        />
        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map(item => (
            <li key={item.title} className="flex gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white text-navy shadow-card">
                <Icon name={item.icon} className="size-6" />
              </span>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
