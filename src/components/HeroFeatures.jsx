import { useEffect, useState } from 'react'
import { heroFeatures } from '../data/hotel'
import { Icon } from './Icons'

const STEP_MS = 3800

/**
 * Selling points under the search bar. While the hero clip runs they fade in
 * one at a time; with motion switched off they stay a plain row. Every item is
 * in the DOM either way, so screen readers and search engines see all of them.
 */
export default function HeroFeatures({ enabled, running }) {
  const [index, setIndex] = useState(0)

  // Pausing freezes the cycle on the claim currently on screen, it does not
  // drop the visitor back into the plain row.
  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setIndex(current => (current + 1) % heroFeatures.length), STEP_MS)
    return () => clearInterval(id)
  }, [running])

  return (
    <ul className={enabled ? 'hero-features' : 'hero-proof'}>
      {heroFeatures.map((feature, position) => (
        <li key={feature.text} className={enabled && position !== index ? 'is-hidden' : undefined}>
          <Icon name={feature.icon} className="size-4 text-amber" />
          {feature.text}
        </li>
      ))}
    </ul>
  )
}
