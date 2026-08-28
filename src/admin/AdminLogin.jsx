import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminLogin() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    
    const { error } = await signIn(email, password)
    
    if (error) {
      setError(error.message)
      setSubmitting(false)
    } else {
      // Redirect to your admin dashboard page
      navigate('/admin')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-900 px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-emerald-800 border border-gold-400/25 rounded-sm p-8">
        <h1 className="text-2xl text-gold-100 font-serif mb-6 text-center">ZAVEL Admin</h1>
        <label className="block mb-4">
          <span className="text-xs uppercase tracking-wide text-gold-100/60">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full bg-emerald-900 border border-gold-400/25 focus:border-gold-400 rounded-sm px-3 py-2 text-gold-100 outline-none"
          />
        </label>
        <label className="block mb-6">
          <span className="text-xs uppercase tracking-wide text-gold-100/60">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full bg-emerald-900 border border-gold-400/25 focus:border-gold-400 rounded-sm px-3 py-2 text-gold-100 outline-none"
          />
        </label>
        {error && <p className="text-red-300 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gold-400 text-emerald-950 font-medium uppercase text-sm tracking-wide py-3 rounded-sm hover:bg-gold-300 transition-colors disabled:opacity-50"
        >
          {submitting ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
