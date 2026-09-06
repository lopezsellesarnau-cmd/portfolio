'use client'

/**
 * Mockup wrapper — editorial, not a fake app window. Just a caption line
 * (label · status) over a hairline, then the content in open space. No card,
 * no border, no chrome. `.tree-live` still starts the in-view animations.
 */

import { useEffect, useRef, useState } from 'react'

export const INK = '#141310'
export const TERRA = '#B0413D'
export const OK = '#3F7A4E'
export const MONO = 'var(--font-mono, monospace)'

export function useLiveOnView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [live, setLive] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLive(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, live }
}

export function MockupFrame({
  title,
  status,
  tone = INK,
  children,
}: {
  title: string
  status?: string
  tone?: string
  /** kept for call-site compatibility; not rendered */
  context?: string
  children: React.ReactNode
}) {
  const { ref, live } = useLiveOnView<HTMLDivElement>()
  return (
    <figure ref={ref} className={`m-0 ${live ? 'tree-live' : ''}`}>
      <figcaption className="flex items-center justify-between gap-4 border-b border-hair pb-2.5">
        <span className="eyebrow">{title}</span>
        {status && (
          <span className="eyebrow flex items-center gap-2 text-fg-faint">
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: tone }} aria-hidden />
            {status}
          </span>
        )}
      </figcaption>
      <div className="pt-7">{children}</div>
    </figure>
  )
}

/** Thin fill bar — used for the one meter that survives. */
export function Meter({ pct, tone = INK, delay = 0 }: { pct: number; tone?: string; delay?: number }) {
  return (
    <div className="h-px w-full bg-hair">
      <div
        className="meter-fill h-full"
        style={{ width: `${pct}%`, backgroundColor: tone, animationDelay: `${delay}ms` }}
      />
    </div>
  )
}
