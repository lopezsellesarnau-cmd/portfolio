'use client'

/**
 * Cada proyecto es una carpeta cerrada — misma familia visual que el
 * archivador de StackD (pestaña + cuerpo redondeado, borde tinta), pero
 * interactiva: en desktop, pasar el cursor da una pista de que se puede
 * abrir (se levanta un poco) sin desplegar nada todavía; en móvil no hay
 * hover, así que se toca y se abre directo. Al abrir sale una hoja en
 * horizontal con la ficha del proyecto y, en los tres casos a fondo, un
 * diagrama propio — no el mismo árbol repetido con otro texto.
 */

import { useState } from 'react'
import { PlantCanvas } from './plant-canvas'
import { BlockFlowTree } from './diagrams/blockflow-tree'
import { LouvrTree } from './diagrams/louvr-tree'
import { RostryTree } from './diagrams/rostry-tree'
import type { CaseStudy, ProyectoLigero } from './copy'

const TERRA = '#C1663D'
const OK = '#3F7A4E'

const DIAGRAMA: Record<string, React.ComponentType> = {
  blockflow: BlockFlowTree,
  'louvr-labs': LouvrTree,
  rostry: RostryTree,
}

function CloseIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden>
      <path d="M1 1l9 9M10 1l-9 9" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`} aria-hidden>
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

/** Pestaña + cabecera de la carpeta — el mismo par que en folder-stack.tsx. */
function Tab({
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
    <div className="relative pt-[19px]">
      <div
        className="absolute -top-px left-0 flex h-[20px] items-center gap-2 rounded-t-[7px] border border-b-0 border-ink bg-bg px-3 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink"
        aria-hidden
      >
        {index && <span className="text-accent">{index}</span>}
        <span className="hidden sm:inline">{nombre}</span>
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`peek-hover flex w-full items-center justify-between gap-4 rounded-t-[18px] border border-ink px-5 py-4 text-left transition-transform duration-300 sm:px-7 ${
          open ? 'bg-ink' : 'bg-surface'
        }`}
      >
        <div className="min-w-0">
          <p className={`truncate text-[16px] font-medium ${open ? 'text-bg' : 'text-ink'}`}>{nombre}</p>
          <p className={`mt-0.5 truncate text-[12.5px] ${open ? 'text-[rgba(240,238,233,0.6)]' : 'text-fg-muted'}`}>{tagline}</p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span
            className="hidden items-center gap-1.5 whitespace-nowrap border px-1.5 py-[3px] font-mono text-[9px] uppercase tracking-[0.08em] sm:inline-flex"
            style={{ borderColor: estadoTono, color: estadoTono }}
          >
            <span className="h-1 w-1" style={{ backgroundColor: estadoTono }} aria-hidden />
            {estadoTexto}
          </span>
          <span className={open ? 'text-bg' : 'text-fg-dim'}>{open ? <CloseIcon /> : <PlusIcon open={open} />}</span>
        </div>
      </button>
    </div>
  )
}

/** El cuerpo se abre como una hoja: bordes redondeados a juego con la
 *  carpeta, apoyada justo debajo de la pestaña. */
function Sheet({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
      <div className="overflow-hidden">
        <div className="rounded-b-[18px] border border-t-0 border-ink bg-surface">{children}</div>
      </div>
    </div>
  )
}

export function ProjectFileDeep({ caso }: { caso: CaseStudy }) {
  const [open, setOpen] = useState(false)
  const tono = caso.estado.tono === 'ok' ? OK : TERRA
  const Diagrama = DIAGRAMA[caso.slug]

  return (
    <div className="mb-6 last:mb-0">
      <Tab
        open={open}
        onToggle={() => setOpen((v) => !v)}
        index={caso.index}
        nombre={caso.nombre}
        tagline={caso.tagline}
        estadoTexto={caso.estado.texto}
        estadoTono={tono}
      />
      <Sheet open={open}>
        <div className="grid gap-0 sm:grid-cols-[minmax(0,240px)_1fr]">
          <div className="flex items-center justify-center border-b border-line bg-raised p-6 sm:border-b-0 sm:border-r">
            <PlantCanvas seed={caso.seed} len={340} depth={5} anchor="center" color="#151412" className="block h-[160px] w-full sm:h-[220px]" />
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

        {Diagrama && (
          <div className="border-t border-line p-6 sm:p-8">
            <p className="mb-4 font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-faint">Cómo decide, en vivo</p>
            <Diagrama />
          </div>
        )}
      </Sheet>
    </div>
  )
}

export function ProjectFileLight({ proyecto, index }: { proyecto: ProyectoLigero; index: string }) {
  const [open, setOpen] = useState(false)
  const tono = proyecto.estado.toLowerCase().includes('producción') ? OK : TERRA

  return (
    <div className="mb-6 last:mb-0">
      <Tab
        open={open}
        onToggle={() => setOpen((v) => !v)}
        index={index}
        nombre={proyecto.nombre}
        tagline={proyecto.tagline}
        estadoTexto={proyecto.estado}
        estadoTono={tono}
      />
      <Sheet open={open}>
        <div className="grid gap-0 sm:grid-cols-[minmax(0,220px)_1fr]">
          <div className="flex items-center justify-center border-b border-line bg-raised p-5 sm:border-b-0 sm:border-r">
            <PlantCanvas seed={proyecto.seed} len={260} depth={4} anchor="center" color="#151412" className="block h-[140px] w-full sm:h-[160px]" />
          </div>
          <div className="flex flex-col justify-center gap-4 p-6 sm:p-7">
            <p className="max-w-[52ch] text-[13.5px] leading-relaxed text-fg-muted">{proyecto.tagline}</p>
            <StackChips stack={proyecto.stack} />
          </div>
        </div>
      </Sheet>
    </div>
  )
}
