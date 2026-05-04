"use client"

import { Instagram, Youtube, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-14 border-t border-border/30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <a href="#" className="text-lg font-serif font-medium tracking-wide text-foreground">
              TRANSFORM<span className="text-primary">.</span>
            </a>
            <p className="text-muted-foreground/60 text-sm mt-2 font-light">
              Transformación personal de alto rendimiento
            </p>
          </div>

          <div className="flex items-center gap-8">
            <a
              href="#"
              className="text-muted-foreground/50 hover:text-primary transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={18} strokeWidth={1.5} />
            </a>
            <a
              href="#"
              className="text-muted-foreground/50 hover:text-primary transition-colors duration-300"
              aria-label="YouTube"
            >
              <Youtube size={18} strokeWidth={1.5} />
            </a>
            <a
              href="#"
              className="text-muted-foreground/50 hover:text-primary transition-colors duration-300"
              aria-label="Email"
            >
              <Mail size={18} strokeWidth={1.5} />
            </a>
          </div>

          <p className="text-muted-foreground/40 text-xs tracking-wide">
            {new Date().getFullYear()} Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}
