'use client'

/**
 * Minimal layout (5 oct 2026). Open space, near-white paper, small thin
 * grotesk + mono for labels and numbers. References from Arnau:
 *   Menu       — Fuge: name, grey title, links; active link underlined.
 *   Hero       — Kseniia Fesan frame 1: centered title, scattered mono text.
 *   Work       — Rick Rubin quote: centered list, corner labels, no mockups.
 *   Popup      — Studio Unravel: small grey label/value block.
 *   Milestones — Aera: one horizontal row of dates.
 * Copy stays in copy.ts.
 */

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  CASES,
  CREDENTIALS,
  EDUCATION,
  HOW_I_WORK,
  MILESTONES,
  SKILLS,
  type CaseStudy,
} from './copy'
import { PLATES, type Plate } from './design'

const CV = '/Arnau-Lopez-Selles-CV.pdf'

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

const CONTACT_ROWS: { label: string; value: string; href: string }[] = [
  { label: 'Email', value: 'lopezsellesarnau@gmail.com', href: 'mailto:lopezsellesarnau@gmail.com' },
  { label: 'GitHub', value: 'lopezsellesarnau-cmd', href: 'https://github.com/lopezsellesarnau-cmd' },
  { label: 'LinkedIn', value: 'arnau-lopez-selles', href: 'https://www.linkedin.com/in/arnau-lopez-selles/' },
  { label: 'X', value: '@ArnauSelles', href: 'https://x.com/ArnauSelles' },
  { label: 'CV', value: 'PDF, one page', href: CV },
]

const ext = (href: string) =>
  href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}

/* ── Menu ─────────────────────────────────────────────────────────────── */

export function Menu() {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const els = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-paper/85 backdrop-blur-[2px]">
      <div className="frame grid grid-cols-3 py-5 text-[12px] leading-[1.45] md:grid-cols-6">
        <a href="#top" className="flex items-center gap-2 pl-2 text-ink">
          <Image src="/logo.png" alt="" width={16} height={16} className="h-4 w-4" />
          Arnau Lopez.
        </a>
        <p className="hidden pl-2 text-fg-faint md:block">
          Product Engineer (AI)
          <br />
          I design and build AI products
        </p>
        <nav className="col-span-2 flex justify-end gap-4 pr-2 sm:gap-5 md:col-span-4">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`transition-colors hover:text-ink ${l.id === 'milestones' || l.id === 'about' ? 'hidden sm:inline' : ''} ${active === l.id ? 'text-ink underline decoration-1 underline-offset-[6px]' : 'text-fg-muted'}`}
            >
              {l.label}
            </a>
          ))}
          <a href={CV} className="text-fg-muted transition-colors hover:text-ink">
            CV
          </a>
        </nav>
      </div>
    </header>
  )
}

/* ── Hero ─────────────────────────────────────────────────────────────── */
/* WAVE record sleeve: letters spread over the grid, rows stepping like A A A A / B B B B.
   Each row sits at its own depth; the plane tilts a little with the mouse, so the type
   reads as a 3D space. No motion when the user asks for reduced motion. */

const HERO_ROWS: { mark: string; step: number; text: string; note: string; z: number }[] = [
  { mark: 'A', step: 0, text: 'TYPESCRIPT', note: '01', z: 60 },
  { mark: 'A', step: 1, text: 'REACT NATIVE', note: '02', z: 30 },
  { mark: 'A', step: 2, text: 'NEXT.JS', note: '03', z: 0 },
  { mark: 'A', step: 3, text: 'SUPABASE', note: '04', z: -30 },
  { mark: 'B', step: 3, text: 'CLAUDE API', note: '05', z: -30 },
  { mark: 'B', step: 2, text: 'PYTHON', note: '06', z: 0 },
  { mark: 'B', step: 1, text: 'SQL', note: '07', z: 30 },
  { mark: 'B', step: 0, text: 'FIGMA', note: 'LAST', z: 60 },
]

