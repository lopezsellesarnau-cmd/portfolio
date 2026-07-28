import { CONTACT } from './copy'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/lopezsellesarnau-cmd', handle: '@lopezsellesarnau-cmd' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/arnau-lopez-selles/', handle: 'in/arnau-lopez-selles' },
  { label: 'X', href: 'https://x.com/ArnauSelles', handle: '@ArnauSelles' },
  { label: 'Email', href: 'mailto:lopezsellesarnau@gmail.com', handle: 'lopezsellesarnau@gmail.com' },
]

export function Contact() {
  return (
    <footer id="contact" className="border-t border-line py-16 sm:py-24">
      <div className="container-page">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">{CONTACT.eyebrow}</p>
        <h2 className="display mt-3 max-w-[16ch] text-[clamp(2rem,6vw,3.4rem)] font-medium text-ink">{CONTACT.title}</h2>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="mailto:lopezsellesarnau@gmail.com" className="btn-solid">
            {CONTACT.cta}
          </a>
        </div>

        {/* Links any company would want to see */}
        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group flex flex-col gap-1 bg-surface px-4 py-4 transition-colors hover:bg-raised"
            >
              <span className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">
                {l.label}
                <span className="text-fg-ghost transition-colors group-hover:text-accent" aria-hidden>↗</span>
              </span>
              <span className="truncate font-mono text-[12px] text-ink">{l.handle}</span>
            </a>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-hair pt-6">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-fg-faint">Arnau Lopez — Full-Stack AI Product Engineer</p>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-fg-faint">Barcelona · remote · EU</p>
        </div>
      </div>
    </footer>
  )
}
