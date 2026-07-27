import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { ProjectFileDeep, ProjectFileLight } from '@/components/project-file'
import { AithorityBlurb } from '@/components/aithority-blurb'
import { Contact } from '@/components/contact'
import { CASOS, LIGEROS } from '@/components/copy'

export default function Home() {
  return (
    <main id="contenido">
      <Nav />
      <Hero />

      <section id="trabajo" className="container-page py-14 sm:py-20">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint sm:mb-8">
          Trabajo — clic para abrir
        </p>

        <div>
          {CASOS.map((c) => (
            <ProjectFileDeep key={c.slug} caso={c} />
          ))}
        </div>

        <p className="mb-4 mt-12 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">También shippeado</p>
        <div>
          {LIGEROS.map((p, i) => (
            <ProjectFileLight key={p.nombre} proyecto={p} index={`0${CASOS.length + i + 1}`} />
          ))}
        </div>
      </section>

      <AithorityBlurb />
      <Contact />
    </main>
  )
}
