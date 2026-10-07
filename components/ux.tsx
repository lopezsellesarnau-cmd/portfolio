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

type Img = { src: string; w: number; h: number }

type Slot = {
  id: string
  // Desktop canvas position (% of width / height) and width (% of width).
  // Height comes from the image itself, so nothing is cropped or padded.
  left: number
  top: number
  w: number
  images: Img[] // first one is the grid tile, all of them show in the popup
  project: string
  caption: string
  problem?: string
  decisions?: string[]
  tools?: string
}

// Positions follow the reference sketch, scaled up ~30% and re-spaced so
// tiles at their natural aspect ratio never overlap. Canvas is 1500 × 1150.
const SLOTS: Slot[] = [
  {
    id: 'a', left: 33, top: 0, w: 14.5,
    images: [{ src: '/ux/smash-icon.jpg', w: 1800, h: 1200 }],
    project: 'SMASH', caption: 'App icon',
    problem: 'A social padel app needed an icon that reads on a crowded home screen.',
    decisions: ['A single bold wordmark instead of a symbol, so the name is the brand.'],
    tools: 'Figma',
  },
  {
    id: 'c', left: 66, top: 8, w: 26,
    images: [
      { src: '/ux/aithority-overview.jpg', w: 1800, h: 923 },
      { src: '/ux/aithority-sign-in.jpg', w: 1800, h: 899 },
      { src: '/ux/aithority-profile.jpg', w: 1800, h: 902 },
    ],
    project: 'Aithority', caption: 'Compliance overview',
    problem: 'A founder with no compliance background has to understand where they stand with the EU AI Act in a few seconds.',
    decisions: [
      'One sentence instead of a table: “Of 6 AI systems, 2 are high-risk and you have 3 / 24 obligations covered.”',
      'Next steps listed by system, each with its risk level as a colour-coded tag.',
      'Missing data is said plainly where it blocks something, like “Not set, required to export reports”.',
    ],
    tools: 'Figma, Next.js, TypeScript',
  },
  {
    id: 'b', left: 4, top: 18, w: 14.5,
    images: [{ src: '/ux/kiblo-flows.jpg', w: 1800, h: 1595 }],
    project: 'Kiblo', caption: 'Flows in Figma',
    problem: 'Food apps stop at a score and trackers stop at a log. None connected the bag in the cupboard to the right daily portion.',
    decisions: [
      'Designed every flow and how screens connect before writing code.',
      'The two main actions sit on top; secondary features like reorder live lower down.',
      'In v1 Share sat where Reorder is now, giving a minor feature more weight than the key one, so I moved it next to the dog’s name.',
    ],
    tools: 'Figma, React Native, Expo',
  },
  {
    id: 'd', left: 50, top: 37, w: 14.5,
    images: [{ src: '/ux/dross-fix-session.jpg', w: 1800, h: 1573 }],
    project: 'Dross', caption: 'Fix session',
    problem: 'Code that passes the linter but is wrong in meaning, like a request missing its auth token.',
    decisions: [
      'Code opens in a focused popup instead of a full-screen editor.',
      'The auto-fix button only appears where a fix is actually possible.',
      'An industrial, terminal-inspired style, with minimalism inside each panel.',
    ],
    tools: 'Figma, SwiftUI',
  },
  {
    id: 'e', left: 14, top: 50, w: 26,
    images: [{ src: '/ux/aithority-ui-kit.jpg', w: 1693, h: 1129 }],
    project: 'Aithority', caption: 'Dashboard, UI kit v1',
    problem: 'Before coding, the product needed one set of components every screen could share.',
    decisions: [
      'Four numbers first: systems, high risk, undocumented and compliance %.',
      'A progress bar against the August 2026 deadline.',
      'Built as a UI kit of reusable components before coding.',
    ],
    tools: 'Figma',
  },
  {
    id: 'h', left: 68, top: 55, w: 26,
    images: [{ src: '/ux/aithority-onboarding.jpg', w: 1800, h: 914 }],
    project: 'Aithority', caption: 'Onboarding in three steps',
    problem: 'Setup took over 7 minutes before a user saw any value.',
    decisions: [
      'Cut to three steps: register, profile, generate.',
      'Fill the inventory from what the company already authorized (Microsoft 365, Google Workspace, OpenAI, Anthropic) instead of typing it.',
      'Each key is used for a single read and never stored, and the dialog says so.',
    ],
    tools: 'Figma, Next.js, TypeScript',
  },
  {
    id: 'f', left: 46, top: 72, w: 14.5,
    images: [{ src: '/ux/dross-repos.jpg', w: 1800, h: 1555 }],
    project: 'Dross', caption: 'Repository index',
    problem: 'Seeing the state of every project at once before shipping.',
    decisions: [
      'One dot per check, red where something failed, readable in a second.',
      'Scan / Fix / Verify / Commit as the whole flow, always visible.',
    ],
    tools: 'Figma, SwiftUI',
  },
  {
    id: 'g', left: 6, top: 82, w: 14.5,
    images: [{ src: '/ux/smash-landing.jpg', w: 1470, h: 1200 }],
    project: 'SMASH', caption: 'Landing page',
    problem: 'Explaining a social padel app (squads, videos, analytics) in one scroll.',
    decisions: ['One card per feature, each with its real screen next to a single sentence.'],
    tools: 'Figma',
  },
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
  const img = slot.images[0]
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${slot.project}, ${slot.caption}`}
      className={`group block w-full text-left transition-opacity ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <span className="block w-full overflow-hidden bg-card">
        <Image
          src={img.src}
          alt={`${slot.project}, ${slot.caption}`}
          width={img.w}
          height={img.h}
          sizes="(min-width: 768px) 26vw, 50vw"
          className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
        />
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
        className="relative max-h-[88vh] w-[min(720px,100%)] overflow-y-auto bg-card text-[11px] uppercase leading-[1.45] tracking-[0.01em] outline-none"
      >
        {/* Header row: the close button never sits on top of an image */}
        <div className="sticky top-0 z-10 flex items-baseline justify-between bg-card px-5 py-4">
          <span className="text-ink">
            {slot.project}
            <span className="ml-3 text-fg-dim">{slot.caption}</span>
          </span>
          <button type="button" onClick={onClose} className="uppercase text-fg-faint transition-colors hover:text-ink">
            Close
          </button>
        </div>

        <div className="space-y-3 px-5">
          {slot.images.map((img, i) => (
            <Image
              key={img.src}
              src={img.src}
              alt={`${slot.project}, ${slot.caption}${i ? ` (${i + 1})` : ''}`}
              width={img.w}
              height={img.h}
              sizes="720px"
              className="block h-auto w-full"
            />
          ))}
        </div>

        <div className="px-5 py-5">
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
    </div>
  )
}


