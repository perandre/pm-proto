import Navigation from '@/components/marketing/Navigation'
import HeroSection from '@/components/marketing/HeroSection'
import PlansSection from '@/components/marketing/PlansSection'
import BenefitsSection from '@/components/marketing/BenefitsSection'
import TrustSection from '@/components/marketing/TrustSection'
import SwitchSection from '@/components/marketing/SwitchSection'
import FAQSection from '@/components/marketing/FAQSection'
import Footer from '@/components/marketing/Footer'

export default function HomePage() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <PlansSection />
      <BenefitsSection />
      <TrustSection />
      <SwitchSection />
      <FAQSection />
      <Footer />
    </>
  )
}
