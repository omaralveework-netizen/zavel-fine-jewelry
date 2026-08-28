import CrownMark from './CrownMark'

export default function Footer() {
  return (
    <footer className="bg-emerald-950 border-t border-gold-400/15">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid sm:grid-cols-3 gap-10">
        <div>
          <CrownMark className="w-9 h-7 mb-3" />
          <p className="font-accent text-lg tracking-[0.25em] text-gold-foil mb-1">ZAVEL</p>
          <p className="font-ui text-[10px] tracking-[0.35em] text-gold-500 mb-4">
            FINE JEWELRY
          </p>
          <p className="font-sans text-sm text-gold-100/50 italic max-w-xs">
            "Unwrap Elegance." Handcrafted rings &amp; earrings, made to be kept.
          </p>
        </div>

        <div>
          <p className="font-ui text-[10px] tracking-[0.3em] text-gold-400 uppercase mb-4">
            Navigate
          </p>
          <ul className="flex flex-col gap-3 font-sans text-sm text-gold-100/60">
            <li><a href="#top" className="hover:text-gold-300 transition-colors">Home</a></li>
            <li><a href="#shop" className="hover:text-gold-300 transition-colors">Shop</a></li>
            <li><a href="#collections" className="hover:text-gold-300 transition-colors">Collections</a></li>
          </ul>
        </div>

        <div>
          <p className="font-ui text-[10px] tracking-[0.3em] text-gold-400 uppercase mb-4">
            Delivery
          </p>
          <ul className="flex flex-col gap-3 font-sans text-sm text-gold-100/60">
            <li>Shipping all over Bangladesh</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gold-400/10 py-6 text-center">
        <p className="font-ui text-[10px] tracking-[0.1em] text-gold-100/30">
          &copy; {new Date().getFullYear()} ZAVEL Fine Jewelry. All rights reserved.
        </p>
      </div>
    </footer>
  )
}