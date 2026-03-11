import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from '../ThemeToggle'

const NAV = [
  { href: '/', label: 'Home', icon: '✨' },
  { href: '/templates', label: 'Templates', icon: '📄' },
  { href: '/generate', label: 'Generate', icon: '⚡' },
]


export function Header() {
  const { pathname } = useLocation()

  return (
    <header className="fixed top-4 left-4 right-4 z-50">
      <div
        className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3 rounded-2xl"
        style={{
          background: 'rgba(19, 19, 26, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/logo.png"
            alt="Prompt Engine"
            className="w-8 h-8 rounded-xl object-cover"
            style={{ boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)' }}
          />
          <span className="text-sm font-bold text-white/90 tracking-tight">Prompt Engine</span>
        </Link>

        {/* Pill Navigation */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
          {NAV.map(({ href, label, icon }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                to={href}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${active
                  ? 'text-white bg-[rgba(124,58,237,0.2)]'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                  }`}
              >
                <span className="text-sm">{icon}</span>
                <span>{label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right Side: Theme + CTA */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <ThemeToggle variant="desktop" />
          </div>
          <Link
            to="/generate"
            className="flex items-center gap-2 h-9 px-4 rounded-full text-sm font-semibold text-white transition-all"
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
              boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)'
            }}
          >
            <span>Generate</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  )
}
