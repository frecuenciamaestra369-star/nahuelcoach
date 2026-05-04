"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const steps = [
  {
    number: "01",
    title: "Diagnóstico y orden interno",
    description: "Identificamos tus patrones, bloqueos y establecemos una base sólida.",
  },
  {
    number: "02",
    title: "Reprogramación de hábitos e identidad",
    description: "Transformamos tu estructura mental y creamos nuevos sistemas de comportamiento.",
  },
  {
    number: "03",
    title: "Acción sostenida sin retorno",
    description: "Consolidamos los cambios hasta que se vuelven parte de quien sos.",
  },
]

const features = [
  "1 sesión semanal 1:1",
  "Seguimiento diario",
  "Tareas específicas",
  "Corrección constante",
]

export function ProcessSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="proceso" ref={ref} className="py-28 md:py-36 relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[11px] tracking-[0.3em] text-primary/80 uppercase mb-4">
            El proceso
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
            Cómo funciona
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-[15px] top-[48px] bottom-0 w-px bg-gradient-to-b from-primary/40 to-border/30" />
              )}
              
              <div className="flex gap-8 pb-12 md:pb-16">
                {/* Number */}
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center bg-background">
                    <span className="text-[10px] tracking-widest text-primary font-medium">
                      {step.number}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 pt-0.5">
                  <h3 className="text-lg md:text-xl font-medium text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 md:mt-16"
        >
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="px-5 py-2.5 border border-border/50 rounded-full text-sm text-muted-foreground font-light tracking-wide"
              >
                {feature}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
