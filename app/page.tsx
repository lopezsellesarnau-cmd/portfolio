import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { ProjectArchive } from '@/components/project-archive'
import { HowIWork } from '@/components/how-i-work'
import { Toolkit } from '@/components/toolkit'
import { Contact } from '@/components/contact'

export default function Home() {
  return (
    <main id="contenido">
      <Nav />
      <Hero />

      <section id="work" className="container-page py-14 sm:py-20">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint sm:mb-8">
          Work — Kiblo, Dross, TRACE, Aithority · then BlockFlow and shipped work
        </p>
        <ProjectArchive />
      </section>

      <HowIWork />
      <Toolkit />
      <Contact />
    </main>
  )
}
