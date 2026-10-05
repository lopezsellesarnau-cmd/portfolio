import { About, Contact, GridLines, Hero, Menu, Milestones, Work } from '@/components/minimal'

export default function Home() {
  return (
    <>
      <GridLines />
      <Menu />
      <main id="contenido" className="relative z-10">
        <Hero />
        <Work />
        <Milestones />
        <About />
      </main>
      <div className="relative z-10">
        <Contact />
      </div>
    </>
  )
}
