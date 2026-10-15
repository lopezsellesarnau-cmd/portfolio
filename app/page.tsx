import { Design } from '@/components/design'
import { About, Contact, Hero, Menu, Milestones, Portrait, Work } from '@/components/minimal'

export default function Home() {
  return (
    <>
      <Menu />
      <main id="contenido" className="relative z-10">
        <Hero />
        <Portrait />
        <Work />
        <Design />
        <Milestones />
        <About />
      </main>
      <div className="relative z-10">
        <Contact />
      </div>
    </>
  )
}
