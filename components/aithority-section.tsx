'use client'

/**
 * Aithority — aparte del archivador, a propósito: es el proyecto de cofundador
 * en marcha, la "otra mitad del perfil" (construir con IA + entender su
 * gobernanza). Lleva su propio expediente con DOS visuales que enseñan el
 * producto: el dashboard de cumplimiento y el árbol de info del motor de
 * clasificación. No es un trabajo cerrado más, así que no comparte fila.
 */

import { AithorityMockup } from './mockups/aithority-mockup'
import { AithorityTree } from './mockups/aithority-tree'
import { AITHORITY_CASO as C } from './copy'

const TERRA = '#C1663D'

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
    <section id="aithority" className="border-t border-line bg-raised py-16 sm:py-24 scroll-mt-16">
      <div className="container-page">
        {/* Cabecera del expediente */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-5">
          <div>
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: TERRA }}>
              <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-dot" aria-hidden />
              Actualmente construyendo · cofundador técnico
            </p>
            <h2 className="display mt-3 text-[clamp(2rem,5vw,3.2rem)] font-medium text-ink">Aithority</h2>
            <p className="mt-2 max-w-[54ch] text-[15px] leading-relaxed text-fg-muted">{C.tagline}</p>
          </div>
          <span
            className="inline-flex shrink-0 items-center gap-1.5 border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em]"
            style={{ borderColor: TERRA, color: TERRA }}
          >
            <span className="h-1 w-1" style={{ backgroundColor: TERRA }} aria-hidden />
            {C.estado.texto}
          </span>
        </div>

        {/* Por qué está aparte */}
        <p className="mt-6 max-w-[70ch] text-[15px] leading-relaxed text-fg-muted">
          No es solo otro producto: es la otra mitad del perfil. Construir con IA no basta si no entiendes también
          sus implicaciones regulatorias y de gobernanza — y eso es exactamente lo que Aithority obliga a dominar.
        </p>

        {/* Ficha */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Field label="Problema">
            <p className="text-[13.5px] leading-relaxed text-fg-muted">{C.problema}</p>
          </Field>
          <Field label="Enfoque">
            <ul className="space-y-2">
              {C.enfoque.map((e, i) => (
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
          <p className="mb-3 font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-faint">El dashboard · cómo se ve</p>
          <AithorityMockup />
        </div>

        {/* Árbol de info */}
        <div className="mt-8">
          <p className="mb-3 font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-faint">El motor · cómo razona</p>
          <AithorityTree />
        </div>

        {/* Decisiones + stack */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Field label="Decisiones técnicas">
            <div className="space-y-3">
              {C.decisiones.map((d) => (
                <div key={d.titulo}>
                  <p className="text-[12.5px] font-medium text-ink">{d.titulo}</p>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-fg-muted">{d.detalle}</p>
                </div>
              ))}
            </div>
          </Field>
          <div className="flex flex-col gap-4">
            <Field label="Resultado">
              <p className="text-[13.5px] leading-relaxed text-ink">{C.resultado}</p>
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
