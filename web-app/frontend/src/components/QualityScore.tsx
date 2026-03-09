import React, { useEffect, useState } from 'react'
import type { QualityScore as QS } from '../types'

const RATING_COLORS = {
  Excellent:    { text: 'text-emerald-400', bg: 'rgba(16,185,129,0.15)', ring: '#10B981' },
  Good:         { text: 'text-blue-400',    bg: 'rgba(59,130,246,0.15)',  ring: '#3B82F6' },
  Okay:         { text: 'text-yellow-400',  bg: 'rgba(245,158,11,0.15)', ring: '#F59E0B' },
  'Needs Work': { text: 'text-red-400',     bg: 'rgba(239,68,68,0.15)',  ring: '#EF4444' },
}

function ScoreRing({ score, max = 30, color }: { score: number; max?: number; color: string }) {
  const [animated, setAnimated] = useState(0)
  const r = 36
  const circ = 2 * Math.PI * r
  const pct = animated / max
  const offset = circ * (1 - pct)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(score), 100)
    return () => clearTimeout(t)
  }, [score])

  return (
    <svg width="96" height="96" viewBox="0 0 96 96">
      {/* Track */}
      <circle cx="48" cy="48" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
      {/* Progress */}
      <circle
        cx="48" cy="48" r={r}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 48 48)"
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)', filter: `drop-shadow(0 0 6px ${color}60)` }}
      />
      {/* Score text */}
      <text x="48" y="44" textAnchor="middle" fill="white" fontSize="18" fontWeight="800" fontFamily="Inter">{animated}</text>
      <text x="48" y="58" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="Inter">/ 30</text>
    </svg>
  )
}

function DimBar({ label, score, max = 3 }: { label: string; score: number; max?: number }) {
  const [w, setW] = useState(0)
  useEffect(() => { const t = setTimeout(() => setW(score / max * 100), 150); return () => clearTimeout(t) }, [score, max])

  const color = score === max ? '#10B981' : score >= max * 0.6 ? '#3B82F6' : '#8B5CF6'
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-28 text-gray-400 truncate shrink-0">{label}</span>
      <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="h-full rounded-full" style={{ width: `${w}%`, background: color, transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)', boxShadow: `0 0 4px ${color}60` }} />
      </div>
      <span style={{ color }} className="w-8 text-right font-semibold">{score}/{max}</span>
    </div>
  )
}

export function QualityScore({ data }: { data: QS }) {
  const colors = RATING_COLORS[data.rating]

  return (
    <div className="glass p-5 animate-fade-in">
      <div className="flex items-center gap-5 mb-5">
        <ScoreRing score={data.overallScore} color={colors.ring} />
        <div>
          <div className={`text-xl font-black mb-1 ${colors.text}`}>{data.rating}</div>
          <p className="text-xs text-gray-400 leading-relaxed max-w-xs">{data.suggestion}</p>
        </div>
      </div>

      <div className="space-y-2.5">
        {data.dimensions.map(d => (
          <DimBar key={d.key} label={d.label} score={d.score} max={d.maxScore} />
        ))}
      </div>
    </div>
  )
}

export function QualityScoreMini({ data }: { data: QS }) {
  const colors = RATING_COLORS[data.rating]
  const pct = Math.round(data.overallScore / 30 * 100)
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-xl" style={{ background: colors.bg, border: `1px solid ${colors.ring}30` }}>
      <div className={`text-2xl font-black ${colors.text}`}>{data.overallScore}</div>
      <div>
        <div className={`text-xs font-bold ${colors.text}`}>{data.rating}</div>
        <div className="text-[10px] text-gray-500">{pct}% quality</div>
      </div>
    </div>
  )
}
