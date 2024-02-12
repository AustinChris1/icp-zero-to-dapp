import { createFileRoute } from "@tanstack/react-router"
import { Hero } from "./-components/hero"
import { Navbar } from "./-components/navbar"
import { Contact } from "./-components/contact"
import { Footer } from "./-components/footer"

export const Route = createFileRoute('/')({
  component: IndexPage,
})

function IndexPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Contact />
      <Footer />
    </main>
  )
}
