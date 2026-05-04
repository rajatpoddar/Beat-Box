import { Music2, Phone, MapPin, Radio, PlayCircle, Share2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#060606] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#e50914] flex items-center justify-center">
                <Music2 size={20} className="text-white" />
              </div>
              <div>
                <p className="text-white font-black text-xl leading-tight">
                  BEAT<span className="text-[#e50914]">BOX</span>
                </p>
                <p className="text-[#f5c518] text-[10px] font-semibold tracking-[0.2em] uppercase">
                  Sound & Light
                </p>
              </div>
            </div>
            <p className="text-[#a0a0a0] text-sm leading-relaxed mb-6">
              Dumka's premier A2Z event management company. Making every event extraordinary since 2014.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { icon: Radio, href: '#', label: 'Instagram' },
                { icon: PlayCircle, href: '#', label: 'YouTube' },
                { icon: Share2, href: '#', label: 'Facebook' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#a0a0a0] hover:bg-[#e50914] hover:text-white hover:border-[#e50914] transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Services', href: '#services' },
                { label: 'Portfolio', href: '#reels' },
                { label: 'Contact', href: '#contact' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="text-[#a0a0a0] text-sm hover:text-white transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Services</h4>
            <ul className="space-y-3">
              {['DJ & Sound', 'Stage Decoration', 'Lighting Design', 'Stage Programs', 'Corporate Events', 'A2Z Management'].map(s => (
                <li key={s}>
                  <span className="text-[#a0a0a0] text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#e50914] mt-0.5 flex-shrink-0" />
                <p className="text-[#a0a0a0] text-sm">Dumka, Jharkhand, India</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#e50914] flex-shrink-0" />
                <div>
                  <a href="tel:8002067123" className="block text-[#a0a0a0] text-sm hover:text-white transition-colors">
                    +91 8002067123
                  </a>
                  <a href="tel:6206280727" className="block text-[#a0a0a0] text-sm hover:text-white transition-colors">
                    +91 6206280727
                  </a>
                </div>
              </div>
            </div>

            <Link
              to="/admin"
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-[#a0a0a0] text-xs hover:border-[#e50914]/50 hover:text-white transition-all"
            >
              Admin Login
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#404040] text-sm">
            © {new Date().getFullYear()} Beat Box Dumka. All rights reserved.
          </p>
          <p className="text-[#404040] text-xs">
            Made with ❤️ for Jharkhand's finest events
          </p>
        </div>
      </div>
    </footer>
  )
}
