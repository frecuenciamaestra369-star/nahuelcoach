"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function ImpactStatement() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-28 md:py-40 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/20 via-background to-card/20" />
      
      {/* Decorative lines */}
      <div className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-3xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight"
          >
            <span className="text-muted-foreground/80">El poder no está en empezar.</span>
          </motion.h2>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-3xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight mt-2 md:mt-4"
          >
            <span className="gradient-text">Está en sostener.</span>
          </motion.h2>
        </motion.div>
      </div>
    </section>
  )
}
