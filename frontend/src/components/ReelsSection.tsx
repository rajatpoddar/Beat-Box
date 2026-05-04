import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, X, ExternalLink } from 'lucide-react'

const reels = [
  {
    id: 1,
    title: 'Grand Wedding Stage',
    category: 'Wedding',
    thumbnail: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=700&fit=crop',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video URLs
    duration: '0:45',
  },
  {
    id: 2,
    title: 'DJ Night Setup',
    category: 'DJ & Sound',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=700&fit=crop',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '1:02',
  },
  {
    id: 3,
    title: 'Corporate Event',
    category: 'Corporate',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=700&fit=crop',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '0:58',
  },
  {
    id: 4,
    title: 'Stage Lighting Show',
    category: 'Lighting',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=700&fit=crop',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '0:38',
  },
  {
    id: 5,
    title: 'Cultural Program',
    category: 'Stage Programs',
    thumbnail: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=700&fit=crop',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '1:15',
  },
]

const categoryColors: Record<string, string> = {
  Wedding: 'bg-pink-500/20 text-pink-400',
  'DJ & Sound': 'bg-[#e50914]/20 text-[#e50914]',
  Corporate: 'bg-blue-500/20 text-blue-400',
  Lighting: 'bg-yellow-500/20 text-[#f5c518]',
  'Stage Programs': 'bg-purple-500/20 text-purple-400',
}

interface Reel {
  id: number
  title: string
  category: string
  thumbnail: string
  embedUrl: string
  duration: string
}

function ReelCard({ reel, index, onPlay }: { reel: Reel; index: number; onPlay: (reel: Reel) => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden cursor-pointer group flex-shrink-0 w-52 sm:w-60"
      style={{ aspectRatio: '9/16' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onPlay(reel)}
    >
      {/* Thumbnail */}
      <img
        src={reel.thumbnail}
        alt={reel.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Category badge */}
      <div className="absolute top-3 left-3">
        <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${categoryColors[reel.category]}`}>
          {reel.category}
        </span>
      </div>

      {/* Duration */}
      <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/60 text-white text-xs font-mono">
        {reel.duration}
      </div>

      {/* Play button */}
      <motion.div
        animate={{ scale: hovered ? 1.1 : 1, opacity: hovered ? 1 : 0.8 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-14 h-14 rounded-full bg-[#e50914] flex items-center justify-center shadow-xl shadow-red-900/60">
          <Play size={20} className="text-white ml-1" fill="white" />
        </div>
      </motion.div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white font-bold text-sm line-clamp-2">{reel.title}</p>
      </div>
    </motion.div>
  )
}

function VideoModal({ reel, onClose }: { reel: Reel; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative w-full max-w-lg"
        style={{ aspectRatio: '9/16' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white bg-[#1a1a1a] rounded-full p-2 hover:bg-[#e50914] transition-colors z-10"
        >
          <X size={20} />
        </button>
        <iframe
          src={reel.embedUrl}
          className="w-full h-full rounded-2xl"
          allowFullScreen
          allow="autoplay; encrypted-media"
          title={reel.title}
        />
        <div className="absolute bottom-4 left-4 right-4 bg-black/60 rounded-xl p-3 backdrop-blur-sm">
          <p className="text-white font-bold text-sm">{reel.title}</p>
          <span className={`px-2 py-0.5 rounded text-xs font-semibold mt-1 inline-block ${categoryColors[reel.category]}`}>
            {reel.category}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ReelsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeReel, setActiveReel] = useState<Reel | null>(null)

  return (
    <section id="reels" className="py-28 bg-[#060606] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e50914]/10 border border-[#e50914]/20 text-[#e50914] text-xs font-semibold uppercase tracking-widest mb-4">
            Our Work
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Event <span className="text-[#e50914]">Highlights</span>
          </h2>
          <p className="text-[#a0a0a0] text-base sm:text-lg max-w-xl mx-auto text-center">
            A glimpse into the magical events we’ve produced — swipe through our portfolio
          </p>
        </motion.div>

        {/* Reels horizontal scroll */}
        <div className="relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#060606] to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#060606] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-5 overflow-x-auto pb-6 px-4 no-scrollbar snap-x snap-mandatory">
            {reels.map((reel, i) => (
              <div key={reel.id} className="snap-center">
                <ReelCard reel={reel} index={i} onPlay={setActiveReel} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#2a2a2a] text-[#a0a0a0] text-sm font-semibold hover:border-[#e50914]/50 hover:text-white transition-all duration-300"
          >
            <ExternalLink size={16} />
            View More on Instagram
          </a>
        </motion.div>
      </div>

      {/* Video Modal */}
      {activeReel && (
        <VideoModal reel={activeReel} onClose={() => setActiveReel(null)} />
      )}
    </section>
  )
}
