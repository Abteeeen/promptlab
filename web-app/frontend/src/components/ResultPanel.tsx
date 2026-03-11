import React, { useState } from 'react';
import type { QualityScore } from '../types';
import { QualityScoreRing } from './QualityScoreRing';

interface ResultPanelProps {
  result: {
    prompt: string;
    qualityScore: QualityScore;
    source: string;
  } | null;
  isLoading: boolean;
}

export function ResultPanel({ result, isLoading }: ResultPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-2 border-[var(--accent-purple)] border-t-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">✨</span>
          </div>
        </div>
        <p className="mt-6 text-white/70 font-medium">Crafting your perfect prompt...</p>
        <p className="mt-2 text-sm text-white/40">AI is analyzing your request</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-8">
        <div className="w-20 h-20 rounded-2xl bg-[var(--accent-purple)]/10 flex items-center justify-center mb-6">
          <span className="text-4xl">🚀</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Ready to Generate</h3>
        <p className="text-sm text-white/50 max-w-xs">
          Describe what you need on the left and click Generate to create your perfect prompt
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">Generated Prompt</h2>
          <p className="text-sm text-white/50">
            {result.source === 'groq' ? 'AI-crafted' : 'Template-based'} · {result.qualityScore.rating}
          </p>
        </div>
        <QualityScoreRing score={result.qualityScore.overallScore} />
      </div>

      {/* Output Window */}
      <div className="output-window flex-1 p-4 mb-4 overflow-auto">
        <pre className="text-sm text-white/90 whitespace-pre-wrap leading-relaxed font-mono">
          {result.prompt}
        </pre>
      </div>

      {/* Prompt Card */}
      <div className="prompt-card p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-white/50 uppercase tracking-wider">Your Prompt</span>
          <div className="flex items-center gap-2">
            {copied ? (
              <span className="text-xs text-emerald-400">Copied!</span>
            ) : null}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 transition-all"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </button>
          </div>
        </div>
        <p className="text-sm text-white/80 leading-relaxed">
          {result.prompt.slice(0, 200)}{result.prompt.length > 200 ? '...' : ''}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-white bg-[var(--accent-purple)] hover:bg-[var(--button-hover)] transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          {copied ? 'Copied!' : 'Copy Prompt'}
        </button>
        <button
          onClick={() => window.open('https://chat.openai.com', '_blank')}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-white/80 bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
        >
          <span>Open ChatGPT</span>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15,3 21,3 21,9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
