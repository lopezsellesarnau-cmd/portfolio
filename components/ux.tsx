'use client'

/**
 * /ux — design portfolio (7 oct 2026). Same "espacio abierto" language as the
 * home (minimal.tsx), so it reads as the same person, but the home stays the
 * full-stack portfolio.
 *
 * Layout: a scattered grid. Small images placed with intention on an
 * invisible canvas, lots of white space between them (reference: Arnau's
 * grid sketch, 1500×985). On mobile the canvas collapses into a 2-column list.
 *
 * To add work: drop the image in /public/ux/ and fill `src` on a slot.
 * Slots without `src` render as a grey placeholder.
 */

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

type Slot = {
  id: string
  // Position on the desktop canvas, in % of width / height.
  left: number
  top: number
  w: number
  h: number
  src?: string
  project: string
  caption: string
  problem?: string
  decisions?: string[]
  tools?: string
}

// Positions taken from the reference sketch (1500 × 985).
const SLOTS: Slot[] = [
  { id: 'a', left: 33.8, top: 0, w: 10.9, h: 16.4, project: 'Aithority', caption: 'Inventory dashboard' },
  { id: 'b', left: 5.2, top: 20.1, w: 10.9, h: 16.5, project: 'Kiblo', caption: 'Home screen' },
  { id: 'c', left: 75.5, top: 12.3, w: 10.9, h: 28.1, project: 'Kiblo', caption: 'Portion flow' },
  { id: 'd', left: 53.2, top: 38.2, w: 10.9, h: 16.5, project: 'Dross', caption: 'Report' },
  { id: 'e', left: 13.4, top: 57, w: 20.4, h: 16.5, project: 'Aithority', caption: 'Classification card' },
  { id: 'f', left: 44.7, top: 73.5, w: 10.9, h: 16.5, project: 'TRACE', caption: 'Exposure report' },
  { id: 'g', left: 80.9, top: 69.2, w: 10.9, h: 16.5, project: 'StackD', caption: 'Website' },
  { id: 'h', left: 8, top: 83.1, w: 10.9, h: 16.5, project: 'Portfolio', caption: 'arnau-lopez.com' },
]

/* ── Header ───────────────────────────────────────────────────────────── */

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-paper/85 backdrop-blur-[2px]">
      <div className="frame grid grid-cols-3 py-5 text-[12px] leading-[1.45] md:grid-cols-6">
        <Link href="/" className="pl-2 text-ink">
          Arnau Lopez.
        </Link>
        <p className="hidden pl-2 text-fg-faint md:block">
          Product &amp; UX Design
          <br />
          Design Engineer
        </p>
        <nav className="col-span-2 flex justify-end gap-5 pr-2 md:col-span-4">
          <span className="text-ink underline decoration-1 underline-offset-[6px]">Design</span>
          <Link href="/" className="text-fg-muted transition-colors hover:text-ink">
            Development
          </Link>
          <a href="mailto:lopezsellesarnau@gmail.com" className="text-fg-muted transition-colors hover:text-ink">
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}

/* ── Tile ─────────────────────────────────────────────────────────────── */

function Tile({ slot, onOpen, dimmed }: { slot: Slot; onOpen: () => void; dimmed: boolean }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${slot.project}, ${slot.caption}`}
      className={`group block h-full w-full text-left transition-opacity ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <span className="relative block h-full w-full overflow-hidden bg-card">
        {slot.src && (
          <Image
            src={slot.src}
            alt={`${slot.project}, ${slot.caption}`}
            fill
            sizes="(min-width: 768px) 20vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        )}
      </span>
      <span className="mt-2 block text-[11px] uppercase leading-[1.4] text-ink">
        {slot.project}
        <span className="block text-fg-dim">{slot.caption}</span>
      </span>
    </button>
  )
}

/* ── Popup ────────────────────────────────────────────────────────────── */

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-x-4 py-[3px]">
      <span className="text-right text-fg-faint">{label}</span>
      <div className="text-ink">{children}</div>
    </div>
  )
}

function CaseCard({ slot, onClose }: { slot: Slot; onClose: () => void }) {
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
        aria-label={slot.project}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[86vh] w-[min(560px,100%)] overflow-y-auto bg-card px-5 py-5 text-[11px] uppercase leading-[1.45] tracking-[0.01em] outline-none"
      >
        <button type="button" onClick={onClose} className="absolute right-3 top-3 uppercase text-fg-faint hover:text-ink">
          Close
        </button>
        {slot.src && (
          <span className="relative mb-4 block aspect-[4/3] w-full overflow-hidden bg-paper">
            <Image src={slot.src} alt={`${slot.project}, ${slot.caption}`} fill sizes="560px" className="object-contain" />
          </span>
        )}
        <Row label="Project">
          {slot.project}
          <span className="block text-fg-dim">{slot.caption}</span>
        </Row>
        {slot.problem && (
          <Row label="Problem">
            <span className="normal-case">{slot.problem}</span>
          </Row>
        )}
        {slot.decisions && slot.decisions.length > 0 && (
          <Row label="Decisions">
            <ul className="space-y-1 normal-case">
              {slot.decisions.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Row>
        )}
        {slot.tools && <Row label="Tools">{slot.tools}</Row>}
      </div>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────────────── */

export function UxPage() {
  const [openId, setOpenId] = useState<string | null>(null)
  const close = useCallback(() => setOpenId(null), [])
  const open = SLOTS.find((s) => s.id === openId) ?? null

  return (
    <>
      <Header />
      <main id="contenido">
        <section className="relative pb-20 pt-40 md:pb-28 md:pt-48">
          <div className="frame text-center">
            <h1 className="text-[clamp(1.25rem,2.6vw,1.75rem)] font-normal uppercase leading-[1.15] tracking-[-0.01em] text-ink">
              Selected design work
            </h1>
            <p className="mt-3 text-[12px] uppercase tracking-[0.04em] text-fg-dim">
              Product · UX/UI · From Figma to production
            </p>
          </div>
        </section>

        {/* Desktop: scattered canvas */}
        <section className="frame hidden pb-32 md:block">
          <div className="relative w-full" style={{ aspectRatio: '1500 / 985', marginBottom: '4rem' }}>
            {SLOTS.map((s) => (
              <div
                key={s.id}
                className="absolute"
                style={{ left: `${s.left}%`, top: `${s.top}%`, width: `${s.w}%`, height: `${s.h}%` }}
              >
                <Tile slot={s} onOpen={() => setOpenId(s.id)} dimmed={!!openId && openId !== s.id} />
              </div>
            ))}
          </div>
        </section>

        {/* Mobile: simple two-column list */}
        <section className="frame grid grid-cols-2 gap-x-4 gap-y-10 pb-24 md:hidden">
          {SLOTS.map((s) => (
            <div key={s.id} className="aspect-square">
              <Tile slot={s} onOpen={() => setOpenId(s.id)} dimmed={false} />
            </div>
          ))}
        </section>

        <footer className="frame flex justify-between pb-10 text-[11px] uppercase text-fg-dim">
          <span className="pl-2">Arnau Lopez</span>
          <span className="pr-2">Press a project</span>
        </footer>
      </main>
      {open && <CaseCard slot={open} onClose={close} />}
    </>
  )
}
