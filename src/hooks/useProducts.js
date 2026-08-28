import { useCallback, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import { seedProducts } from '../data/seedProducts'

// Fetches the live catalog from Supabase when configured, otherwise falls
// back to the local seed data so the storefront always renders correctly.
export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [usingFallback, setUsingFallback] = useState(!isSupabaseConfigured)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)

    if (!isSupabaseConfigured) {
      setProducts(seedProducts)
      setUsingFallback(true)
      setLoading(false)
      return
    }

    const { data, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      // Table might not exist yet (schema.sql not run) — fail soft to seed data.
      setError(fetchError.message)
      setProducts(seedProducts)
      setUsingFallback(true)
    } else {
      setProducts(data ?? [])
      setUsingFallback(false)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { products, loading, error, usingFallback, refresh }
}
