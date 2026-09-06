'use client'

/**
 * Work — one illustration: the exploded stack, a layer per project. Press a
 * layer and a small, separate panel opens for that project: what it is, the
 * problems solved, the stack, the link. Hierarchy by type size and weight;
 * no mockup inside the panel.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { CASES, type CaseStudy, type StackLayer } from './copy'
import { ExplodedStack } from './exploded-stack'

const TEXTURES: StackLayer['texture'][] = ['grid', 'dots', 'plain', 'pins', 'dots']

const LAYERS: StackLayer[] = CASES.map((c, i) => ({
  label: c.name,
  desc: c.tagline,
  side: i % 2 === 0 ? 'right' : 'left',
  texture: TEXTURES[i % TEXTURES.length],
  href: `#${c.slug}`,
}))

function StatusPill({ text, tone }: { text: string; tone: 'ok' | 'accent' }) {
  const color = tone === 'ok' ? '#3F7A4E' : '#B0413D'
  return (
    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em]" style={{ color }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} aria-hidden />
      {text}
    </span>
  )
}

function ProjectPanel({ caso, onClose }: { caso: CaseStudy; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-5 py-[8vh] sm:py-[10vh]">
      <div className="absolute inset-0 bg-ink/20 backdrop-blur-[2px]" aria-hidden onClick={onClose} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={caso.name}
        className="relative flex max-h-[84vh] w-[min(460px,100%)] flex-col overflow-y-auto rounded-[16px] border border-rule bg-paper p-6 shadow-[0_30px_80px_-30px_rgba(20,19,16,0.45)] sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-[13px] text-fg-faint transition-colors hover:text-ink"
        >
          ✕
        </button>

        <h3 className="display text-[clamp(1.8rem,4vw,2.4rem)] text-ink">{caso.name}</h3>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="text-[12px] uppercase tracking-[0.14em] text-accent">{caso.role}</span>
          <StatusPill text={caso.status.text} tone={caso.status.tone} />
        </div>

        <p className="mt-5 text-[16px] leading-relaxed text-ink">{caso.blurb}</p>

        <p className="eyebrow mt-6">Problems solved</p>
        <div className="mt-3 space-y-3">
          {caso.decisions.map((d) => (
            <p key={d.title} className="text-[13px] leading-relaxed text-fg-muted">
              <span className="font-medium text-ink">{d.title}. </span>
              {d.detail}
            </p>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-hair pt-4">
          <span className="text-[11px] uppercase tracking-[0.08em] text-fg-faint">
            {caso.stack.slice(0, 5).join('  ·  ')}
          </span>
          {caso.link && (
            <a
              href={caso.link}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline shrink-0 text-[13px]"
            >
              {caso.linkLabel ?? 'Open'} ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export function Work() {
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const close = useCallback(() => {
    setOpenSlug(null)
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }, [])

  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.slice(1)
      setOpenSlug(CASES.some((c) => c.slug === h) ? h : null)
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const open = openSlug ? CASES.find((c) => c.slug === openSlug) ?? null : null

  return (
    <div className="wide-col">
      <ExplodedStack code="The work" layers={LAYERS} status="press a layer" />
      {open && <ProjectPanel caso={open} onClose={close} />}
    </div>
  )
}
