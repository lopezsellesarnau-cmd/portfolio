import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { ProjectArchive } from '@/components/project-archive'
import { AithoritySection } from '@/components/aithority-section'
import { Contact } from '@/components/contact'

export default function Home() {
  return (
    <main id="contenido">
      <Nav />
      <Hero />

      <section id="trabajo" className="container-page py-14 sm:py-20">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint sm:mb-8">
          Trabajo — clic en cualquier proyecto para abrirlo
        </p>
        <ProjectArchive />
      </section>

      <AithoritySection />
      <Contact />
    </main>
  )
}
