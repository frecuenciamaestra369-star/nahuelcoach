"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
})

export function Hero({ data }: { data: any }) {
  const content = {
    bsl: data?.bsl || "UN PROCESO DE TRANSFORMACIÓN GUIADO",
    bsl_detail: data?.bsl_detail || "ORDEN INTERNO • ESTRUCTURA • ACCIÓN SOSTENIDA",
    title: data?.title || "SABÉS QUÉ HACER…",
    title_accent: data?.title_accent || "PERO NO LO SOSTENÉS.",
    subtitle: data?.subtitle || "Empezás con fuerza. Pero la constancia se diluye. No es falta de motivación… es falta de estructura.",
    primary_btn: data?.primary_btn || "Agendar llamada",
    primary_url: data?.primary_url || "#",
    secondary_btn: data?.secondary_btn || "Ver cómo funciona",
    secondary_url: data?.secondary_url || "#",
    bg_desktop: data?.bg_desktop || "/images/hero-training.jpg",
    bg_mobile: data?.bg_mobile || data?.bg_desktop || "/images/hero-training.jpg",
  }

  // Handle split titles if they are in the same field or separate
  const displayTitle = content.title.includes('…') ? content.title.split('…')[0] + '…' : content.title
  const displayAccent = content.title.includes('…') ? content.title.split('…')[1] : content.title_accent

  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      {/* ── BACKGROUND IMAGE ─────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={content.bg_desktop}
          alt="Banner Principal"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Left-side dark overlay — clear space for text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060810] via-[#060810]/85 to-[#060810]/20" />
        {/* Top vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060810]/70 via-transparent to-[#060810]/60" />
      </div>

      {/* ── CONTENT ──────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col min-h-screen px-8 md:px-16 lg:px-24 pt-36 pb-16 max-w-3xl">

        {/* Brand label */}
        <motion.div {...fadeUp(0.3)} className="flex items-center gap-3 mb-10">
          <span className="w-8 h-px bg-[#38BDF8]/70" />
          <p className="text-[10px] tracking-[0.45em] text-[#38BDF8]/80 font-medium uppercase">
            {content.bsl}
          </p>
        </motion.div>

        {/* Eyebrow */}
        <motion.p {...fadeUp(0.45)} className="text-[11px] tracking-[0.3em] text-[var(--muted-foreground)] uppercase mb-6">
          {content.bsl_detail}
        </motion.p>

        {/* Main headline */}
        <motion.h1
          {...fadeUp(0.6)}
          className="font-serif font-normal leading-[1.06] tracking-tight text-balance"
        >
          <span className="block text-5xl md:text-6xl lg:text-7xl text-foreground">
            {displayTitle}
          </span>
          <span className="block text-5xl md:text-6xl lg:text-7xl mt-2 font-medium italic bg-gradient-to-r from-[#1B4FD8] via-[#3B82F6] to-[#38BDF8] bg-clip-text text-transparent">
            {displayAccent}
          </span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.95, ease: "easeOut" }}
          className="origin-left w-14 h-px mt-10 mb-8"
          style={{ background: "linear-gradient(90deg, #38BDF8, #1B4FD8, transparent)" }}
        />

        {/* Body copy */}
        <motion.p {...fadeUp(1.05)} className="text-base md:text-lg text-[#94A3B8] font-light leading-relaxed max-w-md">
          {content.subtitle}
        </motion.p>

        {/* Pillars row */}
        <motion.div {...fadeUp(1.2)} className="flex flex-wrap gap-x-8 gap-y-2 mt-8 mb-12">
          {[
            { label: "Entrenamiento", dot: "#38BDF8" },
            { label: "Nutrición",     dot: "#1B4FD8" },
            { label: "Mentalidad",    dot: "#38BDF8" },
            { label: "Estructura",    dot: "#1B4FD8" },
          ].map(({ label, dot }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full" style={{ background: dot }} />
              <span className="text-[10px] tracking-[0.25em] text-[#64748B] uppercase">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div {...fadeUp(1.35)} className="flex flex-col sm:flex-row items-start gap-4">
          <Button
            size="lg"
            asChild
            className="bg-primary hover:bg-primary/90 text-white font-semibold text-xs tracking-[0.18em] px-10 py-6 uppercase transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(27,79,216,0.45)] rounded-sm"
          >
            <a href={content.primary_url}>{content.primary_btn}</a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-[#1E2D4A] hover:border-[#38BDF8]/50 text-[#94A3B8] hover:text-[#38BDF8] bg-transparent font-normal text-xs tracking-[0.15em] px-8 py-6 uppercase transition-all duration-300 rounded-sm"
          >
            <a href={content.secondary_url}>{content.secondary_btn}</a>
          </Button>
        </motion.div>

        {/* Stat badges — bottom left */}
        <motion.div {...fadeUp(1.5)} className="flex flex-wrap gap-5 mt-16">
          {[
            { value: "12",    unit: "semanas",   label: "Transformación visible" },
            { value: "+200",  unit: "alumnos",   label: "Transformados" },
            { value: "100%",  unit: "online",    label: "Acompañamiento continuo" },
          ].map(({ value, unit, label }) => (
            <div key={label} className="flex flex-col border-l border-[#1B4FD8]/60 pl-4">
              <p className="text-foreground font-serif text-xl font-medium leading-none">
                {value}{" "}
                <span className="text-[#38BDF8] text-sm font-sans font-normal">{unit}</span>
              </p>
              <p className="text-[10px] tracking-wide text-[#64748B] mt-1 uppercase">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── SCROLL INDICATOR ─────────────────────────────────── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#38BDF8]/50 hover:text-[#38BDF8]/80 transition-colors"
        aria-label="Scroll hacia abajo"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={15} strokeWidth={1.5} />
        </motion.span>
        <span className="text-[9px] tracking-[0.4em] uppercase">Descubrir</span>
      </motion.button>
    </section>
  )
}
