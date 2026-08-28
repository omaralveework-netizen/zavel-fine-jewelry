import { useAuth } from '../context/AuthContext'
import AdminLogin from '../admin/AdminLogin'
import AdminDashboard from '../admin/AdminDashboard'

export default function Admin() {
  const { session, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-900 text-gold-100">
        Loading…
      </div>
    )
  }

  return session && isAdmin ? <AdminDashboard /> : <AdminLogin />
}