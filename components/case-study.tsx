import type { CaseStudy } from './copy'

const TONO = {
  ok: { c: '#3F7A4E' },
  accent: { c: '#C1663D' },
} as const

export function CaseStudySection({ caso, reverse }: { caso: CaseStudy; reverse?: boolean }) {
  const tono = TONO[caso.estado.tono]

  return (
    <div className="panel-live border-t border-line py-14 first:border-t-0 sm:py-20" id={caso.slug}>
      <div className="mb-8 flex items-start justify-between gap-6 sm:mb-12">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">Caso {caso.index}</p>
          <h3 className="display mt-2 text-[clamp(1.8rem,4vw,2.7rem)] font-medium text-ink">{caso.nombre}</h3>
          <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-fg-muted">{caso.tagline}</p>
        </div>
        <span
          className="mt-1 inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em]"
          style={{ borderColor: tono.c, color: tono.c }}
        >
          <span className="h-1 w-1" style={{ backgroundColor: tono.c }} aria-hidden />
          {caso.estado.texto}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
        {/* Narrativa */}
        <div className={`lg:col-span-3 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="border border-line bg-surface/60 p-5 sm:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">Problema</p>
            <p className="mt-2 text-[14.5px] leading-relaxed text-fg-muted">{caso.problema}</p>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">Enfoque</p>
            <ul className="mt-2 space-y-2.5">
              {caso.enfoque.map((e, i) => (
                <li key={i} className="flex gap-2.5 text-[14.5px] leading-relaxed text-fg-muted">
                  <span className="mt-[7px] h-1 w-1 shrink-0 bg-accent" aria-hidden />
                  <span>{e}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">Resultado</p>
            <p className="mt-2 text-[14.5px] leading-relaxed text-ink">{caso.resultado}</p>
          </div>
        </div>

        {/* Ficha técnica: decisiones + stack */}
        <div className={`lg:col-span-2 ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="border border-line bg-ink text-bg">
            <div className="border-b border-[rgba(240,238,233,0.14)] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[rgba(240,238,233,0.6)]">
              Decisiones técnicas
            </div>
            <div className="divide-y divide-[rgba(240,238,233,0.1)]">
              {caso.decisiones.map((d) => (
                <div key={d.titulo} className="px-5 py-4">
                  <p className="text-[13px] font-medium text-bg">{d.titulo}</p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-[rgba(240,238,233,0.68)]">{d.detalle}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-[rgba(240,238,233,0.14)] px-5 py-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[rgba(240,238,233,0.5)]">Stack</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {caso.stack.map((s) => (
                  <span
                    key={s}
                    className="border border-[rgba(240,238,233,0.22)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-[rgba(240,238,233,0.85)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
