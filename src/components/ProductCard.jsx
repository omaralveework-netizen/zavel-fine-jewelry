import { Eye } from 'lucide-react'

export default function ProductCard({ product, onQuickView }) {
  const isSoldOut = Boolean(product.is_sold_out)

  return (
    <div className="group animate-rise relative">
      <button
        onClick={() => !isSoldOut && onQuickView(product)}
        disabled={isSoldOut}
        className={`relative block w-full aspect-[4/5] overflow-hidden rounded-sm border transition-colors duration-500 ${
          isSoldOut 
            ? 'border-gold-400/10 cursor-not-allowed opacity-75' 
            : 'border-gold-400/15 group-hover:border-gold-400/50'
        }`}
      >
        {/* Product image */}
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isSoldOut ? 'grayscale-[50%]' : 'group-hover:scale-105'
          }`}
        />

        {/* SOLD OUT Overlay & Badge */}
        {isSoldOut ? (
          <div className="absolute inset-0 bg-emerald-950/60 flex items-center justify-center">
            <span className="font-ui text-xs tracking-[0.25em] uppercase text-gold-300 border border-gold-400/50 bg-emerald-950/80 px-4 py-2 rounded-sm shadow-md">
              Sold Out
            </span>
          </div>
        ) : (
          <>
            {/* Subtle dark overlay on hover */}
            <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Eye Icon Button on hover */}
            <span
              className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full
                         bg-emerald-950/80 border border-gold-400/40 text-gold-300 opacity-0
                         group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            >
              <Eye size={14} strokeWidth={1.6} />
            </span>
          </>
        )}
      </button>

      {/* Product Details */}
      <div className="pt-4 flex flex-col gap-1.5">
        <span className="font-ui text-[10px] tracking-[0.3em] text-gold-500 uppercase">
          {product.category}
        </span>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg text-gold-100 leading-snug">{product.name}</h3>
          <span className="font-display text-gold-300 text-lg whitespace-nowrap">
            ৳{Number(product.price).toFixed(0)}
          </span>
        </div>
        
        {isSoldOut ? (
          <span className="mt-2 self-start font-ui text-[11px] tracking-[0.18em] uppercase text-gold-100/40 cursor-not-allowed">
            Currently Unavailable
          </span>
        ) : (
          <button
            onClick={() => onQuickView(product)}
            className="mt-2 self-start font-ui text-[11px] tracking-[0.18em] uppercase text-gold-400 border-b border-gold-400/40 pb-0.5 hover:border-gold-400 transition-colors"
          >
            Quick View / Order
          </button>
        )}
      </div>
    </div>
  )
}