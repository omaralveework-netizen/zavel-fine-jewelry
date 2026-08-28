import { useMemo, useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import CollectionsBand from '../components/CollectionsBand'
import CategoryTabs from '../components/CategoryTabs'
import ProductGrid from '../components/ProductGrid'
import QuickViewModal from '../components/QuickViewModal'
import CartDrawer from '../components/CartDrawer'
import CheckoutModal from '../components/CheckoutModal'
import Footer from '../components/Footer'
import { useProducts } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'

export default function Landing() {
  const { products, loading, usingFallback } = useProducts()
  const { closeCart } = useCart()
  const [category, setCategory] = useState('All')
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  const filtered = useMemo(
    () => (category === 'All' ? products : products.filter((p) => p.category === category)),
    [products, category]
  )

  const goToShop = (cat) => {
    setCategory(cat)
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-emerald-900">
      <Header />
      <Hero />
      <CollectionsBand onSelect={goToShop} />

      <section id="shop" className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <div className="divider-flourish max-w-[220px] mb-4">
              <span className="font-ui text-[11px] tracking-[0.4em] text-gold-400 whitespace-nowrap">
                THE CATALOG
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-gold-100">
              Shop the Collection
            </h2>
          </div>
          <CategoryTabs active={category} onChange={setCategory} />
        </div>

        {usingFallback && (
          <p className="mb-8 font-ui text-[11px] tracking-[0.08em] text-gold-500/80 border border-gold-400/20 rounded-sm px-4 py-3">
            Showing sample inventory — connect Supabase (see README) to manage
            this catalog live from the Admin Portal.
          </p>
        )}

        <ProductGrid products={filtered} loading={loading} onQuickView={setQuickViewProduct} />
      </section>

      <Footer />

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      <CartDrawer
        onCheckout={() => {
          closeCart()
          setCheckoutOpen(true)
        }}
      />
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  )
}
