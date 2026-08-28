import { useAuth } from '../context/AuthContext'
import AdminLogin from '../admin/AdminLogin'
import AdminDashboard from '../admin/AdminDashboard'

export default function Admin() {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-900 text-gold-100">
        Loading…
      </div>
    )
  }

  // Renders the dashboard as long as you are signed into Supabase
  return session ? <AdminDashboard /> : <AdminLogin />
}
