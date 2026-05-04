import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Music4, Lightbulb, Presentation, Building2, Users, Sparkles, Star, Mic2
} from 'lucide-react'

const services = [
  {
    icon: Music4,
    title: 'DJ & Sound',
    description: 'Professional DJ setup with crystal-clear sound systems for weddings, parties, and concerts.',
    gradient: 'from-red-900/40 to-red-900/10',
    iconColor: 'text-[#e50914]',
    iconBg: 'bg-[#e50914]/10',
  },
  {
    icon: Sparkles,
    title: 'Stage Decoration',
    description: 'Stunning stage setups with custom decorations that transform any venue into a magical space.',
    gradient: 'from-yellow-900/30 to-yellow-900/5',
    iconColor: 'text-[#f5c518]',
    iconBg: 'bg-[#f5c518]/10',
  },
  {
    icon: Lightbulb,
    title: 'Lighting Design',
    description: 'Dynamic lighting solutions — spotlights, LEDs, and atmospheric effects for any event.',
    gradient: 'from-orange-900/30 to-orange-900/5',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-400/10',
  },
  {
    icon: Mic2,
    title: 'Stage Programs',
    description: 'Choreographed performances, anchoring, and entertainment programs tailored to your theme.',
    gradient: 'from-purple-900/30 to-purple-900/5',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-400/10',
  },
  {
    icon: Building2,
    title: 'Corporate Meetings',
    description: 'Professional AV setups, corporate event planning, and seamless conference management.',
    gradient: 'from-blue-900/30 to-blue-900/5',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-400/10',
  },
  {
    icon: Users,
    title: 'Social Gatherings',
    description: 'Private parties, family functions, and community events handled with precision and warmth.',
    gradient: 'from-green-900/30 to-green-900/5',
    iconColor: 'text-green-400',
    iconBg: 'bg-green-400/10',
  },
  {
    icon: Presentation,
    title: 'A2Z Management',
    description: 'Full-service event management from concept to execution — we handle every single detail.',
    gradient: 'from-red-900/40 to-red-900/10',
    iconColor: 'text-[#e50914]',
    iconBg: 'bg-[#e50914]/10',
  },
  {
    icon: Star,
    title: 'Premium Packages',
    description: 'Curated event packages for weddings, anniversaries, and milestone celebrations.',
    gradient: 'from-yellow-900/30 to-yellow-900/5',
    iconColor: 'text-[#f5c518]',
    iconBg: 'bg-[#f5c518]/10',
  },
]

const cardVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const Icon = service.icon
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      className="group relative p-6 rounded-2xl bg-[#111111] border border-[#2a2a2a] hover:border-[#e50914]/40 transition-all duration-300 cursor-default overflow-hidden"
    >
      {/* Gradient bg on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Glow line on top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#e50914] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={22} className={service.iconColor} />
        </div>
        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-white transition-colors">
          {service.title}
        </h3>
        <p className="text-[#a0a0a0] text-sm leading-relaxed group-hover:text-[#d0d0d0] transition-colors">
          {service.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e50914]/10 border border-[#e50914]/20 text-[#e50914] text-xs font-semibold uppercase tracking-widest mb-4">
            What We Offer
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Our <span className="text-[#e50914]">Services</span>
          </h2>
          <p className="text-[#a0a0a0] text-base sm:text-lg max-w-xl mx-auto text-center">
            Complete event solutions under one roof — trusted by hundreds of clients across Jharkhand
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
