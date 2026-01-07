'use client';

import { Depth } from '@/types';

interface DepthSliderProps {
  value: Depth;
  onChange: (depth: Depth) => void;
}

const DEPTH_VALUES: Depth[] = ['surface', 'medium', 'deep'];
const DEPTH_LABELS: Record<Depth, string> = {
  surface: 'Surface',
  medium: 'Medium',
  deep: 'Deep',
};
const DEPTH_EMOJIS: Record<Depth, string> = {
  surface: '🏄',
  medium: '🤿',
  deep: '🌊',
};

export function DepthSlider({ value, onChange }: DepthSliderProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Depth</h3>
      <div className="flex gap-2">
        {DEPTH_VALUES.map((depth) => {
          const isSelected = value === depth;
          return (
            <button
              key={depth}
              onClick={() => onChange(depth)}
              className={`
                flex-1 px-4 py-3 rounded-2xl text-sm font-bold
                border-2 border-gray-800
                transition-all duration-200
                ${isSelected 
                  ? 'bg-gradient-to-br from-cyan-300 to-blue-400 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-y-[-2px]' 
                  : 'bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                }
              `}
            >
              <div className="text-lg mb-1">{DEPTH_EMOJIS[depth]}</div>
              {DEPTH_LABELS[depth]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

