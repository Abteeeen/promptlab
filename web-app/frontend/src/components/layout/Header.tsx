import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV = [
  { href: '/',           label: 'Home' },
  { href: '/templates',  label: 'Templates' },
  { href: '/generate',   label: 'Generate' },
]

export function Header() {
  const { pathname } = useLocation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4" style={{ background: 'rgba(5, 5, 8, 0.8)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 1px 40px rgba(139,92,246,0.08)' }}>
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 group">
        <div className="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center text-sm font-black text-white shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow">
          P
        </div>
        <span className="text-sm font-bold text-white/90 tracking-tight">Prompt Engine</span>
      </Link>

      {/* Nav */}
      <nav className="hidden md:flex items-center gap-1">
        {NAV.map(({ href, label }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              to={href}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${active ? 'bg-white/8 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      {/* CTA + Agent (coming soon) */}
      <div className="hidden md:flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            // lightweight “coming soon” affordance
            alert('Agents are coming soon — you\'ll be able to design custom GPT-style assistants here.')
          }}
          className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl text-xs font-semibold text-gray-300 bg-white/5 border border-dashed border-white/20 hover:bg-white/10 transition-all"
        >
          <span>Agent</span>
          <span className="text-[10px] text-gray-500">(coming soon)</span>
        </button>
        <Link
          to="/generate"
          className="inline-flex items-center gap-2 h-9 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-brand shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:opacity-90 transition-all"
        >
          <span>Generate</span>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </Link>
      </div>
    </header>
  )
}
