'use client'

/**
 * El trabajo, como un ÚNICO archivador (no carpetas sueltas): una pestaña
 * arriba, un solo borde de tinta alrededor, y dentro las filas separadas por
 * hairlines — misma idea que el folder-stack de StackD pero interactivo.
 *
 * Cerrada, cada fila es una línea del índice. En desktop, pasar el cursor la
 * levanta un pelo (pista de que se abre) sin desplegar nada; en móvil, que no
 * tiene hover, se toca y se abre. Abierta: sale una hoja con la ilustración
 * de planta (vertical, estrecha, propia de cada proyecto), la ficha, y un
 * mockup que de verdad representa ese producto — árbol donde encaja, tabla,
 * flujo o dashboard donde no. Un botón × cierra.
 */

import { useState } from 'react'
import { PlantCanvas } from './plant-canvas'
import { BlockFlowMockup } from './mockups/blockflow-mockup'
import { LouvrMockup } from './mockups/louvr-mockup'
import { RostryMockup } from './mockups/rostry-mockup'
import { AithorityMockup } from './mockups/aithority-mockup'
import { CASOS, LIGEROS, type CaseStudy, type ProyectoLigero } from './copy'

const TERRA = '#C1663D'
const OK = '#3F7A4E'

const MOCKUP: Record<string, React.ComponentType> = {
  blockflow: BlockFlowMockup,
  'louvr-labs': LouvrMockup,
  rostry: RostryMockup,
  aithority: AithorityMockup,
}

// Ángulo casi vertical: las plantas de las tarjetas crecen hacia arriba en
// columnas estrechas, en vez del barrido apaisado del hero.
const VERT = -1.55

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

function RowHeader({
  open,
  onToggle,
  index,
  nombre,
  tagline,
  estadoTexto,
  estadoTono,
  first,
}: {
  open: boolean
  onToggle: () => void
  index: string
  nombre: string
  tagline: string
  estadoTexto: string
  estadoTono: string
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
        <span className={`shrink-0 font-mono text-[10.5px] uppercase tracking-[0.14em] ${open ? 'text-[rgba(240,238,233,0.5)]' : 'text-fg-faint'}`}>
          {index}
        </span>
        <div className="min-w-0">
          <p className={`truncate text-[16px] font-medium ${open ? 'text-bg' : 'text-ink'}`}>{nombre}</p>
          <p className={`mt-0.5 truncate text-[12.5px] ${open ? 'text-[rgba(240,238,233,0.6)]' : 'text-fg-muted'}`}>{tagline}</p>
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
        <span className={open ? 'text-bg' : 'text-fg-dim'}>{open ? <CloseIcon /> : <PlusIcon />}</span>
      </div>
    </button>
  )
}

function Sheet({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
      <div className="overflow-hidden">
        <div className="border-t border-hair bg-raised">{children}</div>
      </div>
    </div>
  )
}

function DeepRow({ caso, first }: { caso: CaseStudy; first: boolean }) {
  const [open, setOpen] = useState(false)
  const tono = caso.estado.tono === 'ok' ? OK : TERRA
  const Mockup = MOCKUP[caso.slug]

  return (
    <div id={caso.slug} className="scroll-mt-20">
      <RowHeader
        open={open}
        onToggle={() => setOpen((v) => !v)}
        index={caso.index}
        nombre={caso.nombre}
        tagline={caso.tagline}
        estadoTexto={caso.estado.texto}
        estadoTono={tono}
        first={first}
      />
      <Sheet open={open}>
        <div className="grid gap-0 md:grid-cols-[150px_1fr]">
          {/* Planta vertical, estrecha, apoyada abajo */}
          <div className="flex items-end justify-center border-b border-hair bg-bg p-4 md:border-b-0 md:border-r">
            <PlantCanvas seed={caso.seed} len={360} depth={5} anchor="bottom" growAngle={VERT} color="#151412" className="block h-[200px] w-full md:h-[300px]" />
          </div>

          <div className="min-w-0 p-5 sm:p-7">
            <div className="grid gap-6 sm:grid-cols-2">
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

            {Mockup && (
              <div className="mt-7">
                <p className="mb-3 font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-faint">Cómo funciona, en vivo</p>
                <Mockup />
              </div>
            )}
          </div>
        </div>
      </Sheet>
    </div>
  )
}

function LightRow({ proyecto, index }: { proyecto: ProyectoLigero; index: string }) {
  const [open, setOpen] = useState(false)
  const tono = proyecto.estado.toLowerCase().includes('producción') ? OK : TERRA

  return (
    <div>
      <RowHeader
        open={open}
        onToggle={() => setOpen((v) => !v)}
        index={index}
        nombre={proyecto.nombre}
        tagline={proyecto.tagline}
        estadoTexto={proyecto.estado}
        estadoTono={tono}
        first={false}
      />
      <Sheet open={open}>
        <div className="grid gap-0 md:grid-cols-[130px_1fr]">
          <div className="flex items-end justify-center border-b border-hair bg-bg p-4 md:border-b-0 md:border-r">
            <PlantCanvas seed={proyecto.seed} len={280} depth={4} anchor="bottom" growAngle={VERT} color="#151412" className="block h-[150px] w-full md:h-[200px]" />
          </div>
          <div className="flex flex-col justify-center gap-4 p-5 sm:p-7">
            <p className="max-w-[52ch] text-[13.5px] leading-relaxed text-fg-muted">{proyecto.tagline}</p>
            <StackChips stack={proyecto.stack} />
          </div>
        </div>
      </Sheet>
    </div>
  )
}

export function ProjectArchive() {
  return (
    <div className="relative pt-[19px]">
      {/* Pestaña del archivador — una sola, para todo el bloque */}
      <div
        className="absolute -top-px left-0 flex h-[20px] items-center gap-2 rounded-t-[7px] border border-b-0 border-ink bg-bg px-3 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink"
        aria-hidden
      >
        <span className="text-accent">✦</span>
        <span>Trabajo · {CASOS.length + LIGEROS.length} proyectos</span>
      </div>

      <div className="overflow-hidden rounded-[18px] rounded-tl-none border border-ink bg-surface">
        {CASOS.map((c, i) => (
          <DeepRow key={c.slug} caso={c} first={i === 0} />
        ))}

        <div className="border-t border-ink bg-[rgba(21,20,18,0.045)] px-5 py-2 font-mono text-[9.5px] uppercase tracking-[0.16em] text-fg-dim sm:px-6">
          También shippeado
        </div>

        {LIGEROS.map((p, i) => (
          <LightRow key={p.nombre} proyecto={p} index={`0${CASOS.length + i + 1}`} />
        ))}
      </div>
    </div>
  )
}
