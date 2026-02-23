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
        selectedTone={filters.tone}
        onChange={(tone) => onFiltersChange({ ...filters, tone })}
      />

      <DepthSlider
        value={filters.depth}
        onChange={(depth) => onFiltersChange({ ...filters, depth })}
      />

      <TopicSelector
        selectedTopic={filters.topic}
        onChange={(topic) => onFiltersChange({ ...filters, topic })}
      />

      <div className="pt-8 space-y-4">
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className={`
            w-full px-6 py-5 rounded-full text-lg font-bold
            transition-all duration-300
            ${isGenerating
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-purple-600 text-white shadow-lg shadow-purple-300/50 hover:bg-purple-700 hover:shadow-xl hover:shadow-purple-400/50 hover:scale-105 active:scale-100'
            }
          `}
        >
          {isGenerating ? 'Generating...' : 'Generate Question'}
        </button>

        <button
          onClick={onSurpriseMeSafe}
          disabled={isGenerating}
          className={`
            w-full px-6 py-4 rounded-full text-base font-semibold
            transition-all duration-300
            ${isGenerating
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-purple-900 shadow-md shadow-yellow-200/50 hover:shadow-lg hover:shadow-yellow-300/50 hover:scale-105 active:scale-100'
            }
          `}
        >
          ✨ Surprise Me
        </button>
      </div>
    </div>
  );
}

