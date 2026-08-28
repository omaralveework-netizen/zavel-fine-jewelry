import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const BLANK = { name: '', category: 'Rings', price: '', description: '', image_url: '', is_featured: false }

export default function ProductFormModal({ open, onClose, onSaved, initialProduct }) {
  const isEdit = Boolean(initialProduct)
  const [form, setForm] = useState(initialProduct ? { ...BLANK, ...initialProduct } : BLANK)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  if (!open) return null

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: field === 'is_featured' ? e.target.checked : e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const payload = { ...form, price: Number(form.price) }
    const { error } = isEdit
      ? await supabase.from('products').update(payload).eq('id', initialProduct.id)
      : await supabase.from('products').insert(payload)
    setSaving(false)
    if (error) return setError(error.message)
    onSaved()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-emerald-800 border border-gold-400/25 rounded-sm p-7">
        <h2 className="text-xl text-gold-100 font-serif mb-5">{isEdit ? 'Edit Product' : 'Add Product'}</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input required placeholder="Name" value={form.name} onChange={update('name')} className="input" />
          <select value={form.category} onChange={update('category')} className="input">
            <option value="Rings">Rings</option>
            <option value="Earrings">Earrings</option>
            <option value="Necklaces">Necklaces</option>
            <option value="Bracelets">Bracelets</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input required type="number" step="0.01" placeholder="Price (USD)" value={form.price} onChange={update('price')} className="input" />
          <label className="flex items-center gap-2 text-gold-100/80 text-sm">
            <input type="checkbox" checked={form.is_featured} onChange={update('is_featured')} />
            Featured
          </label>
        </div>
        <textarea required rows={3} placeholder="Description" value={form.description} onChange={update('description')} className="input mb-4 resize-none w-full" />
        <input
          required
          placeholder="Image URL (https://...)"
          value={form.image_url}
          onChange={update('image_url')}
          className="input mb-3 w-full"
        />
        {form.image_url && (
          <img src={form.image_url} alt="Preview" className="w-24 h-28 object-cover rounded-sm border border-gold-400/20 mb-4" />
        )}
        {error && <p className="text-red-300 text-sm mb-3">{error}</p>}
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 border border-gold-400/30 text-gold-100/80 py-2.5 rounded-sm">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="flex-1 bg-gold-400 text-emerald-950 font-medium py-2.5 rounded-sm disabled:opacity-50">
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Product'}
          </button>
        </div>
      </form>
      <style>{`.input{background:#0B2B20;border:1px solid rgba(212,175,55,.25);border-radius:2px;padding:.55rem .75rem;color:#F8F5EE;outline:none}.input:focus{border-color:#D4AF37}`}</style>
    </div>
  )
}