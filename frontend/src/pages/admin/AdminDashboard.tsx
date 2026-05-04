import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar, Package, Users, TrendingUp, Clock, CheckCircle2, XCircle, AlertCircle
} from 'lucide-react'
import axios from 'axios'

interface Stats {
  total_bookings: number
  pending_bookings: number
  confirmed_bookings: number
  total_staff: number
  total_inventory: number
  recent_bookings: Booking[]
}

interface Booking {
  id: number
  name: string
  phone: string
  event_type: string
  event_date: string
  status: string
  created_at: string
}

const statusConfig = {
  pending: { icon: AlertCircle, color: 'text-yellow-400', bg: 'bg-yellow-400/10', label: 'Pending' },
  confirmed: { icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-400/10', label: 'Confirmed' },
  rejected: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/10', label: 'Rejected' },
  completed: { icon: CheckCircle2, color: 'text-blue-400', bg: 'bg-blue-400/10', label: 'Completed' },
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem('bb_admin_token')
        const res = await axios.get('/api/dashboard/stats', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setStats(res.data)
      } catch {
        // Use mock data if backend not connected
        setStats({
          total_bookings: 0,
          pending_bookings: 0,
          confirmed_bookings: 0,
          total_staff: 0,
          total_inventory: 0,
          recent_bookings: [],
        })
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const statCards = [
    { label: 'Total Bookings', value: stats?.total_bookings ?? 0, icon: Calendar, color: 'text-[#e50914]', bg: 'bg-[#e50914]/10' },
    { label: 'Pending', value: stats?.pending_bookings ?? 0, icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { label: 'Confirmed', value: stats?.confirmed_bookings ?? 0, icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Staff Members', value: stats?.total_staff ?? 0, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Inventory Items', value: stats?.total_inventory ?? 0, icon: Package, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Success Rate', value: '100%', icon: TrendingUp, color: 'text-[#f5c518]', bg: 'bg-[#f5c518]/10' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#e50914] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">Dashboard</h1>
        <p className="text-[#a0a0a0] text-sm mt-1">Welcome back — here's what's happening today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map(({ label, value, icon: Icon, color, bg }, i) => (
          <motion.div
            key={label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="p-5 rounded-2xl bg-[#111111] border border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors"
          >
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon size={20} className={color} />
            </div>
            <p className={`text-2xl font-black ${color}`}>{value}</p>
            <p className="text-[#a0a0a0] text-sm mt-1">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Bookings */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="rounded-2xl bg-[#111111] border border-[#2a2a2a] overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-[#2a2a2a] flex items-center justify-between">
          <h2 className="text-white font-bold">Recent Bookings</h2>
          <span className="text-[#a0a0a0] text-xs">{stats?.recent_bookings?.length ?? 0} total</span>
        </div>

        {!stats?.recent_bookings?.length ? (
          <div className="px-6 py-12 text-center text-[#404040]">
            <Calendar size={32} className="mx-auto mb-3 opacity-30" />
            <p>No bookings yet. They'll appear here when clients submit the booking form.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#1a1a1a]">
            {stats.recent_bookings.map((booking) => {
              const status = statusConfig[booking.status as keyof typeof statusConfig] ?? statusConfig.pending
              const StatusIcon = status.icon
              return (
                <div key={booking.id} className="px-6 py-4 flex items-center gap-4 hover:bg-[#1a1a1a] transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{booking.name}</p>
                    <p className="text-[#a0a0a0] text-xs mt-0.5">{booking.event_type} · {booking.event_date}</p>
                  </div>
                  <a href={`tel:${booking.phone}`} className="text-[#a0a0a0] text-xs hover:text-white hidden sm:block">
                    {booking.phone}
                  </a>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${status.bg}`}>
                    <StatusIcon size={12} className={status.color} />
                    <span className={`text-xs font-semibold ${status.color}`}>{status.label}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </motion.div>
    </div>
  )
}
