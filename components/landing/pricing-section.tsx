"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const defaultPlans = [
  {
    name: "Impacto Base",
    is_featured: false,
    features: [
      "Rutina personalizada",
      "Plan de alimentación",
      "1 sesión inicial",
    ],
    button_text: "Consultar",
    price: "$100",
  },
  {
    name: "Proceso Completo",
    is_featured: true,
    features: [
      "12 sesiones 1:1",
      "Seguimiento personalizado",
      "Entrenamiento + nutrición + mentalidad",
      "Acceso prioritario",
      "Soporte diario",
    ],
    button_text: "Agendar llamada",
    price: "$900",
  },
  {
    name: "Impacto Vital",
    is_featured: false,
    features: [
      "8 semanas de programa",
      "Sistema paso a paso",
      "Seguimiento semanal",
      "Material exclusivo",
    ],
    button_text: "Consultar",
    price: "$450",
  },
]

export function PricingSection({ programs }: { programs: any[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const displayPlans = programs && programs.length > 0 ? programs : defaultPlans

  return (
    <section id="programas" ref={ref} className="py-28 md:py-36 relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[11px] tracking-[0.3em] text-primary/80 uppercase mb-4">
            Programas
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
            Elegí tu camino
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch">
          {displayPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className={`relative rounded-lg p-8 flex flex-col transition-all duration-500 ${
                plan.is_featured
                  ? "border-2 border-primary/50 bg-card/40 md:scale-105 z-10"
                  : "border border-border/40 bg-card/20 hover:border-primary/30"
              }`}
            >
              {plan.is_featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase">
                  Recomendado
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-lg font-medium text-foreground tracking-wide">
                  {plan.name}
                </h3>
                <p className="text-2xl font-bold text-white mt-2">{plan.price}</p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" strokeWidth={2} />
                    </div>
                    <span className="text-muted-foreground font-light text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`w-full py-6 font-medium text-sm tracking-wide transition-all duration-300 ${
                  plan.is_featured
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-transparent border border-border hover:border-primary/50 text-foreground hover:bg-primary/5"
                }`}
              >
                <a href={plan.button_url || '#'}>{plan.button_text}</a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
