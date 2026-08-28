const COLLECTIONS = [
  {
    key: 'Rings',
    title: 'The Rings Collection',
    copy: 'Waves, bows, pearls and pavé hearts — sculptural silver bands for every hand.',
    image: '/assets/images/pink-heart-gem-ring.jpg',
  },
  {
    key: 'Earrings',
    title: 'The Earrings Collection',
    copy: 'From polished gold spheres to enamel bows — studs built to be worn daily.',
    image: '/assets/images/enamel-bow-earrings.jpg',
  },
]

export default function CollectionsBand({ onSelect }) {
  return (
    <section id="collections" className="bg-emerald-900 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="divider-flourish max-w-xs mb-4">
          <span className="font-ui text-[11px] tracking-[0.4em] text-gold-400 whitespace-nowrap">
            COLLECTIONS
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-gold-100 mb-12">
          Two houses, one atelier.
        </h2>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {COLLECTIONS.map((c) => (
            <button
              key={c.key}
              onClick={() => onSelect(c.key)}
              className="group relative aspect-[16/10] overflow-hidden rounded-sm border border-gold-400/15 hover:border-gold-400/50 transition-colors text-left"
            >
              <img
                src={c.image}
                alt={c.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8">
                <h3 className="font-display text-2xl text-gold-100 mb-2">{c.title}</h3>
                <p className="font-sans text-sm text-gold-100/70 max-w-xs mb-4">{c.copy}</p>
                <span className="font-ui text-[11px] tracking-[0.18em] uppercase text-gold-400 border-b border-gold-400/40 pb-0.5 w-fit">
                  Shop {c.key}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
