import { PROFILE, HERO_PLANT_SEED } from './copy'
import { PlantCanvas } from './plant-canvas'
import { CropMarks } from './crop-frame'

export function Hero() {
  return (
    <section id="top" className="crop-frame relative scroll-mt-20 overflow-hidden py-16 sm:py-24">
      <CropMarks />
      <div className="wide-col grid items-center gap-8 lg:grid-cols-[1fr_0.82fr] lg:gap-4">
        <div className="relative z-10">
          <span className="pill-tag fade-up">{PROFILE.role}</span>

          <h1
            className="display fade-up mt-6 max-w-[14ch] text-[clamp(2rem,7vw,4.1rem)] text-ink"
            style={{ animationDelay: '60ms' }}
          >
            I design the interface and write the <span className="display-italic">software</span>.
          </h1>

          <p
            className="fade-up mt-7 max-w-[52ch] text-[18px] leading-relaxed text-fg-muted"
            style={{ animationDelay: '120ms' }}
          >
            {PROFILE.hero}
          </p>
          <p
            className="fade-up mt-3 max-w-[52ch] text-[15px] leading-relaxed text-fg-dim"
            style={{ animationDelay: '160ms' }}
          >
            {PROFILE.sub}
          </p>

          <div
            className="fade-up mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px]"
            style={{ animationDelay: '210ms' }}
          >
            <a href="#work" className="btn-pill">
              See the work <span className="arrow" aria-hidden>→</span>
            </a>
            <a href="#contact" className="link-underline">
              Contact
            </a>
            <a href="/Arnau-Lopez-Selles-CV.pdf" className="link-underline">
              CV ↗
            </a>
          </div>
        </div>

        {/* Procedural tree — the site's one drawn motif, grey, on the right,
            bleeding off the edge. Hidden on small screens. */}
        <div
          aria-hidden
          className="fade-up pointer-events-none relative hidden min-h-[460px] self-stretch lg:block"
          style={{ animationDelay: '260ms' }}
        >
          <PlantCanvas
            seed={HERO_PLANT_SEED}
            len={470}
            depth={6}
            anchor="center"
            fit="cover"
            color="rgba(20,19,16,0.30)"
            className="absolute inset-y-0 left-0 h-full w-[46vw] max-w-[640px]"
          />
        </div>
      </div>
    </section>
  )
}
