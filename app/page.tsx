import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { CaseStudySection } from '@/components/case-study'
import { LightProjects } from '@/components/light-projects'
import { AithorityBlurb } from '@/components/aithority-blurb'
import { Contact } from '@/components/contact'
import { CASOS } from '@/components/copy'

export default function Home() {
  return (
    <main id="contenido">
      <Nav />
      <Hero />

      <section id="trabajo" className="container-page">
        {CASOS.map((c, i) => (
          <CaseStudySection key={c.slug} caso={c} reverse={i % 2 === 1} />
        ))}
        <LightProjects />
      </section>

      <AithorityBlurb />
      <Contact />
    </main>
  )
}
