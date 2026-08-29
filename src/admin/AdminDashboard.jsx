import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'
import ProductFormModal from './ProductFormModal'

export default function AdminDashboard() {
  const { session, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState('products')
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const loadProducts = async () => {
    setLoading(true)
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    setProducts(data ?? [])
    setLoading(false)
  }

  const loadOrders = async () => {
    setLoading(true)
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    setOrders(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    if (activeTab === 'products') loadProducts()
    if (activeTab === 'orders') loadOrders()
  }, [activeTab])

  const handleDeleteProduct = async (product) => {
    if (!confirm(`Delete "${product.name}"? This can't be undone.`)) return
    await supabase.from('products').delete().eq('id', product.id)
    loadProducts()
  }

  const handleDeleteOrder = async (orderId) => {
    if (!confirm(`Are you sure you want to delete order #${orderId.slice(0, 8)}?`)) return
    await supabase.from('orders').delete().eq('id', orderId)
    if (selectedOrder?.id === orderId) setSelectedOrder(null)
    loadOrders()
  }

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    await supabase.from('orders').update({ status: newStatus }).eq('id', orderId)
    loadOrders()
  }

  const parseItems = (items) => {
    if (!items) return []
    if (Array.isArray(items)) return items
    if (typeof items === 'string') {
      try {
        return JSON.parse(items)
      } catch (e) {
        return []
      }
    }
    return []
  }

  return (
    <div className="min-h-screen bg-emerald-900 px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl text-gold-100 font-serif">ZAVEL Admin</h1>
          <p className="text-xs text-gold-100/50">{session?.user?.email}</p>
        </div>
        <div className="flex gap-3">
          {activeTab === 'products' && (
            <button 
              onClick={() => { setEditing(null); setFormOpen(true) }} 
              className="bg-gold-400 text-emerald-950 text-sm font-medium px-4 py-2 rounded-sm hover:bg-gold-300 transition-colors"
            >
              + Add Product
            </button>
          )}
          <button onClick={signOut} className="border border-gold-400/30 text-gold-100/80 text-sm px-4 py-2 rounded-sm hover:bg-emerald-800 transition-colors">
            Sign Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gold-400/20 pb-3">
        <button
          onClick={() => setActiveTab('products')}
          className={`text-sm font-medium px-3 py-1 rounded-sm ${activeTab === 'products' ? 'bg-gold-400 text-emerald-950' : 'text-gold-100/70 hover:text-gold-100'}`}
        >
          Products ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`text-sm font-medium px-3 py-1 rounded-sm ${activeTab === 'orders' ? 'bg-gold-400 text-emerald-950' : 'text-gold-100/70 hover:text-gold-100'}`}
        >
          Orders ({orders.length})
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-gold-100/50">Loading…</p>
      ) : activeTab === 'products' ? (
        <table className="w-full text-left border border-gold-400/15 rounded-sm overflow-hidden">
          <thead className="bg-emerald-950/40 text-gold-100/50 text-xs uppercase">
            <tr>
              <th className="p-3">Item</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-gold-400/10">
                <td className="p-3 flex items-center gap-3">
                  <img src={p.image_url} alt={p.name} className="w-10 h-12 object-cover rounded-sm" />
                  <span className="text-gold-100 text-sm">{p.name}</span>
                </td>
                <td className="p-3 text-gold-100/70 text-sm">{p.category}</td>
                <td className="p-3 text-gold-300 text-sm">৳{Number(p.price).toLocaleString()}</td>
                <td className="p-3 text-right space-x-2">
                  <button onClick={() => { setEditing(p); setFormOpen(true) }} className="text-gold-300 text-xs underline">Edit</button>
                  <button onClick={() => handleDeleteProduct(p)} className="text-red-300 text-xs underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="w-full text-left border border-gold-400/15 rounded-sm overflow-hidden">
          <thead className="bg-emerald-950/40 text-gold-100/50 text-xs uppercase">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gold-100/50 text-sm">No orders found.</td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="border-t border-gold-400/10 text-sm text-gold-100 hover:bg-emerald-800/30">
                  <td className="p-3 font-mono text-xs text-gold-300">{o.id.slice(0, 8)}...</td>
                  <td className="p-3">{o.customer_name || o.email || o.phone || 'Guest'}</td>
                  <td className="p-3 text-gold-300">৳{Number(o.total_amount || o.total || 0).toLocaleString()}</td>
                  <td className="p-3">
                    <select
                      value={o.status || 'pending'}
                      onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                      className="bg-emerald-950 border border-gold-400/30 text-gold-100 text-xs rounded px-2 py-1 outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-3 text-gold-100/50 text-xs">{new Date(o.created_at).toLocaleDateString()}</td>
                  <td className="p-3 text-right space-x-2">
                    <button onClick={() => setSelectedOrder(o)} className="text-gold-300 text-xs underline">View</button>
                    <button onClick={() => handleDeleteOrder(o.id)} className="text-red-300 text-xs underline">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-emerald-800 border border-gold-400/30 rounded-sm p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto text-gold-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-serif">Order Details (#{selectedOrder.id.slice(0, 8)})</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-gold-100/60 hover:text-gold-100">✕</button>
            </div>
            
            <div className="space-y-3 text-sm border-t border-b border-gold-400/20 py-4 mb-4">
              <p><strong className="text-gold-300">Customer:</strong> {selectedOrder.customer_name || 'N/A'}</p>
              <p><strong className="text-gold-300">Email:</strong> {selectedOrder.email || 'N/A'}</p>
              <p><strong className="text-gold-300">Phone:</strong> {selectedOrder.phone || 'N/A'}</p>
              <p><strong className="text-gold-300">Address:</strong> {selectedOrder.address || 'N/A'}</p>
              <p><strong className="text-gold-300">Total:</strong> ৳{Number(selectedOrder.total_amount || selectedOrder.total || 0).toLocaleString()}</p>
              <p><strong className="text-gold-300">Status:</strong> {selectedOrder.status || 'Pending'}</p>
            </div>

            {selectedOrder.items && (
              <div className="mb-4">
                <h3 className="text-xs uppercase tracking-wide text-gold-300 mb-2">Order Items</h3>
                <div className="bg-emerald-950 rounded p-3 divide-y divide-gold-400/10">
                  {parseItems(selectedOrder.items).map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 text-xs text-gold-100">
                      <div>
                        <span className="font-medium">{item.name || item.title}</span>
                        <span className="text-gold-100/50 block">Qty: {item.qty || item.quantity || 1}</span>
                      </div>
                      <span className="text-gold-300 font-mono">
                        ৳{Number((item.price || 0) * (item.qty || item.quantity || 1)).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between pt-2">
              <button 
                onClick={() => handleDeleteOrder(selectedOrder.id)} 
                className="bg-red-900/60 text-red-200 border border-red-500/30 text-xs px-3 py-2 rounded-sm hover:bg-red-900"
              >
                Delete Order
              </button>
              <button 
                onClick={() => setSelectedOrder(null)} 
                className="bg-gold-400 text-emerald-950 text-xs font-medium px-4 py-2 rounded-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ProductFormModal
        open={formOpen}
        initialProduct={editing}
        onClose={() => setFormOpen(false)}
        onSaved={() => { setFormOpen(false); loadProducts() }}
      />
    </div>
  )
}
