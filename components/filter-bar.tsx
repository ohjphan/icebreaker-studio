'use client';

import { Tone, Depth, Topic, TONE_OPTIONS, TOPIC_OPTIONS } from '@/types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface FilterBarProps {
  tone: Tone;
  depth: Depth;
  topic: Topic | null;
  onToneChange: (tone: Tone) => void;
  onDepthChange: (depth: Depth) => void;
  onTopicChange: (topic: Topic | null) => void;
  onGenerate: () => void;
  onSurprise: () => void;
  isGenerating: boolean;
}

const DEPTH_OPTIONS = [
  { value: 'surface' as Depth, label: '🏄 Surface', emoji: '🏄' },
  { value: 'medium' as Depth, label: '🤿 Medium', emoji: '🤿' },
  { value: 'deep' as Depth, label: '🌊 Deep', emoji: '🌊' },
];

export function FilterBar({
  tone,
  depth,
  topic,
  onToneChange,
  onDepthChange,
  onTopicChange,
  onGenerate,
  onSurprise,
  isGenerating,
}: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t-4 border-white z-50">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="md:hidden w-full py-4 flex items-center justify-center gap-2 text-white font-black uppercase text-sm tracking-wider border-b-2 border-white"
      >
        {isExpanded ? (
          <>
            Hide <ChevronDown className="h-5 w-5" strokeWidth={3} />
          </>
        ) : (
          <>
            Show <ChevronUp className="h-5 w-5" strokeWidth={3} />
          </>
        )}
      </button>

      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} md:block`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-end gap-4">
            {/* Tone Dropdown */}
            <div className="relative flex-1 min-w-[140px]">
              <label className="text-xs font-bold text-white mb-2 block uppercase tracking-[3px]" style={{ fontFamily: 'var(--font-dm-mono)' }}>
                Tone
              </label>
              <div className="relative">
                <select
                  value={tone}
                  onChange={(e) => onToneChange(e.target.value as Tone)}
                  className="w-full appearance-none bg-black border-3 border-white px-4 py-3 pr-10 text-sm font-bold text-white cursor-pointer hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-white transition-all"
                >
                  {TONE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.emoji} {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white pointer-events-none" strokeWidth={3} />
              </div>
            </div>

            {/* Depth Dropdown */}
            <div className="relative flex-1 min-w-[140px]">
              <label className="text-xs font-bold text-white mb-2 block uppercase tracking-[3px]" style={{ fontFamily: 'var(--font-dm-mono)' }}>
                Depth
              </label>
              <div className="relative">
                <select
                  value={depth}
                  onChange={(e) => onDepthChange(e.target.value as Depth)}
                  className="w-full appearance-none bg-black border-3 border-white px-4 py-3 pr-10 text-sm font-bold text-white cursor-pointer hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-white transition-all"
                >
                  {DEPTH_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white pointer-events-none" strokeWidth={3} />
              </div>
            </div>

            {/* Topic Dropdown */}
            <div className="relative flex-1 min-w-[140px]">
              <label className="text-xs font-bold text-white mb-2 block uppercase tracking-[3px]" style={{ fontFamily: 'var(--font-dm-mono)' }}>
                Topic
              </label>
              <div className="relative">
                <select
                  value={topic || ''}
                  onChange={(e) => onTopicChange(e.target.value ? (e.target.value as Topic) : null)}
                  className="w-full appearance-none bg-black border-3 border-white px-4 py-3 pr-10 text-sm font-bold text-white cursor-pointer hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-white transition-all"
                >
                  <option value="">Any</option>
                  <option value="personal">🎨 Personal</option>
                  <option value="work">💼 Work</option>
                  <option value="creative">💡 Creative</option>
                  <option value="reflective">🌟 Reflective</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white pointer-events-none" strokeWidth={3} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onGenerate}
                disabled={isGenerating}
                className={`
                  px-8 py-3 font-bold uppercase tracking-[3px] transition-all duration-200
                  border-3 border-white
                  ${isGenerating
                    ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                    : 'bg-[#E30613] text-white hover:bg-[#C00510] active:translate-y-1'
                  }
                `}
                style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '14px' }}
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 bg-[#E30613] border border-white animate-bounce"></div>
                    <div className="w-3 h-3 bg-[#0057B7] border border-white animate-bounce [animation-delay:0.1s]"></div>
                    <div className="w-3 h-3 bg-[#FFD500] border border-white animate-bounce [animation-delay:0.2s]"></div>
                  </div>
                ) : (
                  'Generate'
                )}
              </button>
              
              <button
                onClick={onSurprise}
                disabled={isGenerating}
                className={`
                  px-6 py-3 font-bold uppercase tracking-[3px] transition-all duration-200
                  border-3 border-white
                  ${isGenerating
                    ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                    : 'bg-[#FFD500] text-black hover:bg-[#E5C000] active:translate-y-1'
                  }
                `}
                style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '14px' }}
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 bg-[#E30613] border border-black animate-bounce"></div>
                    <div className="w-3 h-3 bg-[#0057B7] border border-black animate-bounce [animation-delay:0.1s]"></div>
                    <div className="w-3 h-3 bg-[#FFD500] border border-black animate-bounce [animation-delay:0.2s]"></div>
                  </div>
                ) : (
                  'Surprise'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
