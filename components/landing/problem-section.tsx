"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const problems = [
  {
    number: "01",
    text: "Empezás proyectos… pero los abandonás",
  },
  {
    number: "02",
    text: "Tenés potencial, pero tu energía está dispersa",
  },
  {
    number: "03",
    text: "Perdés dirección después del impulso inicial",
  },
  {
    number: "04",
    text: "No confiás en vos cuando te prometés algo",
  },
]

export function ProblemSection({ data }: { data: any }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const content = {
    title: data?.title || "¿Te sentís identificado?",
    subtitle: data?.subtitle || "El diagnóstico",
    description: data?.description || "El verdadero problema no es fallar… es acostumbrarte a no confiar en vos."
  }

  return (
    <section ref={ref} className="py-28 md:py-36 relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-[11px] tracking-[0.3em] text-primary/80 uppercase mb-4">
            {content.subtitle}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
            {content.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group"
            >
              <div className="flex items-start gap-5 p-6 md:p-8 border border-border/50 rounded-lg bg-card/30 hover:border-primary/30 transition-all duration-500">
                <span className="text-[11px] tracking-widest text-primary/60 font-medium mt-0.5">
                  {problem.number}
                </span>
                <p className="text-foreground/90 text-base md:text-lg leading-relaxed font-light">
                  {problem.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-20 md:mt-24 text-center max-w-2xl mx-auto"
        >
          <div className="w-12 h-px bg-primary/30 mx-auto mb-8" />
          <div className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light whitespace-pre-wrap">
            {content.description}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
