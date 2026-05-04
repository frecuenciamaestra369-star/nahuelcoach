"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Play, X } from "lucide-react"
import Image from "next/image"

const defaultVideos = [
  {
    id: 1,
    image_url: "/images/hero-gym.jpg",
    name: "Juan M.",
    video_url: "#",
  },
  {
    id: 2,
    image_url: "/images/hero-gym.jpg",
    name: "María L.",
    video_url: "#",
  },
  {
    id: 3,
    image_url: "/images/hero-gym.jpg",
    name: "Roberto F.",
    video_url: "#",
  },
]

export function VideoTestimonials({ videos: dynamicVideos }: { videos: any[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  
  const displayVideos = dynamicVideos && dynamicVideos.length > 0 ? dynamicVideos : defaultVideos

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
          {displayVideos.map((video, index) => (
            <motion.div
              key={video.id || index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              onClick={() => video.video_url && setActiveVideo(video.video_url)}
              className="relative aspect-[9/16] rounded-lg overflow-hidden cursor-pointer group border border-border/30"
            >
              {video.image_url && (
                <Image
                  src={video.image_url}
                  alt={`Testimonio de ${video.name}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              
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
                <p className="text-muted-foreground text-xs mt-1">Video Testimonio</p>
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
          className="fixed inset-0 z-50 bg-background/98 backdrop-blur-lg flex items-center justify-center p-4 md:p-8"
          onClick={() => setActiveVideo(null)}
        >
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-8 right-8 text-muted-foreground hover:text-foreground transition-colors z-[60]"
            aria-label="Cerrar video"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
          
          <div className="w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>
            {activeVideo.includes('iframe') ? (
              <div dangerouslySetInnerHTML={{ __html: activeVideo }} className="w-full h-full" />
            ) : (
              <iframe 
                src={activeVideo} 
                className="w-full h-full"
                allowFullScreen
              />
            )}
          </div>
        </motion.div>
      )}
    </section>
  )
}
