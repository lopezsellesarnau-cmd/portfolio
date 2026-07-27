import { PERFIL, HERO_PLANT_SEED } from './copy'
import { PlantCanvas } from './plant-canvas'

/** Campo numérico del cartucho — etiqueta mono arriba, cifra grande debajo. */
function SpecField({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className="px-4 py-3 sm:px-5 sm:py-4">
      <p className="font-mono text-[9px] uppercase leading-tight tracking-[0.14em] text-fg-faint">{label}</p>
      <p className={`mt-1 font-mono text-[22px] tabular-nums leading-none sm:text-[26px] ${accent ? 'text-accent' : 'text-ink'}`}>
        {value}
      </p>
      {sub && <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-fg-dim">{sub}</p>}
    </div>
  )
}

/** Fila "ETIQUETA valor" del cartucho, con guía punteada — como un cajetín. */
function SpecLine({ k, v, right }: { k: string; v: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 sm:px-5">
      <span className="w-[64px] shrink-0 font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-faint">{k}</span>
      <span className="min-w-0 flex-1 truncate text-[13.5px] text-ink">{v}</span>
      {right}
    </div>
  )
}

export function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden border-b border-line bg-glow">
      <PlantCanvas
        seed={HERO_PLANT_SEED}
        len={430}
        depth={5}
        anchor="corner-tr"
        color="#151412"
        className="pointer-events-none absolute bottom-0 right-0 top-0 hidden w-[62%] md:block"
      />

      <div className="container-page relative pb-14 pt-16 sm:pb-20 sm:pt-24">
        <p className="fade-up font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{PERFIL.eyebrow}</p>

        <h1 className="display fade-up mt-4 max-w-[15ch] text-[clamp(2.4rem,7vw,4.8rem)] font-medium text-ink" style={{ animationDelay: '60ms' }}>
          {PERFIL.rol}
        </h1>

        <p className="fade-up mt-6 max-w-[52ch] text-[17px] leading-relaxed text-fg-muted sm:text-[19px]" style={{ animationDelay: '120ms' }}>
          {PERFIL.hero}
        </p>

        <p className="fade-up mt-3 max-w-[52ch] font-mono text-[12px] leading-relaxed text-fg-dim" style={{ animationDelay: '160ms' }}>
          {PERFIL.sub}
        </p>

        <div className="fade-up mt-8 flex flex-wrap gap-3" style={{ animationDelay: '200ms' }}>
          <a href="#trabajo" className="btn-solid">
            Ver el trabajo
          </a>
          <a href="#contacto" className="btn-ghost">
            Contacto
          </a>
        </div>

        {/* Planta en móvil, entre el intro y el cartucho */}
        <PlantCanvas
          seed={HERO_PLANT_SEED}
          len={230}
          depth={4}
          anchor="center"
          color="#151412"
          className="mt-10 block h-[200px] w-full md:hidden"
        />

        {/* Cartucho / cajetín — la ficha de la portada de un plano */}
        <div className="fade-up mt-10 max-w-[560px] border border-ink bg-surface" style={{ animationDelay: '260ms' }}>
          <SpecLine
            k="Nombre"
            v="Arnau López Sellés"
            right={
              <span className="flex shrink-0 items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em]" style={{ color: '#3F7A4E' }}>
                <span className="h-1.5 w-1.5 rounded-full bg-[#3F7A4E] pulse-dot" aria-hidden />
                Disponible
              </span>
            }
          />
          <div className="border-t border-hair" />
          <SpecLine k="Base" v="Barcelona · trabajo en remoto · UE" />

          <div className="grid grid-cols-2 border-t border-ink divide-x divide-hair sm:grid-cols-4">
            <SpecField label="Productos" value="05" sub="shippeados" />
            <SpecField label="En producción" value="03" sub="o App Store" />
            <SpecField label="Títulos" value="00" sub="autodidacta" accent />
            <div className="col-span-2 flex items-center justify-between border-t border-hair px-4 py-3 sm:col-span-1 sm:border-t-0 sm:flex-col sm:items-start sm:justify-center sm:px-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">Hoja</p>
              <p className="font-mono text-[15px] tabular-nums text-ink sm:mt-1">01 / 01</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
