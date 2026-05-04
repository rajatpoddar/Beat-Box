import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, MapPin, Mail, Send, CheckCircle, Loader2, Clock } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

const services = [
  'DJ & Sound', 'Stage Decoration', 'Lighting Design', 'Stage Programs',
  'Corporate Meeting', 'Social Gathering', 'Wedding Event', 'A2Z Management'
]

interface FormData {
  name: string
  phone: string
  email: string
  event_date: string
  event_type: string
  guests: string
  venue: string
  message: string
}

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState<FormData>({
    name: '', phone: '', email: '', event_date: '',
    event_type: '', guests: '', venue: '', message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.event_date || !form.event_type) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      await axios.post('/api/bookings/', form)
      setSubmitted(true)
      toast.success('Booking request submitted! We\'ll call you shortly.')
    } catch {
      toast.error('Failed to submit. Please call us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-28 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent" />

      {/* Red glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#e50914]/8 rounded-full blur-[150px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e50914]/10 border border-[#e50914]/20 text-[#e50914] text-xs font-semibold uppercase tracking-widest mb-4">
            Get In Touch
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Book Your <span className="text-[#e50914]">Event</span>
          </h2>
          <p className="text-[#a0a0a0] text-base sm:text-lg max-w-xl mx-auto text-center">
            Tell us about your event and we’ll get back to you with a customised quote
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 xl:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-[#111111] border border-[#2a2a2a]">
              <h3 className="text-white font-bold text-lg mb-6">Contact Information</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#e50914]/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-[#e50914]" />
                  </div>
                  <div>
                    <p className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-1">Phone</p>
                    <a href="tel:8002067123" className="block text-white font-semibold hover:text-[#e50914] transition-colors">
                      +91 8002067123
                    </a>
                    <a href="tel:6206280727" className="block text-white font-semibold hover:text-[#e50914] transition-colors">
                      +91 6206280727
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#e50914]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-[#e50914]" />
                  </div>
                  <div>
                    <p className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-1">Location</p>
                    <p className="text-white font-semibold">Dumka, Jharkhand</p>
                    <p className="text-[#a0a0a0] text-sm">Serving all of Jharkhand</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#e50914]/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-[#e50914]" />
                  </div>
                  <div>
                    <p className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-1">Working Hours</p>
                    <p className="text-white font-semibold">Mon – Sun</p>
                    <p className="text-[#a0a0a0] text-sm">9:00 AM – 9:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#e50914]/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-[#e50914]" />
                  </div>
                  <div>
                    <p className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-1">Email</p>
                    <p className="text-white font-semibold">beatboxdumka@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Call CTA */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#e50914]/20 to-[#e50914]/5 border border-[#e50914]/20">
              <p className="text-white font-bold mb-2">Need immediate assistance?</p>
              <p className="text-[#a0a0a0] text-sm mb-4">Call us directly for instant booking confirmation</p>
              <a
                href="tel:8002067123"
                className="block w-full text-center px-4 py-3 rounded-xl bg-[#e50914] text-white font-bold text-sm hover:bg-[#ff1a24] transition-colors"
              >
                📞 Call Now: 8002067123
              </a>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className=""
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center p-12 rounded-2xl bg-[#111111] border border-[#2a2a2a] text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12 }}
                  className="w-20 h-20 rounded-full bg-[#e50914]/10 flex items-center justify-center mb-6"
                >
                  <CheckCircle size={40} className="text-[#e50914]" />
                </motion.div>
                <h3 className="text-white font-black text-2xl mb-3">Request Sent!</h3>
                <p className="text-[#a0a0a0] max-w-sm">
                  We've received your booking request. Our team will contact you within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 px-6 py-3 rounded-xl border border-[#2a2a2a] text-[#a0a0a0] text-sm hover:text-white hover:border-[#e50914]/50 transition-all"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-[#2a2a2a] space-y-5"
              >
                <h3 className="text-white font-bold text-lg">Request a Quote</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-2 block">
                      Full Name *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-[#404040] text-sm focus:outline-none focus:border-[#e50914]/50 focus:bg-[#1a1a1a] transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-2 block">
                      Phone Number *
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-[#404040] text-sm focus:outline-none focus:border-[#e50914]/50 transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-2 block">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-[#404040] text-sm focus:outline-none focus:border-[#e50914]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-2 block">
                      Event Date *
                    </label>
                    <input
                      name="event_date"
                      type="date"
                      value={form.event_date}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm focus:outline-none focus:border-[#e50914]/50 transition-all [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-2 block">
                      Service Type *
                    </label>
                    <select
                      name="event_type"
                      value={form.event_type}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm focus:outline-none focus:border-[#e50914]/50 transition-all"
                    >
                      <option value="">Select a service</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-2 block">
                      Expected Guests
                    </label>
                    <input
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      placeholder="e.g. 200-300"
                      className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-[#404040] text-sm focus:outline-none focus:border-[#e50914]/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-2 block">
                    Venue / Location
                  </label>
                  <input
                    name="venue"
                    value={form.venue}
                    onChange={handleChange}
                    placeholder="Event venue or city"
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-[#404040] text-sm focus:outline-none focus:border-[#e50914]/50 transition-all"
                  />
                </div>

                <div>
                  <label className="text-[#a0a0a0] text-xs font-medium uppercase tracking-wide mb-2 block">
                    Additional Details
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us more about your event requirements..."
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-[#404040] text-sm focus:outline-none focus:border-[#e50914]/50 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#e50914] text-white font-bold text-sm hover:bg-[#ff1a24] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.01] shadow-lg shadow-red-900/30"
                >
                  {loading ? (
                    <><Loader2 size={18} className="animate-spin" /> Submitting...</>
                  ) : (
                    <><Send size={18} /> Send Booking Request</>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
