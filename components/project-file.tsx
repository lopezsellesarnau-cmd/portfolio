'use client'

/**
 * Cada proyecto es un archivo cerrado. En desktop, pasar el cursor por
 * encima da una pista de que se puede abrir (se levanta un poco, asoma una
 * rendija) — pero no se despliega hasta que se hace clic. En móvil no hay
 * hover, así que esa pista no existe: tocar abre directamente.
 *
 * Al abrir, se despliega en horizontal como una hoja técnica: la ilustración
 * de planta (semilla propia, ninguna se repite) a un lado, la ficha con los
 * campos al otro — mismo lenguaje que una portada de plano de arquitectura.
 */

import { useState } from 'react'
import { PlantCanvas } from './plant-canvas'
import type { CaseStudy, ProyectoLigero } from './copy'

const TERRA = '#C1663D'
const OK = '#3F7A4E'

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
      aria-hidden
    >
      <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1" />
    </svg>
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

function Header({
  open,
  onToggle,
  index,
  nombre,
  tagline,
  estadoTexto,
  estadoTono,
}: {
  open: boolean
  onToggle: () => void
  index?: string
  nombre: string
  tagline: string
  estadoTexto: string
  estadoTono: string
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className={`peek-hover group flex w-full items-center justify-between gap-4 border-b border-line px-5 py-4 text-left transition-transform duration-300 sm:px-7 ${
        open ? 'bg-ink' : 'bg-surface'
      }`}
    >
      <div className="flex min-w-0 items-center gap-4">
        {index && (
          <span
            className={`shrink-0 font-mono text-[10.5px] uppercase tracking-[0.14em] ${open ? 'text-[rgba(240,238,233,0.5)]' : 'text-fg-faint'}`}
          >
            {index}
          </span>
        )}
        <div className="min-w-0">
          <p className={`truncate text-[16px] font-medium ${open ? 'text-bg' : 'text-ink'}`}>{nombre}</p>
          <p className={`mt-0.5 truncate text-[12.5px] ${open ? 'text-[rgba(240,238,233,0.6)]' : 'text-fg-muted'}`}>
            {tagline}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span
          className="hidden items-center gap-1.5 whitespace-nowrap border px-1.5 py-[3px] font-mono text-[9px] uppercase tracking-[0.08em] sm:inline-flex"
          style={{ borderColor: estadoTono, color: estadoTono }}
        >
          <span className="h-1 w-1" style={{ backgroundColor: estadoTono }} aria-hidden />
          {estadoTexto}
        </span>
        <span className={open ? 'text-bg' : 'text-fg-dim'}>
          <Chevron open={open} />
        </span>
      </div>
    </button>
  )
}

export function ProjectFileDeep({ caso }: { caso: CaseStudy }) {
  const [open, setOpen] = useState(false)
  const tono = caso.estado.tono === 'ok' ? OK : TERRA

  return (
    <div className="border border-line border-t-0 first:border-t">
      <Header
        open={open}
        onToggle={() => setOpen((v) => !v)}
        index={caso.index}
        nombre={caso.nombre}
        tagline={caso.tagline}
        estadoTexto={caso.estado.texto}
        estadoTono={tono}
      />

      <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="grid gap-0 sm:grid-cols-[minmax(0,280px)_1fr]">
            <div className="flex items-center justify-center border-b border-line bg-raised p-6 sm:border-b-0 sm:border-r">
              <PlantCanvas seed={caso.seed} len={340} depth={5} anchor="center" color="#151412" className="block h-[180px] w-full sm:h-[240px]" />
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
              <Field label="Problema">
                <p className="text-[13.5px] leading-relaxed text-fg-muted">{caso.problema}</p>
              </Field>

              <Field label="Enfoque">
                <ul className="space-y-2">
                  {caso.enfoque.map((e, i) => (
                    <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-fg-muted">
                      <span className="mt-[6px] h-1 w-1 shrink-0 bg-accent" aria-hidden />
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </Field>

              <Field label="Decisiones técnicas">
                <div className="space-y-3">
                  {caso.decisiones.map((d) => (
                    <div key={d.titulo}>
                      <p className="text-[12.5px] font-medium text-ink">{d.titulo}</p>
                      <p className="mt-0.5 text-[12.5px] leading-relaxed text-fg-muted">{d.detalle}</p>
                    </div>
                  ))}
                </div>
              </Field>

              <div className="flex flex-col justify-between gap-4">
                <Field label="Resultado">
                  <p className="text-[13.5px] leading-relaxed text-ink">{caso.resultado}</p>
                </Field>
                <Field label="Stack">
                  <StackChips stack={caso.stack} />
                </Field>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProjectFileLight({ proyecto, index }: { proyecto: ProyectoLigero; index: string }) {
  const [open, setOpen] = useState(false)
  const tono = proyecto.estado.toLowerCase().includes('producción') ? OK : TERRA

  return (
    <div className="border border-line border-t-0 first:border-t">
      <Header
        open={open}
        onToggle={() => setOpen((v) => !v)}
        index={index}
        nombre={proyecto.nombre}
        tagline={proyecto.tagline}
        estadoTexto={proyecto.estado}
        estadoTono={tono}
      />

      <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="grid gap-0 sm:grid-cols-[minmax(0,220px)_1fr]">
            <div className="flex items-center justify-center border-b border-line bg-raised p-5 sm:border-b-0 sm:border-r">
              <PlantCanvas seed={proyecto.seed} len={260} depth={4} anchor="center" color="#151412" className="block h-[140px] w-full sm:h-[160px]" />
            </div>
            <div className="flex flex-col justify-center gap-4 p-6 sm:p-7">
              <p className="max-w-[52ch] text-[13.5px] leading-relaxed text-fg-muted">{proyecto.tagline}</p>
              <StackChips stack={proyecto.stack} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
