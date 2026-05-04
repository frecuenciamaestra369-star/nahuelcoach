import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { ProblemSection } from "@/components/landing/problem-section"
import { ImpactStatement } from "@/components/landing/impact-statement"
import { TransformationSection } from "@/components/landing/transformation-section"
import { ProcessSection } from "@/components/landing/process-section"
import { AuthoritySection } from "@/components/landing/authority-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { VideoTestimonials } from "@/components/landing/video-testimonials"
import { PricingSection } from "@/components/landing/pricing-section"
import { DecisionSection } from "@/components/landing/decision-section"
import { FinalCTA } from "@/components/landing/final-cta"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <ProblemSection />
      <ImpactStatement />
      <TransformationSection />
      <ProcessSection />
      <AuthoritySection />
      <TestimonialsSection />
      <VideoTestimonials />
      <PricingSection />
      <DecisionSection />
      <FinalCTA />
      <Footer />
    </main>
  )
}
