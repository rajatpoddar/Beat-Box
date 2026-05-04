import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowDown, Sparkles, Phone, MapPin } from 'lucide-react'

const words = ['A2Z EVENT', 'MANAGEMENT', 'EXPERTS']

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const wordVariants: Variants = {
  hidden: { y: 80, opacity: 0, skewY: 6 },
  visible: {
    y: 0,
    opacity: 1,
    skewY: 0,
    // Note: yahan 'easeOut' kar diya hai type error bachane ke liye
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

const fadeUp: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: (delay: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, delay, ease: 'easeOut' },
  }),
}

export default function HeroSection() {
  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Red gradient blobs */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#e50914]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#e50914]/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e50914]/5 rounded-full blur-[150px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#e50914] rounded-full"
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Scroll Indicator — outside content flow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-[#2a2a2a] hover:text-[#e50914] transition-colors cursor-pointer"
          onClick={scrollToServices}
        >
          <ArrowDown size={22} />
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-20">
        {/* Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e50914]/10 border border-[#e50914]/30 text-[#f5c518] text-sm font-semibold mb-8 backdrop-blur-sm"
        >
          <Sparkles size={14} />
          Dumka's Premier Event Management Company
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2"
          >
            {words.map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h1
                  variants={wordVariants}
                  className={`font-black tracking-tight leading-none ${i === 1
                    ? 'text-[clamp(2.5rem,8vw,6rem)] text-[#e50914]'
                    : 'text-[clamp(2.5rem,8vw,6rem)] text-white'
                    }`}
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.02em' }}
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Sub headline */}
        <motion.p
          custom={0.9}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-[#a0a0a0] text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed"
        >
          From intimate gatherings to grand corporate events — we handle{' '}
          <span className="text-white font-semibold">everything</span>. DJ, Stage Decoration,
          Lighting, and complete event production in Jharkhand.
        </motion.p>

        {/* Info badges */}
        <motion.div
          custom={1.1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mb-8"
        >
          <div className="flex items-center gap-2 text-[#a0a0a0] text-sm">
            <MapPin size={14} className="text-[#e50914]" />
            Dumka, Jharkhand
          </div>
          <div className="w-1 h-1 rounded-full bg-[#2a2a2a]" />
          <a href="tel:8002067123" className="flex items-center gap-2 text-[#a0a0a0] text-sm hover:text-white transition-colors">
            <Phone size={14} className="text-[#e50914]" />
            8002067123
          </a>
          <div className="w-1 h-1 rounded-full bg-[#2a2a2a]" />
          <a
            href="https://www.instagram.com/beatbox_04"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-[#E1306C] transition-colors cursor-pointer"
          >
            {/* Instagram SVG Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span>@beatbox_04</span>
          </a>
        </motion.div>

        {/* CTAs */}
        <motion.div
          custom={1.3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={scrollToContact}
            className="group relative px-8 py-4 rounded-2xl bg-[#e50914] text-white font-bold text-base overflow-hidden transition-all duration-300 hover:scale-105 shadow-xl shadow-red-900/40 hover:shadow-red-900/60"
          >
            <span className="relative z-10">Book Your Event</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#e50914] to-[#ff1a24] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <button
            onClick={scrollToServices}
            className="px-8 py-4 rounded-2xl border border-[#2a2a2a] text-[#a0a0a0] font-semibold text-base hover:border-[#e50914]/50 hover:text-white transition-all duration-300"
          >
            Explore Services
          </button>
        </motion.div>



        {/* Stats Row */}
        <motion.div
          custom={1.5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-16 pt-10 border-t border-[#1a1a1a] grid grid-cols-3 gap-6 max-w-md mx-auto"
        >
          {[
            { value: '500+', label: 'Events Done' },
            { value: '10+', label: 'Years Experience' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-[#e50914]">{value}</p>
              <p className="text-[#a0a0a0] text-xs sm:text-sm mt-1">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
