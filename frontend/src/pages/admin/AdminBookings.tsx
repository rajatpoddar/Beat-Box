import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Filter, CheckCircle2, XCircle, AlertCircle, Eye, Phone,
  Calendar, Clock, Users, MapPin, RefreshCw
} from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface Booking {
  id: number
  name: string
  phone: string
  email?: string
  event_date: string
  event_type: string
  guests?: string
  venue?: string
  message?: string
  status: 'pending' | 'confirmed' | 'rejected' | 'completed'
  created_at: string
}

const statusConfig = {
  pending: { label: 'Pending', color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', icon: AlertCircle },
  confirmed: { label: 'Confirmed', color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20', icon: CheckCircle2 },
  rejected: { label: 'Rejected', color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20', icon: XCircle },
  completed: { label: 'Completed', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', icon: CheckCircle2 },
}

function BookingDetailModal({ booking, onClose, onStatusChange }: {
  booking: Booking
  onClose: () => void
  onStatusChange: (id: number, status: string) => void
}) {
  const status = statusConfig[booking.status]
  const StatusIcon = status.icon

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg bg-[#111111] border border-[#2a2a2a] rounded-3xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[#2a2a2a] flex items-center justify-between">
          <h3 className="text-white font-bold">Booking #{booking.id}</h3>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${status.bg} ${status.border}`}>
            <StatusIcon size={12} className={status.color} />
            <span className={`text-xs font-semibold ${status.color}`}>{status.label}</span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InfoItem icon={Users} label="Client" value={booking.name} />
            <InfoItem icon={Phone} label="Phone" value={booking.phone} href={`tel:${booking.phone}`} />
            <InfoItem icon={Calendar} label="Event Date" value={booking.event_date} />
            <InfoItem icon={Clock} label="Event Type" value={booking.event_type} />
            {booking.guests && <InfoItem icon={Users} label="Guests" value={booking.guests} />}
            {booking.venue && <InfoItem icon={MapPin} label="Venue" value={booking.venue} />}
          </div>
          {booking.message && (
            <div className="p-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a]">
              <p className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-2">Message</p>
              <p className="text-white text-sm">{booking.message}</p>
            </div>
          )}
        </div>

        {booking.status === 'pending' && (
          <div className="px-6 pb-6 flex gap-3">
            <button
              onClick={() => { onStatusChange(booking.id, 'confirmed'); onClose() }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold hover:bg-green-500/20 transition-all"
            >
              <CheckCircle2 size={16} /> Accept
            </button>
            <button
              onClick={() => { onStatusChange(booking.id, 'rejected'); onClose() }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/20 transition-all"
            >
              <XCircle size={16} /> Reject
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

function InfoItem({ icon: Icon, label, value, href }: { icon: typeof Calendar; label: string; value: string; href?: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-1">
        <Icon size={12} />
        {label}
      </div>
      {href ? (
        <a href={href} className="text-white text-sm font-semibold hover:text-[#e50914] transition-colors">{value}</a>
      ) : (
        <p className="text-white text-sm font-semibold">{value}</p>
      )}
    </div>
  )
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selected, setSelected] = useState<Booking | null>(null)

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('bb_admin_token')
      const res = await axios.get('/api/bookings/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setBookings(res.data)
    } catch {
      toast.error('Could not load bookings')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchBookings() }, [fetchBookings])

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const token = localStorage.getItem('bb_admin_token')
      await axios.patch(`/api/bookings/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success(`Booking ${status}`)
      fetchBookings()
    } catch {
      toast.error('Failed to update status')
    }
  }

  const filtered = bookings.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search) || b.event_type.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || b.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Bookings</h1>
          <p className="text-[#a0a0a0] text-sm mt-1">{bookings.length} total requests</p>
        </div>
        <button
          onClick={fetchBookings}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#2a2a2a] text-[#a0a0a0] text-sm hover:text-white hover:border-[#3a3a3a] transition-all"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#404040]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, phone, or event type..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111111] border border-[#2a2a2a] text-white placeholder-[#404040] text-sm focus:outline-none focus:border-[#e50914]/50 transition-all"
          />
        </div>
        <div className="relative">
          <Filter size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#404040]" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-3 rounded-xl bg-[#111111] border border-[#2a2a2a] text-white text-sm focus:outline-none focus:border-[#e50914]/50 transition-all appearance-none"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[#111111] border border-[#2a2a2a] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-[#e50914] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !filtered.length ? (
          <div className="py-16 text-center text-[#404040]">
            <Calendar size={32} className="mx-auto mb-3 opacity-30" />
            <p>No bookings found</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1a1a1a]">
                    {['#', 'Client', 'Event Type', 'Date', 'Guests', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-5 py-4 text-left text-[#a0a0a0] text-xs font-semibold uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a1a1a]">
                  {filtered.map(booking => {
                    const status = statusConfig[booking.status]
                    const StatusIcon = status.icon
                    return (
                      <tr key={booking.id} className="hover:bg-[#1a1a1a] transition-colors">
                        <td className="px-5 py-4 text-[#a0a0a0] text-sm">#{booking.id}</td>
                        <td className="px-5 py-4">
                          <p className="text-white text-sm font-semibold">{booking.name}</p>
                          <a href={`tel:${booking.phone}`} className="text-[#a0a0a0] text-xs hover:text-[#e50914] transition-colors">
                            {booking.phone}
                          </a>
                        </td>
                        <td className="px-5 py-4 text-white text-sm">{booking.event_type}</td>
                        <td className="px-5 py-4 text-[#a0a0a0] text-sm">{booking.event_date}</td>
                        <td className="px-5 py-4 text-[#a0a0a0] text-sm">{booking.guests || '–'}</td>
                        <td className="px-5 py-4">
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${status.bg}`}>
                            <StatusIcon size={12} className={status.color} />
                            <span className={`text-xs font-semibold ${status.color}`}>{status.label}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelected(booking)}
                              className="p-2 rounded-lg bg-[#1a1a1a] text-[#a0a0a0] hover:text-white hover:bg-[#2a2a2a] transition-all"
                              title="View Details"
                            >
                              <Eye size={14} />
                            </button>
                            {booking.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleStatusChange(booking.id, 'confirmed')}
                                  className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all"
                                  title="Confirm"
                                >
                                  <CheckCircle2 size={14} />
                                </button>
                                <button
                                  onClick={() => handleStatusChange(booking.id, 'rejected')}
                                  className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                                  title="Reject"
                                >
                                  <XCircle size={14} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-[#1a1a1a]">
              {filtered.map(booking => {
                const status = statusConfig[booking.status]
                const StatusIcon = status.icon
                return (
                  <div key={booking.id} className="p-4 hover:bg-[#1a1a1a] transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-white font-semibold">{booking.name}</p>
                        <a href={`tel:${booking.phone}`} className="text-[#a0a0a0] text-xs">{booking.phone}</a>
                      </div>
                      <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${status.bg}`}>
                        <StatusIcon size={10} className={status.color} />
                        <span className={`text-xs font-semibold ${status.color}`}>{status.label}</span>
                      </div>
                    </div>
                    <p className="text-[#a0a0a0] text-sm">{booking.event_type} · {booking.event_date}</p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => setSelected(booking)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1a1a1a] text-[#a0a0a0] text-xs hover:text-white transition-all"
                      >
                        <Eye size={12} /> View
                      </button>
                      {booking.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(booking.id, 'confirmed')}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-500/10 text-green-400 text-xs transition-all"
                          >
                            <CheckCircle2 size={12} /> Accept
                          </button>
                          <button
                            onClick={() => handleStatusChange(booking.id, 'rejected')}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 text-xs transition-all"
                          >
                            <XCircle size={12} /> Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <BookingDetailModal
            booking={selected}
            onClose={() => setSelected(null)}
            onStatusChange={handleStatusChange}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