/* ── Built and shipped, skills, numbers ───────────────────────────────── */

type Built = { name: string; what: string; status: string; href?: string; label?: string }

const BUILT: Built[] = [
  { name: 'Kiblo', what: 'iOS app for dog owners', status: 'App Store, US & Canada', href: 'https://apps.apple.com/app/id6802237827', label: 'App Store' },
  { name: 'Aithority', what: 'EU AI Act compliance SaaS', status: 'Cofounder, May–Oct 2026', href: 'https://www.aithority.com.es', label: 'Site' },
  { name: 'Dross', what: 'Mac app + CLI that checks code before deploy', status: 'Open source, notarized', href: 'https://github.com/lopezsellesarnau-cmd/dross', label: 'Repo' },
  { name: 'SMASH', what: 'Social padel app', status: 'App Store' },
  { name: 'TRACE', what: 'Privacy app, data exposure and deletion', status: 'App Store, US' },
  { name: 'F1 Strategy Agent', what: 'Race strategy model with a visual race view', status: 'Open source', href: 'https://github.com/lopezsellesarnau-cmd/F1-Strategy-Agent', label: 'Repo' },
  { name: 'Ukraine War Tracker', what: 'Daily data with time-series charts', status: 'Live', href: 'https://ukraine-war-tracker.vercel.app', label: 'Live' },
  { name: 'Dev Job Tracker EU', what: 'Junior developer job market in four countries', status: 'Open source', href: 'https://github.com/lopezsellesarnau-cmd/Dev-Job-Tracking-EU', label: 'Repo' },
  { name: 'StackD', what: 'Studio site in this same design language', status: 'Live', href: 'https://www.stackd.codes', label: 'Site' },
]

const DESIGN_SKILLS: { group: string; items: string[] }[] = [
  { group: 'Design', items: ['Figma', 'UI design', 'UX flows & onboarding', 'Prototyping', 'Design systems', 'Reusable components', 'Dashboards & data-dense UI'] },
  { group: 'Craft', items: ['Layout & typography', 'Editorial composition', 'Apple HIG', 'Branding applied to product', 'Microcopy'] },
  { group: 'Build', items: ['HTML & CSS', 'Tailwind', 'React', 'Next.js', 'TypeScript', 'React Native / Expo'] },
  { group: 'Research & AI', items: ['Founder interviews', 'Usability feedback', 'Claude', 'Claude Code', 'Cursor'] },
]

const NUMBERS: { value: string; label: string }[] = [
  { value: '3', label: 'apps designed and shipped to the App Store' },
  { value: '7 min → 3', label: 'steps to first value in Aithority onboarding' },
  { value: '2 years', label: 'of graphic design training, EASD Alcoy' },
  { value: '1', label: 'design language across products, sites and posts' },
]

const ext = (href: string) => (href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})

