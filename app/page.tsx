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
import { getHeroData, getLinksData, getSectionsData, getTestimonialsData, getProgramsData } from "@/lib/supabase/data"

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [heroData, linksData, sections, testimonials, programs] = await Promise.all([
    getHeroData(),
    getLinksData(),
    getSectionsData(),
    getTestimonialsData(),
    getProgramsData(),
  ])

  // Helper to find a section by key
  const getSection = (key: string) => sections.find(s => s.section_key === key)

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar links={linksData} />
      <Hero data={heroData} />
      
      <ProblemSection data={getSection('problema')} />
      <ImpactStatement data={getSection('impacto')} />
      <TransformationSection data={getSection('transformacion')} />
      <ProcessSection data={getSection('proceso')} />
      <AuthoritySection data={getSection('autoridad')} />
      
      <TestimonialsSection testimonials={testimonials.filter(t => t.type === 'text')} />
      <VideoTestimonials videos={testimonials.filter(t => t.type === 'video')} />
      
      <PricingSection programs={programs} />
      
      <DecisionSection data={getSection('decision')} />
      <FinalCTA data={getSection('cierre')} links={linksData} />
      
      <Footer links={linksData} />
    </main>
  )
}
