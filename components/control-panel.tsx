'use client';

import { FilterState } from '@/types';
import { ToneSelector } from './tone-selector';
import { DepthSlider } from './depth-slider';
import { TopicSelector } from './topic-selector';
import { Button } from '@/components/ui/button';

interface ControlPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onGenerate: () => void;
  onSurpriseMeSafe: () => void;
  isGenerating: boolean;
}

export function ControlPanel({
  filters,
  onFiltersChange,
  onGenerate,
  onSurpriseMeSafe,
  isGenerating,
}: ControlPanelProps) {
  return (
    <div className="space-y-8">
      <ToneSelector
        selectedTones={filters.tones}
        onChange={(tones) => onFiltersChange({ ...filters, tones })}
      />

      <DepthSlider
        value={filters.depth}
        onChange={(depth) => onFiltersChange({ ...filters, depth })}
      />

      <TopicSelector
        selectedTopics={filters.topics}
        onChange={(topics) => onFiltersChange({ ...filters, topics })}
      />

      <div className="pt-6 space-y-3">
        <button
          onClick={onGenerate}
          disabled={isGenerating || filters.tones.length === 0}
          className={`
            w-full px-6 py-4 rounded-2xl text-base font-bold
            border-3 border-gray-800
            transition-all duration-200
            ${isGenerating || filters.tones.length === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[0px]'
            }
          `}
        >
          {isGenerating ? '✨ Generating...' : '✨ Generate Question'}
        </button>

        <button
          onClick={onSurpriseMeSafe}
          disabled={isGenerating}
          className={`
            w-full px-6 py-3 rounded-2xl text-sm font-bold text-white
            border-3 border-gray-800
            transition-all duration-200
            ${isGenerating
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px]'
            }
          `}
        >
          🎲 Surprise Me
        </button>

        {filters.tones.length === 0 && (
          <p className="text-xs text-center text-gray-500 font-medium pt-2">
            👆 Select at least one tone to generate
          </p>
        )}
      </div>
    </div>
  );
}

