"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-32 md:py-44 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-card/30" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="w-16 h-px bg-primary/40 mx-auto mb-12" />
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal leading-tight mb-4">
            <span className="text-foreground">¿Estás listo para sostener</span>
          </h2>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal leading-tight mb-10">
            <span className="gradient-text">más allá de la motivación?</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-14 max-w-xl mx-auto font-light leading-relaxed">
            El momento de empezar es ahora. La diferencia está en quienes dan el paso.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm tracking-wide px-10 py-7 transition-all duration-300 hover:scale-[1.02]"
            >
              Empezar ahora
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-muted-foreground hover:text-foreground hover:bg-transparent font-normal text-sm tracking-wide px-8 py-7 underline-offset-4 hover:underline"
            >
              Agendar llamada
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
