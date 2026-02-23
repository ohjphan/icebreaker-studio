'use client';

import { Tone, Depth, Topic, TONE_OPTIONS, TOPIC_OPTIONS } from '@/types';
import { ChevronDown } from 'lucide-react';

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
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-purple-200/50 shadow-2xl shadow-purple-200/20 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-end gap-3">
          {/* Tone Dropdown */}
          <div className="relative flex-1 min-w-[140px]">
            <label className="text-xs font-bold text-purple-900 mb-1.5 block">
              Tone
            </label>
            <div className="relative">
              <select
                value={tone}
                onChange={(e) => onToneChange(e.target.value as Tone)}
                className="w-full appearance-none bg-white border border-purple-200 rounded-2xl px-4 py-3 pr-10 text-sm font-semibold text-purple-900 cursor-pointer hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                {TONE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.emoji} {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400 pointer-events-none" />
            </div>
          </div>

          {/* Depth Dropdown */}
          <div className="relative flex-1 min-w-[140px]">
            <label className="text-xs font-bold text-purple-900 mb-1.5 block">
              Depth
            </label>
            <div className="relative">
              <select
                value={depth}
                onChange={(e) => onDepthChange(e.target.value as Depth)}
                className="w-full appearance-none bg-white border border-purple-200 rounded-2xl px-4 py-3 pr-10 text-sm font-semibold text-purple-900 cursor-pointer hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                {DEPTH_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400 pointer-events-none" />
            </div>
          </div>

          {/* Topic Dropdown */}
          <div className="relative flex-1 min-w-[140px]">
            <label className="text-xs font-bold text-purple-900 mb-1.5 block">
              Topic <span className="text-purple-500 font-normal">(optional)</span>
            </label>
            <div className="relative">
              <select
                value={topic || ''}
                onChange={(e) => onTopicChange(e.target.value ? (e.target.value as Topic) : null)}
                className="w-full appearance-none bg-white border border-purple-200 rounded-2xl px-4 py-3 pr-10 text-sm font-semibold text-purple-900 cursor-pointer hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="">Any topic</option>
                <option value="personal">🎨 Personal</option>
                <option value="work">💼 Work</option>
                <option value="creative">💡 Creative</option>
                <option value="reflective">🌟 Reflective</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400 pointer-events-none" />
            </div>
          </div>

          {/* Action Buttons - Aligned with dropdowns */}
          <div className="flex gap-3">
            <button
              onClick={onGenerate}
              disabled={isGenerating}
              className={`
                px-8 py-3 rounded-2xl text-base font-bold
                transition-all duration-200
                ${isGenerating
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 text-white shadow-lg shadow-purple-300/50 hover:bg-purple-700 hover:shadow-xl hover:shadow-purple-400/50 hover:scale-105 active:scale-100'
                }
              `}
            >
              {isGenerating ? 'Generating...' : 'Generate'}
            </button>
            
            <button
              onClick={onSurprise}
              disabled={isGenerating}
              className={`
                px-6 py-3 rounded-2xl text-sm font-semibold
                transition-all duration-200
                ${isGenerating
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-purple-900 shadow-md shadow-yellow-200/50 hover:shadow-lg hover:shadow-yellow-300/50 hover:scale-105 active:scale-100'
                }
              `}
            >
              🎉 Surprise Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
