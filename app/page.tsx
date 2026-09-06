import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { Work } from '@/components/work'
import { HowIWork } from '@/components/how-i-work'
import { Highlights } from '@/components/highlights'
import { Contact } from '@/components/contact'
import { CropMarks } from '@/components/crop-frame'

export default function Home() {
  return (
    <>
      <Nav />
      <main id="contenido">
        <Hero />

        <section id="work" className="crop-frame relative scroll-mt-20 py-20 sm:py-28">
          <CropMarks />
          <Work />
        </section>

        <HowIWork />
        <Highlights />
        <Contact />
      </main>
    </>
  )
}
