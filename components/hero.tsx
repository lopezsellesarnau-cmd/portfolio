import { PERFIL, HERO_PLANT_SEED } from './copy'
import { PlantCanvas } from './plant-canvas'

/** Marcas técnicas decorativas — la crucecita, el marco y el cuadro damero. */
function Marks() {
  return (
    <div className="flex items-center gap-3 text-ink" aria-hidden>
      <svg width="20" height="20" viewBox="0 0 20 20">
        <path d="M10 2v16M2 10h16" stroke="currentColor" strokeWidth="1" />
      </svg>
      <svg width="18" height="18" viewBox="0 0 18 18">
        <rect x="1.5" y="1.5" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <svg width="18" height="18" viewBox="0 0 18 18">
        <rect x="0" y="0" width="9" height="9" fill="currentColor" />
        <rect x="9" y="9" width="9" height="9" fill="currentColor" />
      </svg>
    </div>
  )
}

function SpecField({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className="px-4 py-3 sm:px-5">
      <p className="font-mono text-[9px] uppercase leading-tight tracking-[0.14em] text-fg-faint">{label}</p>
      <p className={`mt-1 font-mono text-[22px] tabular-nums leading-none sm:text-[26px] ${accent ? 'text-accent' : 'text-ink'}`}>{value}</p>
      {sub && <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.1em] text-fg-dim">{sub}</p>}
    </div>
  )
}

export function Hero() {
  return (
    <section id="top" className="grain border-b border-line">
      {/* Franja damero superior */}
      <div className="checker h-3 w-full border-b border-ink" aria-hidden />

      <div className="container-page py-10 sm:py-14">
        <div className="relative border border-ink bg-surface">
          {/* Barra superior: TYPE · ubicación · disponible */}
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-ink px-5 py-3 sm:px-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
              <span className="text-fg-faint">Type:</span> Full-stack · AI product engineer
            </p>
            <p className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-fg-dim md:block">Barcelona · remoto · UE</p>
            <span className="bg-ink px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-bg">Disponible</span>
          </div>

          {/* Cuerpo: titular + gráfico */}
          <div className="grid gap-0 lg:grid-cols-[1.15fr_1fr]">
            <div className="border-b border-ink px-5 py-8 sm:px-7 sm:py-10 lg:border-b-0 lg:border-r">
              <p className="fade-up font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{PERFIL.eyebrow}</p>

              <h1 className="display fade-up mt-4 text-[clamp(2.5rem,6.5vw,4.6rem)] font-medium text-ink" style={{ animationDelay: '60ms' }}>
                Full-Stack AI
                <br />
                Product Engineer
                <span className="align-super text-[0.3em] text-accent"> ✦</span>
              </h1>

              <div className="fade-up mt-6 space-y-1.5" style={{ animationDelay: '120ms' }}>
                <p className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.1em] text-ink">
                  De la idea a producción <span className="text-fg-faint">&gt;&gt;&gt;&gt;&gt;&gt;</span>
                </p>
                <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-fg-dim">Construir · gobernar · shippear</p>
              </div>

              <p className="fade-up mt-5 max-w-[46ch] text-[15px] leading-relaxed text-fg-muted" style={{ animationDelay: '160ms' }}>
                {PERFIL.hero}
              </p>
              <p className="fade-up mt-2 max-w-[46ch] font-mono text-[11px] leading-relaxed text-fg-dim" style={{ animationDelay: '180ms' }}>
                {PERFIL.sub}
              </p>

              <div className="fade-up mt-7 flex flex-wrap gap-3" style={{ animationDelay: '220ms' }}>
                <a href="#trabajo" className="btn-solid">
                  Ver el trabajo
                </a>
                <a href="#contacto" className="btn-ghost">
                  Contacto
                </a>
              </div>
            </div>

            {/* Gráfico: el árbol largo (mismo que StackD/Aithority) + serial/status */}
            <div className="relative flex flex-col">
              <div className="grain relative min-h-[240px] flex-1 overflow-hidden">
                <PlantCanvas
                  seed={HERO_PLANT_SEED}
                  len={430}
                  depth={5}
                  anchor="center"
                  color="#151412"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                />
              </div>
              <div className="grid grid-cols-2 divide-x divide-hair border-t border-ink font-mono text-[10px] uppercase tracking-[0.12em]">
                <div className="px-4 py-3">
                  <span className="text-fg-faint">Serial</span>
                  <p className="mt-0.5 text-ink">AI-2026-ALS</p>
                </div>
                <div className="px-4 py-3">
                  <span className="text-fg-faint">Status</span>
                  <p className="mt-0.5" style={{ color: '#3F7A4E' }}>En activo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Barra inferior: marcas + spec numérico */}
          <div className="flex flex-wrap items-stretch justify-between gap-y-4 border-t border-ink">
            <div className="flex items-center gap-4 px-5 py-4 sm:px-7">
              <Marks />
              <span className="hidden font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint sm:inline">
                Portfolio · v01
              </span>
            </div>
            <div className="grid flex-1 grid-cols-3 divide-x divide-hair border-l border-ink sm:max-w-[440px]">
              <SpecField label="Productos" value="05" sub="shippeados" />
              <SpecField label="En producción" value="03" sub="o App Store" />
              <SpecField label="Títulos" value="00" sub="autodidacta" accent />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
