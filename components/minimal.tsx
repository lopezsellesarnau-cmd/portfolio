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
import {
  CASES,
  CREDENTIALS,
  EDUCATION,
  HOW_I_WORK,
  MILESTONES,
  SKILLS,
  type CaseStudy,
} from './copy'

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
        <a href="#top" className="pl-2 text-ink">
          Arnau Lopez.
        </a>
        <p className="hidden pl-2 text-fg-faint md:block">
          Software Developer
          <br />
          Full-Stack &amp; UX/UI
        </p>
        <nav className="col-span-2 flex justify-end gap-5 pr-2 md:col-span-4">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`transition-colors hover:text-ink ${active === l.id ? 'text-ink underline decoration-1 underline-offset-[6px]' : 'text-fg-muted'}`}
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

const HERO_NOTES: { n: string; lines: string[]; pos: string }[] = [
  { n: '1', lines: ['Aithority', 'cofounder & developer', 'EU AI Act', '2026'], pos: 'md:col-start-1 md:row-start-1' },
  { n: '2', lines: ['Kiblo', 'iOS · live in US & Canada', '2026'], pos: 'md:col-start-2 md:row-start-2' },
  { n: '3', lines: ['TypeScript · React', 'React Native · Next.js'], pos: 'md:col-start-1 md:row-start-3' },
  { n: '4', lines: ['Python · FastAPI', 'SQL · Figma'], pos: 'md:col-start-2 md:row-start-4' },
]

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col pt-28">
      <div className="frame text-center">
        <h1 className="text-[clamp(1.25rem,2.6vw,1.75rem)] font-normal uppercase leading-[1.15] tracking-[-0.01em] text-ink">
          I&rsquo;m Arnau Lopez
          <br />
          Software Developer
        </h1>
        <p className="mt-3 text-[12px] uppercase tracking-[0.04em] text-fg-dim">
          Full-Stack · UX/UI · Alcoy, Spain · EU citizen, open to relocation
        </p>
      </div>

      <div className="frame mt-16 grid grid-cols-2 content-start gap-y-10 pb-16 md:mt-20 md:grid-cols-6 md:gap-y-12">
        {HERO_NOTES.map((h) => (
          <p key={h.n} className={`mono pl-2 text-[11px] uppercase leading-[1.55] text-fg-muted ${h.pos}`}>
            <span className="mr-3 text-ink">{h.n}</span>
            {h.lines.map((l, i) => (
              <span key={i} className="block">
                {l}
              </span>
            ))}
          </p>
        ))}
        <p className="col-span-2 max-w-[34ch] pl-2 text-[12px] leading-[1.6] text-fg-muted md:col-span-2 md:col-start-5 md:row-start-3">
          I design the interface and write the code. I use AI in loops: conditions first, then
          rebuild what failed. ~2 years at Deutsche Post / DHL in Germany before that.
        </p>
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
        <span className="pr-2">Software Developer</span>
      </div>
    </section>
  )
}

/* ── Work ─────────────────────────────────────────────────────────────── */

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-x-4 py-[3px]">
      <span className="text-right text-fg-faint">{label}</span>
      <div className="text-ink">{children}</div>
    </div>
  )
}

function ProjectCard({ caso, onClose }: { caso: CaseStudy; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-paper/70 px-4" onClick={onClose}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={caso.name}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[78vh] w-[min(470px,100%)] overflow-y-auto bg-card px-5 py-5 text-[11px] uppercase leading-[1.45] tracking-[0.01em] shadow-[0_1px_0_rgba(20,19,16,0.04)] outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 text-fg-faint transition-colors hover:text-ink"
        >
          Close
        </button>

        <Row label={caso.index}>
          {caso.name}
          <span className="block text-fg-dim">{caso.role}</span>
        </Row>
        <Row label="Status">{caso.status.text}</Row>
        <div className="h-3" />
        <Row label="What">
          <span className="normal-case">{caso.blurb}</span>
        </Row>
        <Row label="Why">
          <span className="normal-case">{caso.why}</span>
        </Row>
        {caso.usedBy && (
          <Row label="Used by">
            <span className="normal-case">{caso.usedBy}</span>
          </Row>
        )}
        <div className="h-3" />
        <Row label="Solved">
          <ul className="space-y-2 normal-case">
            {caso.decisions.slice(0, 3).map((d) => (
              <li key={d.title}>
                <span className="text-ink">{d.title.replace(/\.$/, '')}.</span>{' '}
                <span className="text-fg-muted">{d.detail}</span>
              </li>
            ))}
          </ul>
        </Row>
        <div className="h-3" />
        <Row label="Stack">{caso.stack.slice(0, 5).join(', ')}</Row>
        {caso.link && (
          <Row label="Link">
            <a href={caso.link} {...ext(caso.link)} className="underline decoration-fg-ghost underline-offset-2 hover:text-accent">
              {caso.linkLabel ?? 'Open'} ↗
            </a>
          </Row>
        )}
      </div>
    </div>
  )
}

export function Work() {
  const [openSlug, setOpenSlug] = useState<string | null>(null)

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

  return (
    <section id="work" className="relative flex min-h-[100svh] flex-col justify-between py-24">
      <p className="frame text-[12px] uppercase text-ink">
        <span className="pl-2">Selected work</span>
      </p>

      <ul className="mx-auto my-16 flex flex-col items-center gap-[6px] text-center text-[12px] font-medium uppercase leading-[1.3] tracking-[0.01em]">
        {CASES.map((c) => (
          <li key={c.slug}>
            <a
              href={`#${c.slug}`}
              onClick={(e) => {
                e.preventDefault()
                setOpenSlug(c.slug)
                history.replaceState(null, '', `#${c.slug}`)
              }}
              className={`relative inline-block transition-colors ${openSlug && openSlug !== c.slug ? 'text-fg-ghost' : 'text-ink'} hover:text-accent`}
            >
              <span className="mono absolute right-full top-[1px] mr-3 text-[10px] font-normal text-fg-faint">{c.index}</span>
              {c.name}
            </a>
          </li>
        ))}
      </ul>

      <div className="frame flex justify-between text-[12px] uppercase">
        <span className="pl-2 text-ink">
          {String(CASES.length).padStart(2, '0')} projects
          <span className="ml-4 text-fg-dim">2024–2026</span>
        </span>
        <span className="pr-2 text-fg-dim">Press a project</span>
      </div>

      {open && <ProjectCard caso={open} onClose={close} />}
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
        <span className="pr-2">Alcoy, Spain · EU</span>
      </div>
    </footer>
  )
}
