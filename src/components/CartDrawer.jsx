import { Minus, Plus, Trash2, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import CrownMark from './CrownMark'

export default function CartDrawer({ onCheckout }) {
  const { items, isOpen, closeCart, setQty, removeItem, subtotal } = useCart()

  return (
    <>
      <div
        className={`fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[85] w-full max-w-md bg-emerald-900 border-l border-gold-400/25
                    flex flex-col transition-transform duration-500 ease-[cubic-bezier(.16,.8,.24,1)]
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gold-400/20">
          <h3 className="font-display text-xl text-gold-100">Your Selection</h3>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="w-9 h-9 flex items-center justify-center border border-gold-400/30 text-gold-300 hover:border-gold-400 rounded-sm transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-2 no-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-16">
              <CrownMark className="w-9 h-7 opacity-40" />
              <p className="font-sans text-sm text-gold-100/50 max-w-[220px]">
                Your selection is empty. Browse Rings or Earrings to begin.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 py-5 border-b border-gold-400/10 last:border-none"
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-16 h-20 object-cover rounded-sm shrink-0"
                />
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-display text-sm text-gold-100">{item.name}</span>
                    <span className="font-ui text-xs text-gold-100/50 whitespace-nowrap">
                      ৳{Number(item.price).toFixed(0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gold-400/25 rounded-sm">
                      <button
                        onClick={() => setQty(item.id, item.qty - 1)}
                        className="w-7 h-7 flex items-center justify-center text-gold-300 hover:bg-gold-400/10 transition-colors"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="w-7 text-center font-ui text-xs text-gold-100">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => setQty(item.id, item.qty + 1)}
                        className="w-7 h-7 flex items-center justify-center text-gold-300 hover:bg-gold-400/10 transition-colors"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                    <span className="font-display text-gold-300 text-sm">
                      ৳{(Number(item.price) * item.qty).toFixed(0)}
                    </span>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="self-start flex items-center gap-1.5 font-ui text-[10px] tracking-[0.1em] uppercase text-gold-100/40 hover:text-gold-300 transition-colors"
                  >
                    <Trash2 size={11} /> Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-6 py-5 border-t border-gold-400/20">
          <div className="flex items-center justify-between mb-4">
            <span className="font-ui text-xs tracking-[0.14em] uppercase text-gold-100/60">
              Subtotal
            </span>
            <span className="font-display text-xl text-gold-300">৳{subtotal.toFixed(0)}</span>
          </div>
          <button
            disabled={items.length === 0}
            onClick={onCheckout}
            className="w-full bg-gold-400 text-emerald-950 font-ui text-xs tracking-[0.2em] uppercase py-4 rounded-sm hover:bg-gold-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Checkout
          </button>
        </div>
      </aside>
    </>
  )
}