export function Hero() {
  const plane = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = plane.current
    if (!el) return
    const onMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      el.style.transform = `rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 14).toFixed(2)}deg)`
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col pt-28 text-[11px] uppercase md:text-[12px]" style={{ perspective: '1200px' }}>
      <div
        ref={plane}
        className="frame flex flex-1 flex-col justify-between gap-16 pb-16 transition-transform duration-300 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <h1 className="px-2 font-medium text-ink" style={{ transform: 'translateZ(80px)' }}>
          <Spread text="ARNAU LOPEZ" />
        </h1>

        <div className="space-y-[6px] px-2" style={{ transformStyle: 'preserve-3d' }}>
          {HERO_ROWS.map((r, i) => (
            <div
              key={r.text}
              className={`grid grid-cols-12 items-baseline ${i === 4 ? 'pt-10' : ''}`}
              style={{ transform: `translateZ(${r.z}px)` }}
            >
              <span className="relative col-span-4 md:col-span-6">
                <span className="absolute top-0 text-fg-dim" style={{ left: `${r.step * 30}%` }}>
                  {r.mark}
                </span>
                &nbsp;
              </span>
              <Spread text={r.text} className="col-span-6 text-ink md:col-span-5" />
              <span className="col-span-2 text-right text-fg-dim md:col-span-1">{r.note}</span>
            </div>
          ))}
        </div>

        <div style={{ transform: 'translateZ(20px)' }}>
          <SpreadWords
            words={['I', 'design', 'and', 'build', 'AI', 'products', 'Amsterdam,', 'Netherlands', 'EU', 'citizen']}
            strong={['design', 'build', 'AI']}
          />
        </div>

        <div className="grid gap-8 px-2 md:grid-cols-2" style={{ transform: 'translateZ(-20px)' }}>
          <div>
            <p className="font-medium text-ink">Product Engineer (AI)</p>
            <p className="max-w-[46ch] normal-case text-fg-muted">
              I design the interface and write the code. I use AI in loops: conditions first, then rebuild what
              failed. ~2 years at Deutsche Post / DHL in Germany before that.
            </p>
          </div>
          <div className="md:text-right">
            <p className="font-medium text-ink">Now</p>
            <p className="text-fg-muted">Hilo · AI voice companion · iPhone and web for care staff</p>
            <p className="text-fg-muted">Casa · hackathon · team of three · AI agents</p>
          </div>
        </div>

        <h2 className="px-2 font-medium text-ink" style={{ transform: 'translateZ(80px)' }}>
          <Spread text="PRODUCT ENGINEER" />
        </h2>
      </div>
    </section>
  )
}

/* ── Portrait ─────────────────────────────────────────────────────────── */

export function Portrait() {
  return (
    <section aria-label="Portrait" className="relative flex min-h-[90svh] flex-col justify-between py-24">
      <div />
      <Image
        src="/arnau-portrait.jpg"
        alt="Arnau Lopez"
        width={180}
        height={240}
        className="mx-auto h-auto w-[140px] grayscale md:w-[180px]"
      />
      <div className="frame flex justify-end gap-6 text-[12px] uppercase text-ink">
        <span>Arnau Lopez</span>
        <span className="pr-2">Product Engineer (AI)</span>
      </div>
    </section>
  )
}

/* ── Quote ────────────────────────────────────────────────────────────── */
/* From his Y Combinator co-founder matching profile (10 nov 2026). Between the work and the timeline. */

export function Quote() {
  return (
    <section aria-label="Quote" className="frame flex min-h-[60svh] flex-col items-center justify-center py-24 text-center">
      <blockquote className="max-w-[34ch] text-[15px] uppercase leading-[1.4] text-ink">
        “Arnau has an impressive CV of products, all built &amp; shipped solo!”
      </blockquote>
      <p className="mono mt-5 text-[11px] uppercase text-fg-dim">Alistair Stafford · Y Combinator · co-founder matching</p>
    </section>
  )
}

/* ── Work ─────────────────────────────────────────────────────────────── */
/* List: Vincent S portfolio. [ 0n ] label | content | [ meta ] columns on light paper,
   a small picture top-right that follows the project under the cursor.
   Card: design (mockups), engineering and data together, in the same columns. */

