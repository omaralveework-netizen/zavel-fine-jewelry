import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, children, maxWidth = 'max-w-lg', title }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-rise"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`relative w-full ${maxWidth} max-h-[90vh] overflow-y-auto no-scrollbar bg-emerald-800 border border-gold-400/30 shadow-gold-lg rounded-sm p-7 sm:p-9`}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center border border-gold-400/30 text-gold-300 hover:border-gold-400 hover:bg-gold-400/10 transition-colors rounded-sm"
        >
          <X size={16} strokeWidth={1.6} />
        </button>
        {title && (
          <h3 className="font-display text-2xl text-gold-100 mb-1 pr-8">{title}</h3>
        )}
        {children}
      </div>
    </div>
  )
}
