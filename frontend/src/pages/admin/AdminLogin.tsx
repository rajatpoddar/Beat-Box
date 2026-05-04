import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Music2, Eye, EyeOff, Loader2, Lock } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ username: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post('/api/auth/login', new URLSearchParams({
        username: form.username,
        password: form.password,
      }))
      localStorage.setItem('bb_admin_token', res.data.access_token)
      toast.success('Welcome back!')
      navigate('/admin')
    } catch {
      toast.error('Invalid credentials. Try admin/admin123')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-80 h-80 bg-[#e50914]/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#e50914]/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#e50914] mb-4 shadow-xl shadow-red-900/40">
            <Music2 size={28} className="text-white" />
          </div>
          <h1 className="text-white font-black text-3xl">
            BEAT<span className="text-[#e50914]">BOX</span>
          </h1>
          <p className="text-[#a0a0a0] text-sm mt-1">Admin Dashboard</p>
        </div>

        {/* Form Card */}
        <div className="p-8 rounded-3xl bg-[#111111] border border-[#2a2a2a]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-[#e50914]/10 flex items-center justify-center">
              <Lock size={16} className="text-[#e50914]" />
            </div>
            <div>
              <h2 className="text-white font-bold">Sign In</h2>
              <p className="text-[#a0a0a0] text-xs">Enter your admin credentials</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-2 block">
                Username
              </label>
              <input
                value={form.username}
                onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                placeholder="admin"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-[#404040] text-sm focus:outline-none focus:border-[#e50914]/50 transition-all"
              />
            </div>

            <div>
              <label className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-2 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-[#404040] text-sm focus:outline-none focus:border-[#e50914]/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#404040] hover:text-[#a0a0a0] transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#e50914] text-white font-bold text-sm hover:bg-[#ff1a24] disabled:opacity-60 transition-all mt-6 shadow-lg shadow-red-900/30"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-[#404040] text-xs mt-6">
            Default: admin / admin123
          </p>
        </div>
      </motion.div>
    </div>
  )
}