/** Spreads the letters of a text over the full width of its box. */
function Spread({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span aria-label={text} className={`flex justify-between ${className}`}>
      {Array.from(text).map((ch, i) => (
        <span key={i} aria-hidden="true" className="inline-block min-w-[0.5em] text-center">
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}

/** Spreads whole words over the full width; words in `strong` are set darker. */
function SpreadWords({ words, strong = [] }: { words: string[]; strong?: string[] }) {
  return (
    <p className="flex flex-wrap justify-between gap-x-4 px-2">
      {words.map((w, i) => (
        <span key={i} className={strong.includes(w) ? 'font-medium text-ink' : 'text-fg-dim'}>
          {w}
        </span>
      ))}
    </p>
  )
}

const platesOf = (c: CaseStudy) => PLATES.filter((p) => p.project === c.name)
const n2 = (i: number) => String(i + 1).padStart(2, '0')

/** The small framed picture: first mockup of the project, or its name when there is none yet. */
function Thumb({ caso }: { caso: CaseStudy }) {
  const plate = platesOf(caso)[0]
  return (
    <div className="relative aspect-[1600/1142] w-[150px] overflow-hidden bg-card md:w-[200px]">
      {plate ? (
        <Image key={plate.src} src={plate.src} alt={`${caso.name}: ${plate.caption}`} fill sizes="200px" className="object-cover" />
      ) : (
        <span className="absolute inset-0 grid place-items-center text-fg-faint">
          [ {caso.index} ] {caso.name}
        </span>
      )}
    </div>
  )
}

function Block({ n, label, children, meta }: { n: number; label: string; children: React.ReactNode; meta?: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-x-4 md:grid-cols-[1fr_2fr_1fr]">
      <p className="text-ink">
        [ {n2(n)} ] {label}
      </p>
      <div className="max-w-[64ch] normal-case">{children}</div>
      {meta && <div className="col-start-2 mt-2 md:col-start-3 md:mt-0">{meta}</div>}
    </div>
  )
}

function ProjectCard({ caso, onClose }: { caso: CaseStudy; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  /** The mockup shown large in the centre; Escape closes it first, then the card. */
  const [zoom, setZoom] = useState<Plate | null>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (zoom) setZoom(null)
      else onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, zoom])

  const plates = platesOf(caso)
  const blocks: { label: string; body: React.ReactNode; meta?: React.ReactNode }[] = [
    { label: 'What', body: caso.blurb, meta: `[ ${caso.status.text} ]` },
    { label: 'Why', body: caso.why },
    ...(caso.team ? [{ label: 'Team', body: caso.team }] : []),
    ...(caso.usedBy ? [{ label: 'Used by', body: caso.usedBy }] : []),
    ...(plates.length
      ? [
          {
            label: 'Design',
            body: (
              <div className="grid gap-4 sm:grid-cols-2">
                {plates.map((p) => (
                  <figure key={p.src}>
                    <button type="button" onClick={() => setZoom(p)} aria-label={`Open ${p.caption}`} className="block w-full cursor-zoom-in">
                      <Image src={p.src} alt={`${caso.name}: ${p.caption}`} width={p.w} height={p.h} sizes="(min-width: 768px) 360px, 90vw" className="h-auto w-full bg-card" />
                    </button>
                    <figcaption className="mt-1 flex justify-between text-fg-dim">
                      <span>{p.caption}</span>
                      <span>[ {p.tools} ]</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ),
          },
        ]
      : []),
    {
      label: 'Engineering',
      body: (
        <div className="space-y-3">
          <p>{caso.built}</p>
          <ul className="space-y-3">
            {caso.decisions.slice(0, 3).map((d) => (
              <li key={d.title}>
                <span className="text-ink">{d.title.replace(/\.$/, '')}.</span>{' '}
                <span className="text-fg-muted">{d.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
      meta: (
        <ul className="uppercase">
          {caso.stack.slice(0, 6).map((s) => (
            <li key={s}>[ {s} ]</li>
          ))}
        </ul>
      ),
    },
    ...(caso.data?.length
      ? [
          {
            label: 'Data',
            body: (
              <ul className="space-y-3">
                {caso.data.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            ),
          },
        ]
      : []),
    ...(caso.link
      ? [
          {
            label: 'Link',
            body: (
              <a href={caso.link} {...ext(caso.link)} className="underline decoration-fg-ghost underline-offset-2 hover:text-accent">
                ↗ {caso.linkLabel ?? 'Open'}
              </a>
            ),
          },
        ]
      : []),
  ]

  const big = caso.image?.size === 'large'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/10 px-4" onClick={onClose}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={caso.name}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[88vh] w-[min(1100px,100%)] overflow-y-auto bg-paper px-5 py-5 text-[11px] leading-[1.45] text-fg-muted shadow-[0_0_0_1px_rgba(20,19,16,0.08)] outline-none md:px-6"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-ink">
              [ {caso.index} ] {caso.name}
            </p>
            <p>{caso.role}</p>
            <p className="mt-6 max-w-[32ch]">{caso.tagline}</p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <button type="button" onClick={onClose} aria-label="Close" className="text-fg-faint transition-colors hover:text-ink">
              [ Close ]
            </button>
            {caso.image ? (
              <Image
                src={caso.image.src}
                alt={caso.image.alt}
                width={caso.image.w}
                height={caso.image.h}
                sizes={big ? '(min-width: 1100px) 640px, 60vw' : '200px'}
                className={`h-auto ${big ? 'w-[min(640px,60vw)]' : 'w-[150px] md:w-[200px]'}`}
              />
            ) : (
              <Thumb caso={caso} />
            )}
          </div>
        </div>

        {caso.video && (
          <div className="mt-8 aspect-video w-full bg-card">
            <iframe
              src={caso.video}
              title={`${caso.name} demo video`}
              loading="lazy"
              allow="encrypted-media; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        )}

        <div className="mt-20 space-y-10 md:mt-28">
          {blocks.map((b, i) => (
            <Block key={b.label} n={i} label={b.label} meta={b.meta}>
              {b.body}
            </Block>
          ))}
        </div>
      </div>

      {zoom && (
        <div
          className="fixed inset-0 z-[60] flex cursor-zoom-out flex-col items-center justify-center gap-3 bg-paper/95 p-6"
          onClick={(e) => {
            e.stopPropagation()
            setZoom(null)
          }}
        >
          <Image
            src={zoom.src}
            alt={`${caso.name}: ${zoom.caption}`}
            width={zoom.w}
            height={zoom.h}
            sizes="90vw"
            className="h-auto max-h-[82vh] w-auto max-w-[min(1400px,92vw)]"
          />
          <p className="flex w-full max-w-[min(1400px,92vw)] justify-between text-[11px] text-fg-dim">
            <span>
              [ {caso.index} ] {caso.name} · {zoom.caption}
            </span>
            <span>[ Close ]</span>
          </p>
        </div>
      )}
    </div>
  )
}

export function Work() {
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const [hover, setHover] = useState(CASES[0].slug)

  const close = useCallback(() => {
    setOpenSlug(null)
    if (window.location.hash) history.replaceState(null, '', window.location.pathname + window.location.search)
  }, [])

  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.slice(1)
      if (CASES.some((c) => c.slug === h)) setOpenSlug(h)
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const open = openSlug ? CASES.find((c) => c.slug === openSlug) ?? null : null
  const shown = CASES.find((c) => c.slug === hover) ?? CASES[0]

  return (
    <section id="work" className="relative flex min-h-[100svh] flex-col justify-between py-24 text-[11px] leading-[1.45] text-fg-muted md:text-[12px]">
      <div className="frame flex items-start justify-between gap-6 px-2">
        <div>
          <p className="text-ink">[ 01 ] Selected work</p>
          <p className="max-w-[30ch]">Design and engineering in the same project. Press one to open it.</p>
        </div>
        <Thumb caso={shown} />
      </div>

      <div className="frame mt-24 space-y-10 px-2">
        <div className="grid grid-cols-[7rem_1fr] gap-x-4 md:grid-cols-[1fr_2fr_1fr]">
          <p className="text-ink">[ 02 ] Projects</p>
          <ul>
            {CASES.map((c) => (
              <li key={c.slug}>
                <a
                  href={`#${c.slug}`}
                  onMouseEnter={() => setHover(c.slug)}
                  onFocus={() => setHover(c.slug)}
                  onClick={(e) => {
                    e.preventDefault()
                    setOpenSlug(c.slug)
                    history.replaceState(null, '', `#${c.slug}`)
                  }}
                  className={`transition-colors hover:text-ink ${hover === c.slug ? 'text-ink' : ''}`}
                >
                  ↗ {c.name}
                </a>
              </li>
            ))}
          </ul>
          <ul className="col-start-2 mt-2 md:col-start-3 md:mt-0">
            {CASES.map((c) => (
              <li key={c.slug} className={hover === c.slug ? 'text-ink' : ''}>
                [ {c.tag} ]
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-[7rem_1fr] gap-x-4 md:grid-cols-[1fr_2fr_1fr]">
          <p className="text-ink">[ 03 ] Years</p>
          <p>{String(CASES.length).padStart(2, '0')} projects</p>
          <p className="col-start-2 md:col-start-3">[ 2024 – 2026 ]</p>
        </div>
      </div>

      {open && createPortal(<ProjectCard caso={open} onClose={close} />, document.body)}
    </section>
  )
}

/* ── Milestones ───────────────────────────────────────────────────────── */

export function Milestones() {
  const items = MILESTONES.slice(0, 5)
  return (
    <section id="milestones" className="relative flex min-h-[100svh] flex-col justify-between py-24">
      <div />
      <div className="frame grid gap-y-8 md:grid-cols-5">
        {items.map((m, i) => (
          <div key={m.title} className={`pl-2 pr-6 ${i === items.length - 1 ? 'md:text-right' : ''}`}>
            <p className="text-[13px] text-ink">
              {m.date} <span className="ml-1 text-fg-faint">)</span>
            </p>
            <p className="mt-2 max-w-[24ch] text-[11px] leading-[1.45] text-fg-dim md:inline-block md:text-left">{m.title}</p>
          </div>
        ))}
      </div>
      <div className="frame grid md:grid-cols-6">
        <div className="pl-2 md:col-span-2">
          <p className="text-[13px] text-ink">{HOW_I_WORK.title.split('.')[0]}.</p>
          <p className="mt-4 max-w-[36ch] text-[11px] leading-[1.5] text-fg-muted">{HOW_I_WORK.lead}</p>
        </div>
      </div>
    </section>
  )
}

/* ── About: skills, education, credentials ────────────────────────────── */

export function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="frame grid gap-y-16 md:grid-cols-6">
        <h2 className="pl-2 text-[clamp(1.1rem,2vw,1.4rem)] font-normal uppercase text-ink md:col-span-2">
          Skills
        </h2>
        <div className="grid gap-y-8 md:col-span-4 md:grid-cols-2">
          {SKILLS.map((g) => (
            <div key={g.group} className="pl-2 pr-6">
              <p className="mono text-[10px] uppercase text-fg-faint">{g.group}</p>
              <p className="mono mt-2 text-[11px] uppercase leading-[1.6] text-ink">{g.items.join(', ')}</p>
            </div>
          ))}
        </div>

        <h2 className="pl-2 text-[clamp(1.1rem,2vw,1.4rem)] font-normal uppercase text-ink md:col-span-2">
          Education
        </h2>
        <div className="grid gap-y-8 md:col-span-4 md:grid-cols-2">
          {EDUCATION.map((e) => (
            <a key={e.school} href={e.link} {...(e.link ? ext(e.link) : {})} className="block pl-2 pr-6">
              <p className="mono text-[10px] uppercase text-fg-faint">{e.date}</p>
              <p className="mono mt-2 text-[11px] uppercase leading-[1.6] text-ink">
                {e.program}, {e.school}
              </p>
            </a>
          ))}
          {CREDENTIALS.map((c) => (
            <a key={c.name} href={c.link} {...(c.link ? ext(c.link) : {})} className="block pl-2 pr-6">
              <p className="mono text-[10px] uppercase text-fg-faint">{c.date}</p>
              <p className="mono mt-2 text-[11px] uppercase leading-[1.6] text-ink">
                {c.name}, {c.issuer}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Contact ──────────────────────────────────────────────────────────── */

export function Contact() {
  return (
    <footer id="contact" className="relative flex min-h-[80svh] flex-col justify-between py-24">
      <div />
      <div className="mx-auto w-[min(360px,calc(100%-2rem))] bg-card px-3 py-3 text-[11px] uppercase leading-[1.45]">
        {CONTACT_ROWS.map((r) => (
          <div key={r.label} className="grid grid-cols-[5.5rem_1fr] gap-x-4 py-[2px]">
            <span className="text-right text-fg-faint">{r.label}</span>
            <a href={r.href} {...ext(r.href)} className="text-ink hover:text-accent">
              {r.value}
            </a>
          </div>
        ))}
      </div>
      <div className="frame flex justify-between text-[11px] uppercase text-fg-dim">
        <span className="pl-2">Arnau Lopez</span>
        <span className="pr-2">Amsterdam, Netherlands · EU</span>
      </div>
    </footer>
  )
}
