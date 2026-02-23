'use client';

import { Tone, TONE_OPTIONS } from '@/types';

interface ToneSelectorProps {
  selectedTone: Tone;
  onChange: (tone: Tone) => void;
}

const toneColors: Record<Tone, string> = {
  extreme: 'bg-purple-500 text-white',
  funny: 'bg-yellow-400 text-purple-900',
  light: 'bg-purple-200 text-purple-900',
  thoughtful: 'bg-purple-300 text-purple-900',
  serious: 'bg-purple-600 text-white',
};

export function ToneSelector({ selectedTone, onChange }: ToneSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-purple-900 tracking-wide">Tone</h3>
      <div className="flex flex-wrap gap-2">
        {TONE_OPTIONS.map((option) => {
          const isSelected = selectedTone === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`
                px-5 py-2.5 rounded-full text-sm font-semibold
                border transition-all duration-200
                ${isSelected 
                  ? `${toneColors[option.value]} border-purple-300 shadow-lg scale-105` 
                  : 'bg-white border-purple-200 hover:bg-purple-50 hover:border-purple-300 shadow-sm'
                }
              `}
            >
              <span className="mr-2 text-base">{option.emoji}</span>
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