function BuiltList() {
  return (
    <section id="built" className="relative flex min-h-[90svh] flex-col justify-between py-24">
      <p className="frame text-[12px] uppercase text-ink">
        <span className="pl-2">Built and shipped</span>
      </p>
      <ul className="frame my-16">
        {BUILT.map((b, i) => (
          <li key={b.name} className="grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-4 py-[5px] text-[12px] uppercase md:grid-cols-[2rem_14rem_1fr_14rem_7rem]">
            <span className="mono pl-2 text-[10px] text-fg-faint">{String(i + 1).padStart(2, '0')}</span>
            <span className="text-ink">{b.name}</span>
            <span className="hidden text-fg-dim md:block">{b.what}</span>
            <span className="hidden text-fg-dim md:block">{b.status}</span>
            <span className="whitespace-nowrap pr-2 text-right">
              {b.href ? (
                <a href={b.href} {...ext(b.href)} className="text-ink underline decoration-fg-ghost underline-offset-2 hover:text-accent">
                  {b.label} ↗
                </a>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
      <div className="frame flex justify-between text-[12px] uppercase">
        <span className="pl-2 text-ink">
          {String(BUILT.length).padStart(2, '0')} products
          <span className="ml-4 text-fg-dim">2024–2026</span>
        </span>
        <span className="pr-2 text-fg-dim">Designed and built by me</span>
      </div>
    </section>
  )
}

function Numbers() {
  return (
    <section id="numbers" className="relative flex min-h-[70svh] flex-col justify-between py-24">
      <div />
      <div className="frame grid gap-y-8 md:grid-cols-4">
        {NUMBERS.map((n) => (
          <div key={n.label} className="pl-2 pr-6">
            <p className="text-[13px] text-ink">
              {n.value} <span className="ml-1 text-fg-faint">)</span>
            </p>
            <p className="mt-2 max-w-[24ch] text-[11px] leading-[1.45] text-fg-dim">{n.label}</p>
          </div>
        ))}
      </div>
      <div className="frame grid md:grid-cols-6">
        <div className="pl-2 md:col-span-2">
          <p className="text-[13px] text-ink">Design engineer.</p>
          <p className="mt-4 max-w-[36ch] text-[11px] leading-[1.5] text-fg-muted">
            I trained in graphic design before I started coding. I design in Figma, then build what I design, so every
            decision survives the trip to production.
          </p>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="relative py-32">
      <div className="frame grid gap-y-16 md:grid-cols-6">
        <h2 className="pl-2 text-[clamp(1.1rem,2vw,1.4rem)] font-normal uppercase text-ink md:col-span-2">Skills</h2>
        <div className="grid gap-y-8 md:col-span-4 md:grid-cols-2">
          {DESIGN_SKILLS.map((g) => (
            <div key={g.group} className="pl-2 pr-6">
              <p className="mono text-[10px] uppercase text-fg-faint">{g.group}</p>
              <p className="mono mt-2 text-[11px] uppercase leading-[1.6] text-ink">{g.items.join(', ')}</p>
            </div>
          ))}
        </div>
        <h2 className="pl-2 text-[clamp(1.1rem,2vw,1.4rem)] font-normal uppercase text-ink md:col-span-2">Education</h2>
        <div className="grid gap-y-8 md:col-span-4 md:grid-cols-2">
          <div className="pl-2 pr-6">
            <p className="mono text-[10px] uppercase text-fg-faint">2021–2023</p>
            <p className="mono mt-2 text-[11px] uppercase leading-[1.6] text-ink">Graphic design and layout, EASD Alcoy</p>
          </div>
          <div className="pl-2 pr-6">
            <p className="mono text-[10px] uppercase text-fg-faint">In progress</p>
            <p className="mono mt-2 text-[11px] uppercase leading-[1.6] text-ink">Programming MOOC (Python), University of Helsinki</p>
          </div>
        </div>
      </div>
    </section>
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
          <div className="relative w-full" style={{ aspectRatio: '1500 / 1150', marginBottom: '6rem' }}>
            {SLOTS.map((s) => (
              <div
                key={s.id}
                className="absolute"
                style={{ left: `${s.left}%`, top: `${s.top}%`, width: `${s.w}%` }}
              >
                <Tile slot={s} onOpen={() => setOpenId(s.id)} dimmed={!!openId && openId !== s.id} />
              </div>
            ))}
          </div>
        </section>

        {/* Mobile: simple two-column list */}
        <section className="frame grid grid-cols-2 gap-x-4 gap-y-10 pb-24 md:hidden">
          {SLOTS.map((s) => (
            <div key={s.id}>
              <Tile slot={s} onOpen={() => setOpenId(s.id)} dimmed={false} />
            </div>
          ))}
        </section>

        <BuiltList />
        <Numbers />
        <Skills />

        <footer className="frame flex justify-between pb-10 text-[11px] uppercase text-fg-dim">
          <span className="pl-2">Arnau Lopez</span>
          <a href="mailto:lopezsellesarnau@gmail.com" className="pr-2 hover:text-ink">lopezsellesarnau@gmail.com</a>
        </footer>
      </main>
      {open && <CaseCard slot={open} onClose={close} />}
    </>
  )
}
