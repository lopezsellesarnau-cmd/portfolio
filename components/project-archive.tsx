'use client'

/**
 * Work as a STACK OF FOLDERS. Five cases only. Click tab or header to open:
 * what it is, how it was developed, product decisions, mockup.
 *
 * 40px top radius stays. Side spines (1px) close the notch where the curve
 * meets the sheet above. Open state lives on the stack so the next file
 * stops tucking up and cannot paint over the open sheet.
 */

import { useState } from 'react'
import { CASES, type CaseStudy } from './copy'
import { KibloMockup } from './mockups/kiblo-mockup'
import { BlockFlowMockup } from './mockups/blockflow-mockup'
import { DrossMockup } from './mockups/dross-mockup'
import { TraceMockup } from './mockups/trace-mockup'
import { AithorityMockup } from './mockups/aithority-mockup'
import { AithorityTree } from './mockups/aithority-tree'

const TERRA = '#B8433F'
const OK = '#3F7A4E'

const MOCKUP: Record<string, React.ComponentType> = {
  kiblo: KibloMockup,
  blockflow: BlockFlowMockup,
  dross: DrossMockup,
  trace: TraceMockup,
  aithority: AithorityMockup,
}

const LEFTS = ['6%', '18%', '30%', '42%', '54%']

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

/** Vertical ink from the file below, filling the 40px-radius notch. */
function Spines({ tucked }: { tucked: boolean }) {
  return (
    <>
      <span
        className={`pointer-events-none absolute left-0 z-[1] w-px bg-ink ${tucked ? 'top-2 h-8' : 'top-0 h-10'}`}
        aria-hidden
      />
      <span
        className={`pointer-events-none absolute right-0 z-[1] w-px bg-ink ${tucked ? 'top-2 h-8' : 'top-0 h-10'}`}
        aria-hidden
      />
    </>
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

function Sheet({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
      <div className="overflow-hidden">
        <div className="border-t border-hair">{children}</div>
      </div>
    </div>
  )
}

function Folder({
  index,
  left,
  name,
  role,
  tagline,
  statusText,
  statusTone,
  z,
  first,
  tuck,
  open,
  onToggle,
  children,
}: {
  index: string
  left: string
  name: string
  role: string
  tagline: string
  statusText: string
  statusTone: string
  z: number
  first: boolean
  tuck: boolean
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className={`relative ${first ? '' : tuck ? '-mt-2' : 'pt-6'}`} style={{ zIndex: z }}>
      {!first && <Spines tucked={tuck} />}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="absolute -top-[24px] left-[var(--l)] flex h-[24px] items-center gap-2 rounded-t-[20px] border border-b-0 border-ink bg-bg px-3.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink"
        style={{ '--l': left } as React.CSSProperties}
      >
        <span className="text-accent">{index}</span>
        <span className="hidden sm:inline">{name}</span>
      </button>

      <div className={`overflow-hidden rounded-t-[40px] border border-b-0 border-ink ${open ? 'bg-bg' : 'bg-surface'}`}>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="peek-row flex w-full items-center justify-between gap-4 px-5 pb-5 pt-6 text-left sm:px-7"
        >
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">{role}</p>
            <p className="mt-1 truncate text-[16px] font-medium text-ink">{name}</p>
            <p className="mt-1 truncate font-mono text-[10px] uppercase tracking-[0.1em] text-fg-dim">{tagline}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden items-center gap-1.5 whitespace-nowrap rounded-[6px] border px-1.5 py-[3px] font-mono text-[9px] uppercase tracking-[0.08em] sm:inline-flex" style={{ borderColor: statusTone, color: statusTone }}>
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

function DeepFolder({
  caso,
  index,
  left,
  z,
  first,
  tuck,
  open,
  onToggle,
}: {
  caso: CaseStudy
  index: string
  left: string
  z: number
  first: boolean
  tuck: boolean
  open: boolean
  onToggle: () => void
}) {
  const tone = caso.status.tone === 'ok' ? OK : TERRA
  const Mockup = MOCKUP[caso.slug]
  return (
    <div id={caso.slug} className="scroll-mt-20">
      <Folder
        index={index}
        left={left}
        name={caso.name}
        role={caso.role}
        tagline={caso.tagline}
        statusText={caso.status.text}
        statusTone={tone}
        z={z}
        first={first}
        tuck={tuck}
        open={open}
        onToggle={onToggle}
      >
        <div className="px-5 pb-8 pt-5 sm:px-7">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="What it is">
              <p className="text-[13.5px] leading-relaxed text-fg-muted">{caso.what}</p>
            </Field>
            <Field label="How it was developed">
              <p className="text-[13.5px] leading-relaxed text-fg-muted">{caso.built}</p>
            </Field>
          </div>

          <div className="mt-7">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-faint">Product decisions</p>
            <dl className="mt-3 divide-y divide-hair border-y border-hair">
              {caso.decisions.map((d) => (
                <div key={d.title} className="grid gap-1 py-3 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-6">
                  <dt className="text-[13px] font-medium text-ink">{d.title}</dt>
                  <dd className="text-[13px] leading-relaxed text-fg-muted">{d.detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <Field label="Stack">
              <StackChips stack={caso.stack} />
            </Field>
            {caso.link && (
              <a
                href={caso.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 border border-ink px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-bg"
              >
                {caso.linkLabel ?? 'Open repository'} ↗
              </a>
            )}
          </div>

          {Mockup && (
            <div className="mt-7">
              <p className="mb-3 font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-faint">
                {caso.slug === 'aithority' ? 'Dashboard' : 'Mockup'}
              </p>
              <Mockup />
            </div>
          )}
          {caso.slug === 'aithority' && (
            <div className="mt-8">
              <p className="mb-3 font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-faint">The engine</p>
              <AithorityTree />
            </div>
          )}
        </div>
      </Folder>
    </div>
  )
}

export function ProjectArchive() {
  const total = CASES.length
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const lastOpen = openSlug === CASES[total - 1].slug

  return (
    <div className="relative pt-9">
      {CASES.map((c, i) => {
        const prevSlug = i === 0 ? null : CASES[i - 1].slug
        const tuck = i > 0 && openSlug !== prevSlug
        return (
          <DeepFolder
            key={c.slug}
            caso={c}
            index={c.index}
            left={LEFTS[i % LEFTS.length]}
            z={i + 1}
            first={i === 0}
            tuck={tuck}
            open={openSlug === c.slug}
            onToggle={() => setOpenSlug((s) => (s === c.slug ? null : c.slug))}
          />
        )
      })}

      <div className={`relative ${lastOpen ? 'pt-6' : '-mt-2'}`} style={{ zIndex: total + 1 }}>
        <Spines tucked={!lastOpen} />
        <div className="overflow-hidden rounded-t-[40px] bg-ink px-5 py-5 text-bg sm:px-7">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.16em]">Five products — founder and technical cofounder.</p>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.16em]" style={{ color: TERRA }}>
              Design + engineering, same person
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
