"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar({ links }: { links: any }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const ctaUrl = links?.google_meet || (links?.whatsapp ? `https://wa.me/${links.whatsapp}?text=${encodeURIComponent(links.whatsapp_message || '')}` : "#")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#proceso", label: "Proceso" },
    { href: "#resultados", label: "Resultados" },
    { href: "#testimonios", label: "Testimonios" },
    { href: "#programas", label: "Programas" },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-background/95 backdrop-blur-md border-b border-border/50 py-4" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" className="flex items-baseline gap-1 group">
            <span className="font-serif text-base font-medium tracking-wide text-foreground transition-colors">
              Nahuel
            </span>
            <span className="text-[10px] tracking-[0.3em] font-sans font-semibold text-[#38BDF8] uppercase transition-colors">
              Coach Fitness
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Button
              size="sm"
              asChild
              className="bg-transparent border border-[#1B4FD8]/50 text-[#38BDF8] hover:bg-[#1B4FD8] hover:text-white font-medium text-xs tracking-wider px-6 py-5 transition-all duration-300 rounded-sm"
            >
              <a href={ctaUrl}>AGENDAR LLAMADA</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground p-2"
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-lg pt-24 md:hidden"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center gap-8 p-8"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-light text-foreground hover:text-primary transition-colors tracking-wide"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  asChild
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm tracking-wider px-10 py-6 mt-4"
                >
                  <a href={ctaUrl}>AGENDAR LLAMADA</a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
