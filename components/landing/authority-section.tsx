"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const pillars = [
  { text: "Entrenamiento" },
  { text: "Nutrición" },
  { text: "Mentalidad" },
  { text: "Estructura de vida" },
]

export function AuthoritySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-28 md:py-36 relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Images Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden aspect-[4/5] relative group border border-border/30">
                <Image
                  src="/images/hero-gym.jpg"
                  alt="Sesión de entrenamiento"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-lg overflow-hidden aspect-[4/5] relative group border border-border/30">
                <Image
                  src="/images/hero-gym.jpg"
                  alt="Coaching personalizado"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10"
          >
            <div>
              <p className="text-[11px] tracking-[0.3em] text-primary/80 uppercase mb-4">
                Sobre el método
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-foreground leading-tight">
                No es solo físico.
                <br />
                <span className="gradient-text">Es cuerpo, energía y poder personal.</span>
              </h2>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed font-light max-w-lg">
              Un sistema integral que trabaja en todas las dimensiones de tu vida 
              para crear una transformación real y duradera.
            </p>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 p-4 md:p-5 border border-border/40 rounded-lg hover:border-primary/30 transition-all duration-500 bg-card/20"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-foreground/90 font-light text-sm md:text-base">{pillar.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
