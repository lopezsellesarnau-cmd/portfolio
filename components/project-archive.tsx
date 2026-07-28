'use client'

/**
 * Work as a STACK OF FOLDERS — same drawer look as StackD's folder-stack:
 * each project is its own folder with its own staggered tab, folders overlap,
 * and a dark base closes the stack. Interactive: click a folder (tab or
 * header) to open it — a light sheet drops out with the fields, a wide
 * horizontal plant band woven between the text and the mockup, and a mockup
 * built for that product. An × closes it.
 *
 * Aithority is NOT here: it's the cofounder project, with its own section.
 */

import { useState } from 'react'
import { PlantCanvas } from './plant-canvas'
import { BlockFlowMockup } from './mockups/blockflow-mockup'
import { LouvrMockup } from './mockups/louvr-mockup'
import { RostryMockup } from './mockups/rostry-mockup'
import { VoleaMockup } from './mockups/volea-mockup'
import { SmashMockup } from './mockups/smash-mockup'
import { CASES, LIGHT, type CaseStudy, type LightProject } from './copy'

const TERRA = '#C1663D'
const OK = '#3F7A4E'

const MOCKUP: Record<string, React.ComponentType> = {
  blockflow: BlockFlowMockup,
  'louvr-labs': LouvrMockup,
  rostry: RostryMockup,
}

// Light projects keyed by name — same "live" mockup slot as the deep cases.
const MOCKUP_LIGHT: Record<string, React.ComponentType> = {
  Volea: VoleaMockup,
  SMASH: SmashMockup,
}

// Staggered tab positions per folder — the file-drawer look.
const LEFTS = ['4%', '23%', '42%', '13%', '32%']

function CloseIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden>
      <path d="M1 1l9 9M10 1l-9 9" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}
function PlusIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
      <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

function StackChips({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {stack.map((s) => (
        <span key={s} className="border border-hair px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.06em] text-fg-dim">
          {s}
        </span>
      ))}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-faint">{label}</p>
      <div className="mt-1.5">{children}</div>
    </div>
  )
}

/** Wide horizontal plant band. Mirror makes a two-sided crown (wide, low), and
 *  cover fills the whole strip — with a wide plant it fills edge-to-edge at a
 *  good size instead of sitting small in the middle. Taller band so the cover
 *  crop keeps most of the foliage. */
function PlantBand({ seed }: { seed: number }) {
  return (
    <div className="relative h-[180px] w-full overflow-hidden border border-line bg-raised sm:h-[210px]">
      <PlantCanvas seed={seed} len={360} depth={5} anchor="center" growAngle={2.82} mirror fit="cover" color="#151412" className="pointer-events-none absolute inset-0 h-full w-full" />
      <span className="absolute bottom-2 left-3 font-mono text-[8.5px] uppercase tracking-[0.14em] text-fg-faint">Fig. {String(seed).slice(0, 2)} · procedural</span>
    </div>
  )
}

function Sheet({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
      <div className="overflow-hidden">
        <div className="border-t border-hair">{children}</div>
      </div>
    </div>
  )
}

/** One folder: staggered tab + rounded-top body, overlapping the previous. */
function Folder({
  index,
  left,
  name,
  tagline,
  statusText,
  statusTone,
  z,
  first,
  children,
}: {
  index: string
  left: string
  name: string
  tagline: string
  statusText: string
  statusTone: string
  z: number
  first: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`relative ${first ? '' : '-mt-3'}`} style={{ zIndex: open ? 50 : z }}>
      {/* Tab */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="absolute -top-[19px] left-[var(--l)] flex h-[20px] items-center gap-2 rounded-t-[7px] border border-b-0 border-ink bg-bg px-3 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink"
        style={{ '--l': left } as React.CSSProperties}
      >
        <span className="text-accent">{index}</span>
        <span className="hidden sm:inline">{name}</span>
      </button>

      {/* Body */}
      <div className={`rounded-t-[18px] border border-b-0 border-ink ${open ? 'bg-bg' : 'bg-surface'}`}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="peek-row flex w-full items-center justify-between gap-4 px-5 pb-6 pt-7 text-left sm:px-7"
        >
          <div className="min-w-0">
            <p className="truncate text-[16px] font-medium text-ink">{name}</p>
            <p className="mt-1 truncate font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: TERRA }}>
              {tagline}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden items-center gap-1.5 whitespace-nowrap border px-1.5 py-[3px] font-mono text-[9px] uppercase tracking-[0.08em] sm:inline-flex" style={{ borderColor: statusTone, color: statusTone }}>
              <span className="h-1 w-1" style={{ backgroundColor: statusTone }} aria-hidden />
              {statusText}
            </span>
            <span className="text-fg-dim">{open ? <CloseIcon /> : <PlusIcon />}</span>
          </div>
        </button>
        <Sheet open={open}>{children}</Sheet>
      </div>
    </div>
  )
}

