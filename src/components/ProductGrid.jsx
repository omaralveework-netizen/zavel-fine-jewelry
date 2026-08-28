import ProductCard from './ProductCard'
import CrownMark from './CrownMark'

export default function ProductGrid({ products, loading, onQuickView }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/5] bg-emerald-800 rounded-sm" />
            <div className="h-3 w-16 bg-emerald-800 mt-4 rounded-sm" />
            <div className="h-4 w-3/4 bg-emerald-800 mt-2 rounded-sm" />
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center border border-dashed border-gold-400/20 rounded-sm">
        <CrownMark className="w-10 h-8 opacity-50" />
        <p className="font-display text-xl text-gold-100/80">Nothing here yet</p>
        <p className="font-sans text-sm text-gold-100/50 max-w-xs">
          No pieces match this filter. Try another category, or add new
          inventory from the Admin Portal.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      {products.map((product, i) => (
        <div key={product.id} style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}>
          <ProductCard product={product} onQuickView={onQuickView} />
        </div>
      ))}
    </div>
  )
}
