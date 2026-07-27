import { PERFIL, STATS, HERO_PLANT_SEED } from './copy'
import { PlantCanvas } from './plant-canvas'

export function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden border-b border-line bg-glow">
      <PlantCanvas
        seed={HERO_PLANT_SEED}
        len={430}
        depth={5}
        anchor="corner-tr"
        color="#151412"
        className="pointer-events-none absolute bottom-0 right-0 top-[64px] hidden w-[50%] md:block"
      />
      <div className="container-page relative pb-14 pt-16 sm:pb-20 sm:pt-24">
        <p className="fade-up font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{PERFIL.eyebrow}</p>

        <h1
          className="display fade-up mt-4 max-w-[16ch] text-[clamp(2.4rem,7vw,4.6rem)] font-medium text-ink"
          style={{ animationDelay: '60ms' }}
        >
          {PERFIL.rol}
        </h1>

        <p
          className="fade-up mt-6 max-w-[54ch] text-[17px] leading-relaxed text-fg-muted sm:text-[19px]"
          style={{ animationDelay: '120ms' }}
        >
          {PERFIL.hero}
        </p>

        <p
          className="fade-up mt-3 max-w-[54ch] font-mono text-[12px] leading-relaxed text-fg-dim"
          style={{ animationDelay: '160ms' }}
        >
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

        <div
          className="fade-up mt-14 grid grid-cols-3 divide-x divide-hair border border-line bg-surface/60"
          style={{ animationDelay: '260ms' }}
        >
          {STATS.map((s) => (
            <div key={s.l} className="px-4 py-4 sm:px-6 sm:py-5">
              <p className="display text-[26px] text-ink sm:text-[32px]">{s.v}</p>
              <p className="mt-1 font-mono text-[10px] uppercase leading-tight tracking-[0.1em] text-fg-dim">
                {s.l}
              </p>
            </div>
          ))}
        </div>

        <PlantCanvas
          seed={HERO_PLANT_SEED}
          len={230}
          depth={4}
          anchor="center"
          color="#151412"
          className="mt-10 block h-[220px] w-full md:hidden"
        />
      </div>
    </section>
  )
}
