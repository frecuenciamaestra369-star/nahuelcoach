"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const testimonials = [
  {
    name: "Martín G.",
    quote: "Pasé de empezar mil veces a sostener por primera vez en mi vida. Tres meses después sigo sin fallar.",
  },
  {
    name: "Lucía P.",
    quote: "No solo bajé de peso, cambié mi relación conmigo misma. Ahora confío en lo que me prometo.",
  },
  {
    name: "Carlos R.",
    quote: "La estructura que armamos juntos me cambió la vida. Ya no dependo de la motivación.",
  },
  {
    name: "Ana M.",
    quote: "Por primera vez entendí que el problema no era el entrenamiento, era yo. Ahora todo fluye.",
  },
  {
    name: "Diego S.",
    quote: "El seguimiento diario fue clave. Nunca me había sentido tan acompañado en un proceso.",
  },
  {
    name: "Valentina T.",
    quote: "Mi energía cambió completamente. Me levanto con ganas de hacer todo lo que antes postergaba.",
  },
]

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Duplicate for infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials]

  return (
    <section id="testimonios" ref={ref} className="py-28 md:py-36 relative overflow-hidden">
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20 px-6"
        >
          <p className="text-[11px] tracking-[0.3em] text-primary/80 uppercase mb-4">
            Testimonios
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
            Lo que dicen quienes ya lo vivieron
          </h2>
        </motion.div>

        {/* Infinite Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="overflow-hidden"
        >
          <div className="flex animate-scroll">
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 md:w-96 mx-3"
              >
                <div className="border border-border/40 rounded-lg p-8 h-full bg-card/20 hover:border-primary/30 transition-all duration-500">
                  <div className="w-8 h-px bg-primary/40 mb-6" />
                  <p className="text-foreground/90 leading-relaxed mb-8 font-light italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center">
                      <span className="text-primary font-medium text-sm">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-muted-foreground text-sm tracking-wide">
                      {testimonial.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
