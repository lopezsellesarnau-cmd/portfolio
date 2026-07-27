'use client'

/**
 * Work as ONE folder — a real folder shape (tab + rounded body, ink border,
 * bone/light, like the folder-stack I built earlier), not a black box. Closed,
 * each row is a line of the index; hovering lifts the hint on desktop, tap
 * opens on mobile. Open, the row inverts to ink and a light sheet drops out
 * with the fields, a full-width horizontal plant band woven between the text
 * and the mockup (like Aithority's /lab dashboard tree), and a mockup built
 * for that product. An × closes it.
 *
 * Aithority is NOT here: it's the cofounder project and has its own section.
 */

import { useState } from 'react'
import { PlantCanvas } from './plant-canvas'
import { BlockFlowMockup } from './mockups/blockflow-mockup'
import { LouvrMockup } from './mockups/louvr-mockup'
import { RostryMockup } from './mockups/rostry-mockup'
import { CASES, LIGHT, type CaseStudy, type LightProject } from './copy'

const TERRA = '#C1663D'
const OK = '#3F7A4E'

const MOCKUP: Record<string, React.ComponentType> = {
  blockflow: BlockFlowMockup,
  'louvr-labs': LouvrMockup,
  rostry: RostryMockup,
}

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

/** Full-width horizontal plant band, woven into the content flow. */
function PlantBand({ seed }: { seed: number }) {
  return (
    <div className="relative h-[130px] w-full overflow-hidden border border-line bg-raised sm:h-[150px]">
      <PlantCanvas seed={seed} len={430} depth={5} anchor="center" fit="cover" color="#151412" className="pointer-events-none absolute inset-0 h-full w-full opacity-90" />
      <span className="absolute bottom-2 left-3 font-mono text-[8.5px] uppercase tracking-[0.14em] text-fg-faint">Fig. {String(seed).slice(0, 2)} · procedural</span>
    </div>
  )
}

function RowHeader({
  open,
  onToggle,
  index,
  name,
  tagline,
  statusText,
  statusTone,
  first,
}: {
  open: boolean
  onToggle: () => void
  index: string
  name: string
  tagline: string
  statusText: string
  statusTone: string
  first: boolean
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className={`peek-row flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 ${first ? '' : 'border-t border-hair'} ${
        open ? 'bg-ink' : 'bg-transparent'
      }`}
    >
      <div className="flex min-w-0 items-center gap-4">
        <span className={`shrink-0 font-mono text-[10.5px] uppercase tracking-[0.14em] ${open ? 'text-[rgba(240,238,233,0.5)]' : 'text-fg-faint'}`}>{index}</span>
        <div className="min-w-0">
          <p className={`truncate text-[16px] font-medium ${open ? 'text-bg' : 'text-ink'}`}>{name}</p>
          <p className={`mt-0.5 truncate text-[12.5px] ${open ? 'text-[rgba(240,238,233,0.6)]' : 'text-fg-muted'}`}>{tagline}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span
          className="hidden items-center gap-1.5 whitespace-nowrap border px-1.5 py-[3px] font-mono text-[9px] uppercase tracking-[0.08em] sm:inline-flex"
          style={{ borderColor: statusTone, color: statusTone }}
        >
          <span className="h-1 w-1" style={{ backgroundColor: statusTone }} aria-hidden />
          {statusText}
        </span>
        <span className={open ? 'text-bg' : 'text-fg-dim'}>{open ? <CloseIcon /> : <PlusIcon />}</span>
      </div>
    </button>
  )
}

function Sheet({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
      <div className="overflow-hidden">
        <div className="border-t border-hair bg-bg">{children}</div>
      </div>
    </div>
  )
}

function DeepRow({ caso, first }: { caso: CaseStudy; first: boolean }) {
  const [open, setOpen] = useState(false)
  const tone = caso.status.tone === 'ok' ? OK : TERRA
  const Mockup = MOCKUP[caso.slug]

  return (
    <div id={caso.slug} className="scroll-mt-20">
      <RowHeader open={open} onToggle={() => setOpen((v) => !v)} index={caso.index} name={caso.name} tagline={caso.tagline} statusText={caso.status.text} statusTone={tone} first={first} />
      <Sheet open={open}>
        <div className="p-5 sm:p-7">
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

          {/* Horizontal plant band, between the text and the mockup */}
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
      </Sheet>
    </div>
  )
}

function LightRow({ proyecto, index }: { proyecto: LightProject; index: string }) {
  const [open, setOpen] = useState(false)
  const tone = proyecto.status.toLowerCase().includes('production') ? OK : TERRA

  return (
    <div>
      <RowHeader open={open} onToggle={() => setOpen((v) => !v)} index={index} name={proyecto.name} tagline={proyecto.tagline} statusText={proyecto.status} statusTone={tone} first={false} />
      <Sheet open={open}>
        <div className="p-5 sm:p-7">
          <p className="max-w-[52ch] text-[13.5px] leading-relaxed text-fg-muted">{proyecto.tagline}</p>
          <div className="my-6">
            <PlantBand seed={proyecto.seed} />
          </div>
          <StackChips stack={proyecto.stack} />
        </div>
      </Sheet>
    </div>
  )
}

export function ProjectArchive() {
  return (
    <div className="relative pt-[19px]">
      {/* One folder tab for the whole block */}
      <div
        className="absolute -top-px left-0 flex h-[20px] items-center gap-2 rounded-t-[7px] border border-b-0 border-ink bg-bg px-3 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink"
        aria-hidden
      >
        <span className="text-accent">✦</span>
        <span>Work · {CASES.length + LIGHT.length} projects</span>
      </div>

      <div className="overflow-hidden rounded-[18px] rounded-tl-none border border-ink bg-surface">
        {CASES.map((c, i) => (
          <DeepRow key={c.slug} caso={c} first={i === 0} />
        ))}

        <div className="border-t border-ink bg-[rgba(21,20,18,0.045)] px-5 py-2 font-mono text-[9.5px] uppercase tracking-[0.16em] text-fg-dim sm:px-6">
          Also shipped
        </div>

        {LIGHT.map((p, i) => (
          <LightRow key={p.name} proyecto={p} index={`0${CASES.length + i + 1}`} />
        ))}
      </div>
    </div>
  )
}
