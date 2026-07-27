import { CONTACTO } from './copy'

export function Contact() {
  return (
    <footer id="contacto" className="border-t border-line py-16 sm:py-24">
      <div className="container-page">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">{CONTACTO.eyebrow}</p>
        <h2 className="display mt-3 max-w-[16ch] text-[clamp(2rem,6vw,3.4rem)] font-medium text-ink">
          {CONTACTO.titulo}
        </h2>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="mailto:hola@arnau-lopez.com" className="btn-solid">
            {CONTACTO.cta}
          </a>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-hair pt-6">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-fg-faint">
            Arnau Lopez — Full-Stack AI Product Engineer
          </p>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-fg-faint">Barcelona</p>
        </div>
      </div>
    </footer>
  )
}
