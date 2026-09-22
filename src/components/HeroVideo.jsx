import { useEffect, useRef, useState } from 'react'
import { heroVideo } from '../data/hotel'
import { Icon } from './Icons'

// True when the visitor asked the system for less motion.
const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// True on a metered or slow connection, where a background video is not worth the data.
const savesData = () => {
  const connection = typeof navigator !== 'undefined' ? navigator.connection : undefined
  if (!connection) return false
  return Boolean(connection.saveData) || /2g/.test(connection.effectiveType ?? '')
}

/**
 * Background layer of the hero: a poster frame that stays visible until the
 * looping clip is actually playing, so the headline never sits on an empty box.
 * The clip is decorative, muted and pausable (WCAG 2.2.2).
 */
export default function HeroVideo() {
  const videoRef = useRef(null)
  const [source, setSource] = useState(null)
  const [playing, setPlaying] = useState(false)

  // Pick the file after mount: the small cut for phones, nothing when motion or data is unwelcome.
  useEffect(() => {
    if (prefersReducedMotion() || savesData()) return
    const wide = window.matchMedia('(min-width: 48rem)').matches
    setSource(wide ? heroVideo.src : heroVideo.srcSmall)
  }, [])

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) video.play().catch(() => {})
    else video.pause()
  }

  return (
    <>
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

      {source && (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={!playing}
          className="hero-motion-toggle"
        >
          <Icon name={playing ? 'pause' : 'play'} className="size-3.5" />
          {playing ? 'Pause video' : 'Play video'}
        </button>
      )}
    </>
  )
}
