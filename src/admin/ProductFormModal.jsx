import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function ProductFormModal({ open, initialProduct, onClose, onSaved }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Rings')
  const [price, setPrice] = useState('')
  const [featured, setFeatured] = useState(false)
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name || '')
      setCategory(initialProduct.category || 'Rings')
      setPrice(initialProduct.price || '')
      setFeatured(initialProduct.featured || false)
      setDescription(initialProduct.description || '')
      setImageUrl(initialProduct.image_url || '')
    } else {
      setName('')
      setCategory('Rings')
      setPrice('')
      setFeatured(false)
      setDescription('')
      setImageUrl('')
    }
  }, [initialProduct, open])

  if (!open) return null

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `products/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file)

    if (uploadError) {
      alert(`Upload error: ${uploadError.message}`)
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from('product-images').getPublicUrl(filePath)
    setImageUrl(data.publicUrl)
    setUploading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    const payload = {
      name,
      category,
      price: parseFloat(price),
      featured,
      description,
      image_url: imageUrl,
    }

    let error = null

    if (initialProduct?.id) {
      const res = await supabase.from('products').update(payload).eq('id', initialProduct.id)
      error = res.error
    } else {
      const res = await supabase.from('products').insert([payload])
      error = res.error
    }

    setSaving(false)

    if (error) {
      alert(`Failed to save product: ${error.message}`)
    } else {
      onSaved()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <form onSubmit={handleSubmit} className="bg-emerald-900 border border-gold-400/30 rounded-sm p-6 w-full max-w-md text-gold-100">
        <h2 className="text-xl font-serif mb-6">{initialProduct ? 'Edit Product' : 'Add Product'}</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            required
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-emerald-950 border border-gold-400/25 rounded-sm px-3 py-2 text-sm text-gold-100 outline-none"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-emerald-950 border border-gold-400/25 rounded-sm px-3 py-2 text-sm text-gold-100 outline-none"
          >
            <option value="Rings">Rings</option>
            <option value="Necklaces">Necklaces</option>
            <option value="Earrings">Earrings</option>
            <option value="Bracelets">Bracelets</option>
          </select>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <input
            type="number"
            step="any"
            required
            placeholder="Price (BDT ৳)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-emerald-950 border border-gold-400/25 rounded-sm px-3 py-2 text-sm text-gold-100 outline-none"
          />
          <label className="flex items-center gap-2 text-xs uppercase cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="accent-gold-400"
            />
            Featured
          </label>
        </div>

        <textarea
          placeholder="Description"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-emerald-950 border border-gold-400/25 rounded-sm px-3 py-2 text-sm text-gold-100 outline-none mb-4"
        />

        <div className="mb-6 space-y-2">
          <label className="block text-xs uppercase text-gold-100/60">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="w-full text-xs text-gold-100 file:mr-3 file:py-2 file:px-3 file:rounded-sm file:border-0 file:bg-gold-400 file:text-emerald-950 file:font-medium hover:file:bg-gold-300 file:cursor-pointer"
          />
          {uploading && <p className="text-xs text-gold-300">Uploading picture…</p>}
          {imageUrl && (
            <div className="flex items-center gap-2 mt-2">
              <img src={imageUrl} alt="Preview" className="w-12 h-12 object-cover rounded border border-gold-400/30" />
              <span className="text-xs text-emerald-300">✓ Image attached</span>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 border border-gold-400/30 py-2 rounded-sm text-sm text-gold-100/80"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving || uploading}
            className="w-1/2 bg-gold-400 text-emerald-950 font-medium py-2 rounded-sm text-sm hover:bg-gold-300 disabled:opacity-50"
          >
            {saving ? 'Saving…' : initialProduct ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  )
}
