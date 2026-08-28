import { ArrowRight } from 'lucide-react'
import CrownMark from './CrownMark'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative bg-emerald-noise overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32"
    >
      {/* faint oversized crown watermark, subject-grounded ambient detail */}
      <CrownMark
        className="pointer-events-none absolute -left-16 bottom-[-40px] w-[420px] h-[320px] opacity-[0.05]"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        {/* copy */}
        <div className="relative z-10 animate-rise">
          <div className="divider-flourish max-w-[280px] mb-7">
            <span className="font-ui text-[11px] tracking-[0.4em] text-gold-400 whitespace-nowrap">
              EST. FINE JEWELRY
            </span>
          </div>

          <h1 className="font-display text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.4rem] text-gold-foil mb-6">
            Unwrap
            <br />
            Elegance.
          </h1>

          <p className="font-sans text-gold-100/75 text-base sm:text-lg leading-relaxed max-w-md mb-10">
            Handcrafted luxury &amp; timeless fine jewelry — rings and earrings
            finished by hand in sterling silver and warm gold vermeil, made to
            be opened, worn, and kept.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#shop"
              className="group inline-flex items-center gap-2 bg-gold-400 text-emerald-950 font-ui text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-sm hover:bg-gold-300 transition-colors"
            >
              Explore Collection
              <ArrowRight
                size={14}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#collections"
              className="font-ui text-xs tracking-[0.2em] uppercase text-gold-300 border-b border-gold-400/40 pb-1 hover:border-gold-400 transition-colors"
            >
              Our Collections
            </a>
          </div>
        </div>

        {/* framed hero photograph — the box-lid motif that recurs across the site */}
        <div className="relative z-10 mx-auto max-w-sm w-full animate-rise" style={{ animationDelay: '150ms' }}>
          <div className="absolute -inset-3 border border-gold-400/25 rounded-sm" />
          <div className="absolute -top-3 -left-3 w-8 h-8 border-t border-l border-gold-400" />
          <div className="absolute -top-3 -right-3 w-8 h-8 border-t border-r border-gold-400" />
          <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b border-l border-gold-400" />
          <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b border-r border-gold-400" />

          <div className="relative overflow-hidden rounded-sm shadow-gold-lg">
            <img
              src="/assets/images/enamel-bow-earrings.jpg"
              alt="ZAVEL enamel bow earrings presented in a velvet jewelry box"
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-emerald-950/90 to-transparent px-5 pt-10 pb-5">
              <p className="font-display italic text-gold-100 text-sm">
                Enamel Bow Earrings — this season's opening piece
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
