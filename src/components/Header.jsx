import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import CrownMark from './CrownMark'

const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Shop', href: '#shop' },
  { label: 'Collections', href: '#collections' },
]

export default function Header() {
  const { count, openCart } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-emerald-900/90 backdrop-blur-md border-b border-gold-400/20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[76px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <CrownMark className="w-8 h-6 shrink-0" />
          <span className="flex flex-col leading-none">
            <span className="font-accent text-lg sm:text-xl tracking-[0.22em] text-gold-foil">
              ZAVEL
            </span>
            <span className="font-ui text-[8px] sm:text-[9px] tracking-[0.38em] text-gold-500">
              FINE JEWELRY
            </span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-ui text-xs tracking-[0.18em] uppercase text-gold-100/80 hover:text-gold-400 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative w-10 h-10 flex items-center justify-center border border-gold-400/40 text-gold-300 hover:border-gold-400 hover:bg-gold-400/10 transition-colors rounded-sm"
          >
            <ShoppingBag size={16} strokeWidth={1.6} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-gold-400 text-emerald-950 text-[10px] font-semibold">
                {count}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden w-10 h-10 flex items-center justify-center border border-gold-400/40 text-gold-300 rounded-sm"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-gold-400/20 bg-emerald-900 px-5 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="font-ui text-sm tracking-[0.14em] uppercase text-gold-100/85"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}