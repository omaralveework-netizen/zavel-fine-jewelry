import Modal from '../components/Modal'
import { AlertTriangle } from 'lucide-react'

export default function DeleteConfirmModal({ product, onCancel, onConfirm, deleting }) {
  return (
    <Modal open={Boolean(product)} onClose={onCancel} maxWidth="max-w-sm">
      <div className="text-center pt-2">
        <div className="w-12 h-12 rounded-full border border-red-300/30 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={20} className="text-red-300" strokeWidth={1.6} />
        </div>
        <h3 className="font-display text-xl text-gold-100 mb-2">Delete this product?</h3>
        <p className="font-sans text-sm text-gold-100/60 mb-7 leading-relaxed">
          <span className="text-gold-100">{product?.name}</span> will be
          permanently removed from the catalog. This can't be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-gold-400/30 text-gold-100/80 font-ui text-xs tracking-[0.16em] uppercase py-3 rounded-sm hover:border-gold-400/60 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="flex-1 bg-red-400/90 text-emerald-950 font-ui text-xs tracking-[0.16em] uppercase py-3 rounded-sm hover:bg-red-300 transition-colors disabled:opacity-50"
          >
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </Modal>
  )
}
