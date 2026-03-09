/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: 'rgba(255,255,255,0.04)',
        'surface-hover': 'rgba(255,255,255,0.07)',
        'surface-active': 'rgba(255,255,255,0.1)',
        border: 'rgba(255,255,255,0.08)',
        'border-hover': 'rgba(255,255,255,0.16)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #8B5CF6, #3B82F6, #06B6D4)',
        'gradient-brand-r': 'linear-gradient(135deg, #06B6D4, #3B82F6, #8B5CF6)',
        'gradient-subtle': 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.15))',
        'glow-purple': 'radial-gradient(circle at 50% 0%, rgba(139,92,246,0.15) 0%, transparent 60%)',
        'glow-blue':   'radial-gradient(circle at 100% 100%, rgba(6,182,212,0.1) 0%, transparent 50%)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in':    'fadeIn 0.3s ease-out',
        'slide-up':   'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in':   'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        'shimmer':    'shimmer 2s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139,92,246,0.2)' },
          '50%':       { boxShadow: '0 0 40px rgba(139,92,246,0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
