import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const variants = {
  primary:   'bg-gradient-brand text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:opacity-90 active:scale-95',
  secondary: 'glass border border-white/10 text-white hover:bg-white/8 hover:border-white/20 active:scale-95',
  ghost:     'text-gray-400 hover:text-white hover:bg-white/5 active:scale-95',
  danger:    'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 active:scale-95',
}

const sizes = {
  sm: 'h-8  px-3 text-xs gap-1.5 rounded-lg',
  md: 'h-10 px-4 text-sm gap-2   rounded-xl',
  lg: 'h-12 px-6 text-base gap-2 rounded-xl',
}

export function Button({ variant = 'secondary', size = 'md', loading, children, className = '', disabled, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 disabled:opacity-40 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25"/>
          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      )}
      {children}
    </button>
  )
}
