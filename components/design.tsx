'use client'

/**
 * Design, on the main page between Work and Milestones (16 oct 2026).
 * Reference: the Nomad Coffee archive cover. A centred plate with a mono caption,
 * a column of small numbered images on the right, the index in vertical text on the left.
 * The centre stays empty until a number is pressed; pressing it again empties it.
 * No mockups or frames: the screens as they are.
 */

import Image from 'next/image'
import { useState } from 'react'

type Plate = { src: string; w: number; h: number; project: string; caption: string; year: string; tools: string }

const PLATES: Plate[] = [
  { src: '/design/hilo-ipad-talk.png', w: 1024, h: 670, project: 'Hilo', caption: 'Talk, iPad', year: '2026', tools: 'Figma' },
  { src: '/design/hilo-ipad-home.png', w: 1024, h: 670, project: 'Hilo', caption: 'Home, iPad', year: '2026', tools: 'Figma' },
  { src: '/design/hilo-home.png', w: 402, h: 874, project: 'Hilo', caption: 'Home, iPhone', year: '2026', tools: 'Figma' },
  { src: '/ux/kiblo-flows.jpg', w: 1800, h: 1595, project: 'Kiblo', caption: 'Flows', year: '2026', tools: 'Figma' },
  { src: '/kiblo/02.png', w: 479, h: 900, project: 'Kiblo', caption: 'The bowl', year: '2026', tools: 'React Native' },
  { src: '/kiblo/04.png', w: 479, h: 900, project: 'Kiblo', caption: 'Pick the food', year: '2026', tools: 'React Native' },
  { src: '/ux/aithority-overview.jpg', w: 1800, h: 923, project: 'Aithority', caption: 'Compliance overview', year: '2026', tools: 'Figma, Next.js' },
  { src: '/ux/aithority-onboarding.jpg', w: 1800, h: 914, project: 'Aithority', caption: 'Onboarding', year: '2026', tools: 'Figma, Next.js' },
  { src: '/ux/dross-fix-session.jpg', w: 1800, h: 1573, project: 'Dross', caption: 'Fix session', year: '2026', tools: 'Figma, SwiftUI' },
  { src: '/ux/dross-repos.jpg', w: 1800, h: 1555, project: 'Dross', caption: 'Repositories', year: '2026', tools: 'Figma, SwiftUI' },
]

const num = (i: number) => String(i + 1).padStart(2, '0')

export function Design() {
  const [active, setActive] = useState<number | null>(null)
  const plate = active === null ? null : PLATES[active]
  const press = (i: number) => setActive((a) => (a === i ? null : i))

  return (
    <section id="design" className="relative flex min-h-[100svh] flex-col justify-between py-24">
      <p className="frame text-[12px] uppercase text-ink">
        <span className="pl-2">Design</span>
      </p>

      <div className="frame relative my-12 flex items-stretch gap-6">
        {/* Index, read bottom to top like the spine of a book */}
        <p className="mono hidden max-h-[70vh] shrink-0 rotate-180 text-[10px] uppercase leading-[1.6] text-fg-faint [writing-mode:vertical-rl] md:block">
          {PLATES.map((p, i) => (
            <span key={p.src} className={i === active ? 'text-ink' : undefined}>
              [{num(i)}] {p.project} / {p.caption}.{' '}
            </span>
          ))}
        </p>

        {/* Same height empty or full, so nothing below jumps when a number is pressed */}
        <div className="flex min-h-[40vh] min-w-0 md:min-h-[56vh] flex-1 flex-col items-center justify-center gap-6">
          {plate && active !== null ? (
            <>
              <Image
                key={plate.src}
                src={plate.src}
                alt={`${plate.project}, ${plate.caption}`}
                width={plate.w}
                height={plate.h}
                sizes="(min-width: 768px) 560px, 90vw"
                className="h-auto max-h-[56vh] w-auto max-w-[min(560px,100%)] object-contain"
              />
              <div className="mono text-center text-[11px] uppercase leading-[1.5] text-ink">
                <p className="text-fg-faint">[{num(active)}]</p>
                <p>{plate.project}</p>
                <p>{plate.caption}</p>
                <p className="mt-3 text-fg-dim">
                  {plate.year} · {plate.tools}
                </p>
              </div>
            </>
          ) : null}
        </div>

        {/* Numbered images: a column on the right, a row under the plate on a phone */}
        <ol className="hidden shrink-0 flex-col gap-2 md:flex">
          {PLATES.map((p, i) => (
            <li key={p.src} className="flex items-center gap-2">
              <span className={`mono rotate-180 text-[9px] [writing-mode:vertical-rl] ${i === active ? 'text-ink' : 'text-fg-ghost'}`}>
                [{num(i)}]
              </span>
              <button
                type="button"
                onClick={() => press(i)}
                aria-label={`${num(i)}, ${p.project}, ${p.caption}`}
                aria-current={i === active}
                className={`block h-[44px] w-[64px] overflow-hidden bg-card transition-opacity ${i === active ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
              >
                <Image src={p.src} alt="" width={128} height={88} className="h-full w-full object-cover object-top" />
              </button>
            </li>
          ))}
        </ol>
      </div>

      <ol className="frame -mt-6 mb-10 flex gap-2 overflow-x-auto pb-2 md:hidden">
        {PLATES.map((p, i) => (
          <li key={p.src} className="shrink-0">
            <button
              type="button"
              onClick={() => press(i)}
              aria-label={`${num(i)}, ${p.project}, ${p.caption}`}
              aria-current={i === active}
              className={`block h-[44px] w-[64px] overflow-hidden bg-card ${i === active ? 'opacity-100' : 'opacity-60'}`}
            >
              <Image src={p.src} alt="" width={128} height={88} className="h-full w-full object-cover object-top" />
            </button>
          </li>
        ))}
      </ol>

      <div className="frame flex justify-between text-[12px] uppercase">
        <span className="pl-2 text-ink">
          {String(PLATES.length).padStart(2, '0')} screens
          <span className="ml-4 text-fg-dim">2024–2026</span>
        </span>
        <span className="pr-2 text-fg-dim">Press a number</span>
      </div>
    </section>
  )
}
