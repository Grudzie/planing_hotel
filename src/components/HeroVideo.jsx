import { useEffect, useRef, useState } from 'react'
import { heroVideo } from '../data/hotel'

// The visitor asked the system for less motion.
const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Metered or slow connection, where a background video is not worth the data.
const savesData = () => {
  const connection = typeof navigator !== 'undefined' ? navigator.connection : undefined
  if (!connection) return false
  return Boolean(connection.saveData) || /2g/.test(connection.effectiveType ?? '')
}

/**
 * One switch for every moving part of the hero: the clip and the rotating
 * feature strip. `enabled` stays false when motion is unwelcome, so the hero
 * falls back to the poster frame and a plain list of features.
 */
export function useHeroMotion() {
  const [enabled, setEnabled] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion() || savesData()) return
    setEnabled(true)
  }, [])

  return { enabled, paused, running: enabled && !paused, toggle: () => setPaused(value => !value) }
}

/**
 * Background layer of the hero: the poster frame stays visible until the clip
 * is really playing, so the headline never sits on an empty box. The clip is
 * decorative, muted and pausable (WCAG 2.2.2).
 */
export default function HeroVideo({ enabled, paused }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  // Below 48rem the small cut is enough, and saves about 8 MB.
  const [source, setSource] = useState(null)
  useEffect(() => {
    if (!enabled) return
    setSource(window.matchMedia('(min-width: 48rem)').matches ? heroVideo.src : heroVideo.srcSmall)
  }, [enabled])

  // Follow the shared pause switch.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (paused) video.pause()
    else video.play().catch(() => {})
  }, [paused, source])

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-navy">
      <img
        src={heroVideo.poster}
        alt=""
        fetchPriority="high"
        decoding="async"
        className="hero-photo size-full object-cover object-center"
      />
      {source && (
        <video
          ref={videoRef}
          src={source}
          poster={heroVideo.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className={`absolute inset-0 size-full object-cover object-center transition-opacity duration-1000 ${
            playing ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  )
}
