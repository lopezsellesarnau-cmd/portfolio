import { AITHORITY } from './copy'

export function AithorityBlurb() {
  return (
    <section id="aithority" className="border-t border-line bg-ink py-14 text-bg sm:py-16">
      <div className="container-page">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-[62ch]">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{AITHORITY.eyebrow}</p>
            <h3 className="display mt-2 text-[26px] font-medium text-bg sm:text-[32px]">{AITHORITY.nombre}</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-[rgba(240,238,233,0.72)]">{AITHORITY.texto}</p>
          </div>
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent pulse-dot" aria-hidden />
        </div>
      </div>
    </section>
  )
}
