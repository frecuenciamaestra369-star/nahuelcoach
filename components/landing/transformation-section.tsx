"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const transformations = [
  { text: "Aumento de energía diaria" },
  { text: "Confianza y seguridad personal" },
  { text: "Disciplina real" },
  { text: "Conexión con tu cuerpo" },
  { text: "Claridad mental" },
  { text: "Alto rendimiento" },
  { text: "Coherencia interna" },
  { text: "Presencia y liviandad" },
]

export function TransformationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="resultados" ref={ref} className="py-28 md:py-36 relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[11px] tracking-[0.3em] text-primary/80 uppercase mb-4">
            Resultados
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
            Lo que vas a experimentar
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-4xl mx-auto">
          {transformations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group"
            >
              <div className="p-5 md:p-6 border border-border/40 rounded-lg bg-card/20 hover:border-primary/30 hover:bg-card/40 transition-all duration-500 text-center h-full flex items-center justify-center">
                <p className="text-sm md:text-base text-foreground/90 font-light leading-relaxed">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-20 text-center max-w-xl mx-auto"
        >
          <div className="w-12 h-px bg-primary/30 mx-auto mb-8" />
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
            No se trata solo de entrenar…
          </p>
          <p className="text-lg md:text-xl leading-relaxed mt-2">
            <span className="gradient-text font-normal">
              Se trata de convertirte en alguien que sostiene.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
