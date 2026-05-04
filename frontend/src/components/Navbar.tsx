import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Music2 } from 'lucide-react'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#reels', label: 'Portfolio' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-[#2a2a2a] shadow-xl shadow-black/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-[#e50914] flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg shadow-red-900/40">
                  <Music2 size={20} className="text-white" />
                </div>
                <div className="absolute -inset-1 bg-[#e50914]/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
              <div>
                <span className="text-white font-black text-xl tracking-tight leading-none">
                  BEAT<span className="text-[#e50914]">BOX</span>
                </span>
                <p className="text-[#f5c518] text-[10px] font-semibold tracking-[0.2em] uppercase leading-none">
                  Dumka
                </p>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(({ href, label }) => (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className="text-[#a0a0a0] hover:text-white text-sm font-medium tracking-wide transition-colors duration-200 relative group"
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e50914] group-hover:w-full transition-all duration-300" />
                </button>
              ))}
              <Link
                to="/admin"
                className="px-5 py-2.5 rounded-xl bg-[#e50914] text-white text-sm font-semibold hover:bg-[#ff1a24] transition-all duration-200 shadow-lg shadow-red-900/30 hover:shadow-red-900/50 hover:scale-105"
              >
                Admin Panel
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white p-2"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#111111]/98 backdrop-blur-xl border-b border-[#2a2a2a] md:hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map(({ href, label }) => (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className="block w-full text-left px-4 py-3 text-[#a0a0a0] hover:text-white hover:bg-[#1a1a1a] rounded-xl text-sm font-medium transition-all"
                >
                  {label}
                </button>
              ))}
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center px-4 py-3 mt-4 rounded-xl bg-[#e50914] text-white text-sm font-semibold"
              >
                Admin Panel
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
