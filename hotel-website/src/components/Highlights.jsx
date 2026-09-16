import { highlights } from '../data/hotel'
import { Icon } from './Icons'
import { Container } from './ui'

export default function Highlights() {
  return (
    <section aria-label="Why book with us" className="py-14 sm:py-16">
      <Container>
        <ul className="grid gap-4 md:grid-cols-3">
          {highlights.map(item => (
            <li
              key={item.title}
              className="flex flex-col rounded-card border border-line bg-white p-6 transition-shadow duration-200 hover:shadow-card"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-cream text-navy">
                <Icon name={item.icon} className="size-6" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-medium tracking-tight">{item.title}</h3>
              <p className="mt-2 text-muted">{item.text}</p>
              <a href={item.href} className="link mt-4 self-start">
                {item.linkLabel}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
