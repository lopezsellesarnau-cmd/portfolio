import { CONTACT } from './copy'
import { CropMarks } from './crop-frame'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/lopezsellesarnau-cmd' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/arnau-lopez-selles/' },
  { label: 'X', href: 'https://x.com/ArnauSelles' },
  { label: 'CV', href: '/Arnau-Lopez-Selles-CV.pdf' },
]

export function Contact() {
  return (
    <footer id="contact" className="crop-frame relative scroll-mt-20 py-24 sm:py-32">
      <CropMarks />
      <div className="wide-col">
        <span className="pill-tag">{CONTACT.eyebrow}</span>
        <h2 className="display mt-5 max-w-[14ch] text-[clamp(2.2rem,5vw,3.4rem)] text-ink">{CONTACT.title}</h2>
        <p className="mt-4 max-w-[48ch] text-[17px] leading-relaxed text-fg-muted">{CONTACT.note}</p>

        <div className="mt-8">
          <a href="mailto:lopezsellesarnau@gmail.com" className="btn-pill">
            Email me <span className="arrow" aria-hidden>→</span>
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-[14px]">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="link-underline"
            >
              {l.label} ↗
            </a>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6 text-[12px] uppercase tracking-[0.1em] text-fg-faint">
          <p>Arnau Lopez — Product Engineer · Full-stack</p>
          <p>Alcoy · NL / DE · UK if sponsored</p>
        </div>
      </div>
    </footer>
  )
}
