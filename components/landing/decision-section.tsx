"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const consequences = [
  "Procrastinación",
  "Falta de energía",
  "Frustración constante",
  "Estancamiento",
]

export function DecisionSection({ data }: { data: any }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const content = {
    title: data?.title || "Seguir igual también es una decisión.",
    description: data?.description || "Postergar lo que querés… tiene un precio.",
  }

  return (
    <section ref={ref} className="py-28 md:py-36 relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-foreground leading-tight mb-4">
            {content.title}
          </h2>
          <div className="font-serif text-2xl md:text-3xl text-muted-foreground/70 font-light whitespace-pre-wrap">
            {content.description}
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-12 md:mt-16">
            {consequences.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                className="px-5 py-2.5 border border-destructive/20 rounded-full text-sm text-muted-foreground/70 font-light"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
