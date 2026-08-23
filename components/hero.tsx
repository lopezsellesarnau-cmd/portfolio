import { PROFILE, HERO_PLANT_SEED } from './copy'
import { PlantCanvas } from './plant-canvas'

/** Decorative technical marks — the crosshair, the frame and the checker square. */
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

function SpecField({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="px-4 py-3 sm:px-5">
      <p className="font-mono text-[9px] uppercase leading-tight tracking-[0.14em] text-fg-faint">{label}</p>
      <p className="mt-1 font-mono text-[22px] tabular-nums leading-none text-ink sm:text-[26px]">{value}</p>
      {sub && <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.1em] text-fg-dim">{sub}</p>}
    </div>
  )
}

export function Hero() {
  return (
    <section id="top" className="grain border-b border-line">
      <div className="checker h-3 w-full border-b border-ink" aria-hidden />

      <div className="mx-auto w-full max-w-[1320px] px-6 py-8 sm:py-12">
        <div className="relative border border-ink bg-surface">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-ink px-5 py-3 sm:px-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
              <span className="text-fg-faint">Type:</span> {PROFILE.role}
            </p>
            <p className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-fg-dim md:block">
              Alcoy · NL / DE · UK if sponsored
            </p>
            <span className="bg-ink px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-bg">Available</span>
          </div>

          <div className="grid gap-0 lg:grid-cols-[1fr_1.1fr]">
            <div className="border-b border-ink px-5 py-8 sm:px-7 sm:py-9 lg:border-b-0 lg:border-r">
              <p className="fade-up font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{PROFILE.eyebrow}</p>

              <h1 className="display fade-up mt-4 text-[clamp(2.5rem,6.5vw,4.4rem)] font-medium text-ink" style={{ animationDelay: '60ms' }}>
                Product
                <br />
                Engineer
              </h1>

              <div className="fade-up mt-6 space-y-1.5" style={{ animationDelay: '120ms' }}>
                <p className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.1em] text-ink">
                  Full-stack · design + engineering <span className="text-fg-faint">&gt;&gt;&gt;&gt;&gt;&gt;</span>
                </p>
                <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-fg-dim">Live products · not prototypes</p>
              </div>

              <p className="fade-up mt-5 max-w-[48ch] text-[15px] leading-relaxed text-fg-muted" style={{ animationDelay: '160ms' }}>
                {PROFILE.hero}
              </p>
              <p className="fade-up mt-2 max-w-[48ch] font-mono text-[11px] leading-relaxed text-fg-dim" style={{ animationDelay: '180ms' }}>
                {PROFILE.sub}
              </p>

              <div className="fade-up mt-7 flex flex-wrap gap-3" style={{ animationDelay: '220ms' }}>
                <a href="#work" className="btn-solid">
                  See the work
                </a>
                <a href="#contact" className="btn-ghost">
                  Contact
                </a>
                <a href="/Arnau-Lopez-Selles-CV.pdf" className="btn-ghost">
                  CV
                </a>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="grain relative min-h-[180px] flex-1 overflow-hidden sm:min-h-[220px]">
                <PlantCanvas
                  seed={HERO_PLANT_SEED}
                  len={430}
                  depth={5}
                  anchor="center"
                  fit="cover"
                  color="#111111"
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
                  <p className="mt-0.5" style={{ color: '#3F7A4E' }}>Active</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-stretch justify-between gap-y-4 border-t border-ink">
            <div className="flex items-center gap-4 px-5 py-4 sm:px-7">
              <Marks />
              <span className="hidden font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint sm:inline">
                Kiblo · Dross · TRACE · BlockFlow
              </span>
            </div>
            <div className="grid flex-1 grid-cols-3 divide-x divide-hair border-l border-ink sm:max-w-[440px]">
              <SpecField label="Live" value="04" sub="not prototypes" />
              <SpecField label="Design" value="+ code" sub="same person" />
              <SpecField label="Markets" value="NL DE" sub="UK if sponsor" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
