import { Pencil, Trash2, Star } from 'lucide-react'

export default function ProductTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="border border-dashed border-gold-400/20 rounded-sm py-16 text-center">
        <p className="font-sans text-sm text-gold-100/50">
          No products match your search.
        </p>
      </div>
    )
  }

  return (
    <div className="border border-gold-400/15 rounded-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gold-400/15 bg-emerald-950/40">
              <Th>Item</Th>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Featured</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-gold-400/10 last:border-none hover:bg-emerald-950/30 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="w-[44px] h-[52px] object-cover rounded-sm border border-gold-400/15"
                    />
                    <span className="font-sans text-sm text-gold-100">{p.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="font-ui text-[10px] tracking-[0.14em] uppercase text-gold-400 border border-gold-400/25 rounded-sm px-2.5 py-1">
                    {p.category}
                  </span>
                </td>
                <td className="py-3 px-4 font-display text-gold-300">
                  ৳{Number(p.price).toFixed(0)}
                </td>
                <td className="py-3 px-4">
                  {p.is_featured && <Star size={14} className="text-gold-400" fill="#D4AF37" />}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(p)}
                      aria-label={`Edit ${p.name}`}
                      className="w-8 h-8 flex items-center justify-center border border-gold-400/25 text-gold-300 hover:border-gold-400 hover:bg-gold-400/10 rounded-sm transition-colors"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => onDelete(p)}
                      aria-label={`Delete ${p.name}`}
                      className="w-8 h-8 flex items-center justify-center border border-red-300/25 text-red-300 hover:border-red-300/60 hover:bg-red-400/10 rounded-sm transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Th({ children, className = '' }) {
  return (
    <th className={`py-3 px-4 font-ui text-[10px] tracking-[0.16em] uppercase text-gold-100/50 ${className}`}>
      {children}
    </th>
  )
}