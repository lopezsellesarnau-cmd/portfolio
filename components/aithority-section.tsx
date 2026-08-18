'use client'

/**
 * Aithority — deliberately apart from the archive: it's the ongoing cofounder
 * project, the "other half" of the profile (building with AI + understanding
 * its governance). It gets its own dossier with the two visuals that show the
 * product: the compliance dashboard panel and the classification info-tree.
 */

import { AithorityMockup } from './mockups/aithority-mockup'
import { AithorityTree } from './mockups/aithority-tree'
import { AITHORITY_CASE as C } from './copy'

const TERRA = '#B8433F'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-faint">{label}</p>
      <div className="mt-1.5">{children}</div>
    </div>
  )
}

export function AithoritySection() {
  return (
    <section id="aithority" className="scroll-mt-16 border-t border-line bg-bg py-16 sm:py-24">
      <div className="container-page">
        {/* Dossier header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-5">
          <div>
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: TERRA }}>
              <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-dot" aria-hidden />
              Currently building · technical cofounder
            </p>
            <h2 className="display mt-3 text-[clamp(2rem,5vw,3.2rem)] font-medium text-ink">Aithority</h2>
            <p className="mt-2 max-w-[54ch] text-[15px] leading-relaxed text-fg-muted">{C.tagline}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em]" style={{ borderColor: TERRA, color: TERRA }}>
            <span className="h-1 w-1" style={{ backgroundColor: TERRA }} aria-hidden />
            {C.status.text}
          </span>
        </div>

        <p className="mt-6 max-w-[70ch] text-[15px] leading-relaxed text-fg-muted">
          Not just another product: it&apos;s the other half of the profile. Building with AI isn&apos;t enough if you
          don&apos;t also understand its regulatory and governance implications — and that&apos;s exactly what Aithority
          forces you to master.
        </p>

        {/* Fields */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Field label="Problem">
            <p className="text-[13.5px] leading-relaxed text-fg-muted">{C.problem}</p>
          </Field>
          <Field label="Approach">
            <ul className="space-y-2">
              {C.approach.map((e, i) => (
                <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-fg-muted">
                  <span className="mt-[6px] h-1 w-1 shrink-0 bg-accent" aria-hidden />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </Field>
        </div>

        {/* Dashboard */}
        <div className="mt-10">
          <p className="mb-3 font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-faint">The dashboard · how it looks</p>
          <AithorityMockup />
        </div>

        {/* Info tree */}
        <div className="mt-8">
          <p className="mb-3 font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-faint">The engine · how it reasons</p>
          <AithorityTree />
        </div>

        {/* Decisions + stack */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Field label="Technical decisions">
            <div className="space-y-3">
              {C.decisions.map((d) => (
                <div key={d.title}>
                  <p className="text-[12.5px] font-medium text-ink">{d.title}</p>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-fg-muted">{d.detail}</p>
                </div>
              ))}
            </div>
          </Field>
          <div className="flex flex-col gap-4">
            <Field label="Result">
              <p className="text-[13.5px] leading-relaxed text-ink">{C.result}</p>
            </Field>
            <Field label="Stack">
              <div className="flex flex-wrap gap-1.5">
                {C.stack.map((s) => (
                  <span key={s} className="border border-hair px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.06em] text-fg-dim">
                    {s}
                  </span>
                ))}
              </div>
            </Field>
          </div>
        </div>
      </div>
    </section>
  )
}