function DeepFolder({ caso, index, left, z, first }: { caso: CaseStudy; index: string; left: string; z: number; first: boolean }) {
  const tone = caso.status.tone === 'ok' ? OK : TERRA
  const Mockup = MOCKUP[caso.slug]
  return (
    <div id={caso.slug} className="scroll-mt-20">
      <Folder index={index} left={left} name={caso.name} tagline={caso.tagline} statusText={caso.status.text} statusTone={tone} z={z} first={first}>
        <div className="px-5 pb-8 pt-5 sm:px-7">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Problem">
              <p className="text-[13.5px] leading-relaxed text-fg-muted">{caso.problem}</p>
            </Field>
            <Field label="Approach">
              <ul className="space-y-2">
                {caso.approach.map((e, i) => (
                  <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-fg-muted">
                    <span className="mt-[6px] h-1 w-1 shrink-0 bg-accent" aria-hidden />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </Field>
          </div>

          <div className="my-7">
            <PlantBand seed={caso.seed} />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Technical decisions">
              <div className="space-y-3">
                {caso.decisions.map((d) => (
                  <div key={d.title}>
                    <p className="text-[12.5px] font-medium text-ink">{d.title}</p>
                    <p className="mt-0.5 text-[12.5px] leading-relaxed text-fg-muted">{d.detail}</p>
                  </div>
                ))}
              </div>
            </Field>
            <div className="flex flex-col justify-between gap-4">
              <Field label="Result">
                <p className="text-[13.5px] leading-relaxed text-ink">{caso.result}</p>
              </Field>
              <Field label="Stack">
                <StackChips stack={caso.stack} />
              </Field>
            </div>
          </div>

          {Mockup && (
            <div className="mt-7">
              <p className="mb-3 font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-faint">How it works, live</p>
              <Mockup />
            </div>
          )}
        </div>
      </Folder>
    </div>
  )
}

function LightFolder({ p, index, left, z }: { p: LightProject; index: string; left: string; z: number }) {
  const tone = p.status.toLowerCase().includes('production') ? OK : TERRA
  const Mockup = MOCKUP_LIGHT[p.name]
  return (
    <Folder index={index} left={left} name={p.name} tagline={p.tagline} statusText={p.status} statusTone={tone} z={z} first={false}>
      <div className="px-5 pb-8 pt-5 sm:px-7">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="What it is">
            <p className="text-[13.5px] leading-relaxed text-fg-muted">{p.blurb}</p>
          </Field>
          <Field label="At a glance">
            <div className="space-y-2.5">
              {p.fields.map((f) => (
                <div key={f.label} className="flex gap-3 text-[12.5px] leading-relaxed">
                  <span className="w-[92px] shrink-0 font-mono text-[10.5px] uppercase tracking-[0.12em] text-fg-faint">
                    {f.label}
                  </span>
                  <span className="text-ink">{f.value}</span>
                </div>
              ))}
            </div>
          </Field>
        </div>
        <div className="my-6">
          <PlantBand seed={p.seed} />
        </div>
        <StackChips stack={p.stack} />

        {Mockup && (
          <div className="mt-7">
            <p className="mb-3 font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-faint">How it works, live</p>
            <Mockup />
          </div>
        )}
      </div>
    </Folder>
  )
}

export function ProjectArchive() {
  const total = CASES.length + LIGHT.length
  return (
    <div className="relative pt-7">
      {CASES.map((c, i) => (
        <DeepFolder key={c.slug} caso={c} index={c.index} left={LEFTS[i % LEFTS.length]} z={i + 1} first={i === 0} />
      ))}
      {LIGHT.map((p, i) => {
        const idx = CASES.length + i
        return <LightFolder key={p.name} p={p} index={`0${idx + 1}`} left={LEFTS[idx % LEFTS.length]} z={idx + 1} />
      })}

      {/* Dark base — closes the stack */}
      <div className="relative -mt-3 rounded-t-[18px] bg-ink px-5 py-6 text-bg sm:px-7" style={{ zIndex: total + 1 }}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em]">Every line above is real — in production or on the App Store.</p>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em]" style={{ color: TERRA }}>Built solo, end to end</p>
        </div>
      </div>
    </div>
  )
}
