import { useEffect, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import Modal from './Modal'
import { useCart } from '../context/CartContext'

export default function QuickViewModal({ product, onClose }) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)

  useEffect(() => {
    setQty(1)
  }, [product])

  if (!product) return null

  return (
    <Modal open={Boolean(product)} onClose={onClose} maxWidth="max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-8 mt-2">
        <div className="rounded-sm overflow-hidden border border-gold-400/20">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full aspect-[4/5] object-cover"
          />
        </div>

        <div className="flex flex-col">
          <span className="font-ui text-[10px] tracking-[0.3em] text-gold-500 uppercase mb-2">
            {product.category}
          </span>
          <h3 className="font-display text-2xl text-gold-100 mb-3">{product.name}</h3>
          <p className="font-sans text-sm text-gold-100/70 leading-relaxed mb-5">
            {product.description}
          </p>
          <span className="font-display text-2xl text-gold-300 mb-6">
            ৳{Number(product.price).toFixed(0)}
          </span>

          <div className="flex items-center border border-gold-400/30 rounded-sm w-fit mb-6">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-10 h-10 flex items-center justify-center text-gold-300 hover:bg-gold-400/10 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="w-10 text-center font-ui text-sm text-gold-100">{qty}</span>
            <button
              onClick={() => setQty((q) => Math.min(10, q + 1))}
              className="w-10 h-10 flex items-center justify-center text-gold-300 hover:bg-gold-400/10 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            onClick={() => {
              addItem(product, qty)
              onClose()
            }}
            className="mt-auto bg-gold-400 text-emerald-950 font-ui text-xs tracking-[0.2em] uppercase py-4 rounded-sm hover:bg-gold-300 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Modal>
  )
}