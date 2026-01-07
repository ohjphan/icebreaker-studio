'use client';

import { Tone, TONE_OPTIONS } from '@/types';

interface ToneSelectorProps {
  selectedTones: Tone[];
  onChange: (tones: Tone[]) => void;
}

const toneColors: Record<Tone, string> = {
  extreme: 'bg-purple-300 border-purple-400 hover:bg-purple-400',
  funny: 'bg-yellow-300 border-yellow-400 hover:bg-yellow-400',
  light: 'bg-pink-300 border-pink-400 hover:bg-pink-400',
  thoughtful: 'bg-blue-300 border-blue-400 hover:bg-blue-400',
  serious: 'bg-green-300 border-green-400 hover:bg-green-400',
};

export function ToneSelector({ selectedTones, onChange }: ToneSelectorProps) {
  const toggleTone = (tone: Tone) => {
    if (selectedTones.includes(tone)) {
      onChange(selectedTones.filter((t) => t !== tone));
    } else {
      onChange([...selectedTones, tone]);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Tone</h3>
      <div className="flex flex-wrap gap-2">
        {TONE_OPTIONS.map((option) => {
          const isSelected = selectedTones.includes(option.value);
          return (
            <button
              key={option.value}
              onClick={() => toggleTone(option.value)}
              className={`
                px-4 py-2 rounded-full text-sm font-bold
                border-2 border-gray-800
                transition-all duration-200
                ${isSelected 
                  ? `${toneColors[option.value]} shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-y-[-2px]` 
                  : 'bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                }
              `}
            >
              <span className="mr-1.5 text-base">{option.emoji}</span>
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

