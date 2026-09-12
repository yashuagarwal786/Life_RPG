import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import HowItWorks from '@/components/landing/HowItWorks'
import Features from '@/components/landing/Features'
import QuestPreview from '@/components/landing/QuestPreview'
import Classes from '@/components/landing/Classes'
import CTASection from '@/components/landing/CTASection'
import Footer from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <QuestPreview />
        <Classes />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
