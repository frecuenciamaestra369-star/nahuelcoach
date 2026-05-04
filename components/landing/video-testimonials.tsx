"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Play, X } from "lucide-react"
import Image from "next/image"

const videos = [
  {
    id: 1,
    thumbnail: "/images/hero-gym.jpg",
    name: "Juan M.",
    duration: "2:34",
  },
  {
    id: 2,
    thumbnail: "/images/hero-gym.jpg",
    name: "María L.",
    duration: "3:15",
  },
  {
    id: 3,
    thumbnail: "/images/hero-gym.jpg",
    name: "Roberto F.",
    duration: "2:48",
  },
]

export function VideoTestimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeVideo, setActiveVideo] = useState<number | null>(null)

  return (
    <section ref={ref} className="py-28 md:py-36 relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[11px] tracking-[0.3em] text-primary/80 uppercase mb-4">
            Historias reales
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
            Escuchá sus transformaciones
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              onClick={() => setActiveVideo(video.id)}
              className="relative aspect-[9/16] rounded-lg overflow-hidden cursor-pointer group border border-border/30"
            >
              <Image
                src={video.thumbnail}
                alt={`Testimonio de ${video.name}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
              
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full border border-foreground/30 bg-background/30 backdrop-blur-sm flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500">
                  <Play className="w-5 h-5 text-foreground ml-0.5" strokeWidth={1.5} />
                </div>
              </div>

              {/* Info */}
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-foreground font-medium text-sm">{video.name}</p>
                <p className="text-muted-foreground text-xs mt-1">{video.duration}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/98 backdrop-blur-lg flex items-center justify-center"
          onClick={() => setActiveVideo(null)}
        >
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-8 right-8 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Cerrar video"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
          <div className="border border-border/40 rounded-lg p-12 text-center">
            <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center mx-auto mb-6">
              <Play className="w-6 h-6 text-primary ml-0.5" strokeWidth={1.5} />
            </div>
            <p className="text-foreground text-lg font-serif">Video Testimonio</p>
            <p className="text-muted-foreground mt-2 text-sm">Click para cerrar</p>
          </div>
        </motion.div>
      )}
    </section>
  )
}
