import React from 'react'

const CATEGORY_COLORS: Record<string, string> = {
  Development:   'bg-blue-500/15   text-blue-300   border-blue-500/20',
  Analytics:     'bg-cyan-500/15    text-cyan-300    border-cyan-500/20',
  Content:       'bg-purple-500/15  text-purple-300  border-purple-500/20',
  Support:       'bg-green-500/15   text-green-300   border-green-500/20',
  Communication: 'bg-yellow-500/15  text-yellow-300  border-yellow-500/20',
  Marketing:     'bg-pink-500/15    text-pink-300    border-pink-500/20',
  Research:      'bg-indigo-500/15  text-indigo-300  border-indigo-500/20',
  Education:     'bg-teal-500/15    text-teal-300    border-teal-500/20',
  Product:       'bg-orange-500/15  text-orange-300  border-orange-500/20',
  Creativity:    'bg-rose-500/15    text-rose-300    border-rose-500/20',
}

interface BadgeProps {
  label: string
  category?: string
  className?: string
}

export function Badge({ label, category, className = '' }: BadgeProps) {
  const color = category ? (CATEGORY_COLORS[category] || 'bg-white/10 text-gray-300 border-white/10') : 'bg-white/10 text-gray-300 border-white/10'
  return (
    <span className={`tag border ${color} ${className}`}>{label}</span>
  )
}
