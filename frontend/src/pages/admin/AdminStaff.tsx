import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Edit3, Trash2, Users, X, Loader2, Phone, Mail, Briefcase } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface StaffMember {
  id: number; name: string; phone: string; email?: string
  role: string; status: string; assignment?: string; joined_date?: string
}
const roles = ['DJ', 'Lighting Technician', 'Stage Manager', 'Decorator', 'Driver', 'Helper', 'Anchor', 'Manager']
const statusColors: Record<string, string> = {
  available: 'text-green-400 bg-green-400/10',
  assigned: 'text-yellow-400 bg-yellow-400/10',
  on_leave: 'text-red-400 bg-red-400/10',
}

function StaffModal({ staff, onClose, onSave }: { staff: Partial<StaffMember> | null; onClose: () => void; onSave: () => void }) {
  const isEdit = !!staff?.id
  const [form, setForm] = useState(isEdit ? { ...staff } : { name: '', phone: '', email: '', role: '', status: 'available', assignment: '', joined_date: '' })
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    try {
      const token = localStorage.getItem('bb_admin_token')
      const h = { Authorization: `Bearer ${token}` }
      if (isEdit) { await axios.put(`/api/staff/${staff!.id}`, form, { headers: h }); toast.success('Updated') }
      else { await axios.post('/api/staff/', form, { headers: h }); toast.success('Staff added') }
      onSave(); onClose()
    } catch { toast.error('Failed to save') } finally { setLoading(false) }
  }
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
        className="w-full max-w-lg bg-[#111111] border border-[#2a2a2a] rounded-3xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-[#2a2a2a] flex items-center justify-between">
          <h3 className="text-white font-bold">{isEdit ? 'Edit Staff' : 'Add Staff'}</h3>
          <button onClick={onClose} className="text-[#a0a0a0] hover:text-white"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-2 block">Full Name *</label>
              <input value={form.name as string} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required
                placeholder="Staff member name"
                className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-[#404040] text-sm focus:outline-none focus:border-[#e50914]/50 transition-all" />
            </div>
            <div>
              <label className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-2 block">Phone *</label>
              <input value={form.phone as string} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} required
                className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm focus:outline-none focus:border-[#e50914]/50 transition-all" />
            </div>
            <div>
              <label className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-2 block">Email</label>
              <input type="email" value={form.email as string || ''} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm focus:outline-none focus:border-[#e50914]/50 transition-all" />
            </div>
            <div>
              <label className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-2 block">Role *</label>
              <select value={form.role as string} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} required
                className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm focus:outline-none focus:border-[#e50914]/50 transition-all">
                <option value="">Select role</option>
                {roles.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-2 block">Status</label>
              <select value={form.status as string} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm focus:outline-none focus:border-[#e50914]/50 transition-all">
                <option value="available">Available</option>
                <option value="assigned">Assigned</option>
                <option value="on_leave">On Leave</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-2 block">Current Assignment</label>
              <input value={form.assignment as string || ''} onChange={e => setForm(p => ({ ...p, assignment: e.target.value }))}
                placeholder="e.g. Sharma Wedding - 12 May"
                className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-[#404040] text-sm focus:outline-none focus:border-[#e50914]/50 transition-all" />
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#e50914] text-white font-bold text-sm hover:bg-[#ff1a24] disabled:opacity-60 transition-all shadow-lg shadow-red-900/30">
            {loading ? <Loader2 size={16} className="animate-spin" /> : isEdit ? 'Update Staff' : 'Add Staff'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default function AdminStaff() {
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<Partial<StaffMember> | null | 'new'>(null)

  const fetchStaff = useCallback(async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('bb_admin_token')
      const res = await axios.get('/api/staff/', { headers: { Authorization: `Bearer ${token}` } })
      setStaff(res.data)
    } catch { toast.error('Could not load staff') } finally { setLoading(false) }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStaff()
  }, [fetchStaff])

  const handleDelete = async (id: number) => {
    if (!confirm('Remove this staff member?')) return
    try {
      const token = localStorage.getItem('bb_admin_token')
      await axios.delete(`/api/staff/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      toast.success('Removed'); fetchStaff()
    } catch { toast.error('Failed') }
  }

  const filtered = staff.filter(s =>
    (s.name + s.role + s.phone).toLowerCase().includes(search.toLowerCase())
  )
  const stats = {
    total: staff.length,
    available: staff.filter(s => s.status === 'available').length,
    assigned: staff.filter(s => s.status === 'assigned').length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Staff</h1>
          <p className="text-[#a0a0a0] text-sm mt-1">{staff.length} members</p>
        </div>
        <button onClick={() => setModal('new')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e50914] text-white text-sm font-semibold hover:bg-[#ff1a24] transition-all shadow-lg shadow-red-900/30">
          <Plus size={16} /> Add Staff
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total', value: stats.total, color: 'text-white' },
          { label: 'Available', value: stats.available, color: 'text-green-400' },
          { label: 'Assigned', value: stats.assigned, color: 'text-yellow-400' },
        ].map(s => (
          <div key={s.label} className="p-4 rounded-2xl bg-[#111111] border border-[#2a2a2a] text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-[#a0a0a0] text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#404040]" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, role, or phone..."
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111111] border border-[#2a2a2a] text-white placeholder-[#404040] text-sm focus:outline-none focus:border-[#e50914]/50 transition-all" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-[#e50914] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : !filtered.length ? (
        <div className="py-16 text-center text-[#404040] rounded-2xl bg-[#111111] border border-[#2a2a2a]">
          <Users size={32} className="mx-auto mb-3 opacity-30" />
          <p>No staff members found</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((member, i) => (
            <motion.div key={member.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-5 rounded-2xl bg-[#111111] border border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e50914]/10 flex items-center justify-center text-[#e50914] font-black text-sm">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-bold">{member.name}</p>
                    <div className="flex items-center gap-1 text-[#a0a0a0] text-xs mt-0.5">
                      <Briefcase size={10} />
                      {member.role}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setModal(member)} className="p-2 rounded-lg text-[#a0a0a0] hover:bg-[#1a1a1a] hover:text-white transition-all">
                    <Edit3 size={14} />
                  </button>
                  <button onClick={() => handleDelete(member.id)} className="p-2 rounded-lg text-[#a0a0a0] hover:bg-red-500/10 hover:text-red-400 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="space-y-2 mb-3">
                <a href={`tel:${member.phone}`} className="flex items-center gap-2 text-[#a0a0a0] text-xs hover:text-white transition-colors">
                  <Phone size={12} className="text-[#e50914]" />{member.phone}
                </a>
                {member.email && (
                  <div className="flex items-center gap-2 text-[#a0a0a0] text-xs">
                    <Mail size={12} className="text-[#e50914]" />{member.email}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className={`px-2.5 py-1 rounded-xl text-xs font-semibold ${statusColors[member.status] || 'text-[#a0a0a0] bg-[#1a1a1a]'}`}>
                  {member.status.replace('_', ' ')}
                </div>
                {member.assignment && (
                  <p className="text-[#a0a0a0] text-xs truncate ml-2">{member.assignment}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
      <AnimatePresence>
        {modal !== null && (
          <StaffModal staff={modal === 'new' ? null : modal} onClose={() => setModal(null)} onSave={fetchStaff} />
        )}
      </AnimatePresence>
    </div>
  )
}
