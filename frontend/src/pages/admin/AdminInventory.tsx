import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Edit3, Trash2, Package, AlertTriangle, X, Loader2 } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface InventoryItem {
  id: number; name: string; category: string; quantity: number
  available_quantity: number; condition: string; purchase_date?: string; notes?: string
}
const categories = ['Speaker', 'Light', 'Stage', 'DJ Equipment', 'Chair', 'Table', 'Generator', 'Other']
const conditions = ['Excellent', 'Good', 'Fair', 'Needs Repair']
const conditionColors: Record<string, string> = {
  Excellent: 'text-green-400 bg-green-400/10', Good: 'text-blue-400 bg-blue-400/10',
  Fair: 'text-yellow-400 bg-yellow-400/10', 'Needs Repair': 'text-red-400 bg-red-400/10',
}

function ItemModal({ item, onClose, onSave }: { item: Partial<InventoryItem> | null; onClose: () => void; onSave: () => void }) {
  const isEdit = !!item?.id
  const [form, setForm] = useState(isEdit ? { ...item } : { name: '', category: '', quantity: 1, available_quantity: 1, condition: 'Good', purchase_date: '', notes: '' })
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    try {
      const token = localStorage.getItem('bb_admin_token')
      const h = { Authorization: `Bearer ${token}` }
      if (isEdit) { await axios.put(`/api/inventory/${item!.id}`, form, { headers: h }); toast.success('Updated') }
      else { await axios.post('/api/inventory/', form, { headers: h }); toast.success('Added') }
      onSave(); onClose()
    } catch { toast.error('Failed to save') } finally { setLoading(false) }
  }
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
        className="w-full max-w-lg bg-[#111111] border border-[#2a2a2a] rounded-3xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-[#2a2a2a] flex items-center justify-between">
          <h3 className="text-white font-bold">{isEdit ? 'Edit Item' : 'Add Item'}</h3>
          <button onClick={onClose} className="text-[#a0a0a0] hover:text-white"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-2 block">Item Name *</label>
            <input value={form.name as string} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required
              placeholder="e.g. JBL Speaker 15&quot;"
              className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-[#404040] text-sm focus:outline-none focus:border-[#e50914]/50 transition-all" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-2 block">Category *</label>
              <select value={form.category as string} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} required
                className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm focus:outline-none focus:border-[#e50914]/50 transition-all">
                <option value="">Select</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-2 block">Condition</label>
              <select value={form.condition as string} onChange={e => setForm(p => ({ ...p, condition: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm focus:outline-none focus:border-[#e50914]/50 transition-all">
                {conditions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-2 block">Total Qty</label>
              <input type="number" min={1} value={form.quantity as number} onChange={e => setForm(p => ({ ...p, quantity: +e.target.value }))} required
                className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm focus:outline-none focus:border-[#e50914]/50 transition-all" />
            </div>
            <div>
              <label className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-2 block">Available</label>
              <input type="number" min={0} value={form.available_quantity as number} onChange={e => setForm(p => ({ ...p, available_quantity: +e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm focus:outline-none focus:border-[#e50914]/50 transition-all" />
            </div>
          </div>
          <div>
            <label className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-2 block">Notes</label>
            <textarea value={form.notes as string || ''} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} rows={3}
              className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-[#404040] text-sm focus:outline-none focus:border-[#e50914]/50 transition-all resize-none" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#e50914] text-white font-bold text-sm hover:bg-[#ff1a24] disabled:opacity-60 transition-all shadow-lg shadow-red-900/30">
            {loading ? <Loader2 size={16} className="animate-spin" /> : isEdit ? 'Update' : 'Add Item'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default function AdminInventory() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('all')
  const [modal, setModal] = useState<Partial<InventoryItem> | null | 'new'>(null)

  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('bb_admin_token')
      const res = await axios.get('/api/inventory/', { headers: { Authorization: `Bearer ${token}` } })
      setItems(res.data)
    } catch { toast.error('Could not load inventory') } finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchItems() }, [fetchItems])

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this item?')) return
    try {
      const token = localStorage.getItem('bb_admin_token')
      await axios.delete(`/api/inventory/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      toast.success('Deleted'); fetchItems()
    } catch { toast.error('Failed to delete') }
  }

  const filtered = items.filter(i => {
    const s = (i.name + i.category).toLowerCase().includes(search.toLowerCase())
    const c = catFilter === 'all' || i.category === catFilter
    return s && c
  })
  const lowStock = items.filter(i => i.available_quantity === 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Inventory</h1>
          <p className="text-[#a0a0a0] text-sm mt-1">{items.length} items</p>
        </div>
        <button onClick={() => setModal('new')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e50914] text-white text-sm font-semibold hover:bg-[#ff1a24] transition-all shadow-lg shadow-red-900/30">
          <Plus size={16} /> Add Item
        </button>
      </div>
      {lowStock.length > 0 && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-yellow-400/5 border border-yellow-400/20">
          <AlertTriangle size={16} className="text-yellow-400 flex-shrink-0" />
          <p className="text-yellow-400 text-sm"><strong>{lowStock.length} item(s)</strong> out of stock: {lowStock.map(i => i.name).join(', ')}</p>
        </div>
      )}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#404040]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search items..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111111] border border-[#2a2a2a] text-white placeholder-[#404040] text-sm focus:outline-none focus:border-[#e50914]/50 transition-all" />
        </div>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
          className="px-4 py-3 rounded-xl bg-[#111111] border border-[#2a2a2a] text-white text-sm focus:outline-none focus:border-[#e50914]/50 transition-all">
          <option value="all">All</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-[#e50914] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : !filtered.length ? (
        <div className="py-16 text-center text-[#404040] rounded-2xl bg-[#111111] border border-[#2a2a2a]">
          <Package size={32} className="mx-auto mb-3 opacity-30" />
          <p>No items found</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <motion.div key={item.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-5 rounded-2xl bg-[#111111] border border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold truncate">{item.name}</p>
                  <p className="text-[#a0a0a0] text-xs mt-0.5">{item.category}</p>
                </div>
                <div className="flex gap-1 ml-3">
                  <button onClick={() => setModal(item)} className="p-2 rounded-lg text-[#a0a0a0] hover:bg-[#1a1a1a] hover:text-white transition-all">
                    <Edit3 size={14} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-[#a0a0a0] hover:bg-red-500/10 hover:text-red-400 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-2xl font-black text-white">{item.available_quantity}</p>
                  <p className="text-[#a0a0a0] text-xs">of {item.quantity} available</p>
                </div>
                <div className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold ${conditionColors[item.condition] || 'text-[#a0a0a0] bg-[#1a1a1a]'}`}>
                  {item.condition}
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-[#1a1a1a] overflow-hidden">
                <div className={`h-full rounded-full transition-all ${item.available_quantity === 0 ? 'bg-red-500' : item.available_quantity / item.quantity < 0.3 ? 'bg-yellow-400' : 'bg-[#e50914]'}`}
                  style={{ width: `${(item.available_quantity / item.quantity) * 100}%` }} />
              </div>
            </motion.div>
          ))}
        </div>
      )}
      <AnimatePresence>
        {modal !== null && (
          <ItemModal item={modal === 'new' ? null : modal} onClose={() => setModal(null)} onSave={fetchItems} />
        )}
      </AnimatePresence>
    </div>
  )
}
