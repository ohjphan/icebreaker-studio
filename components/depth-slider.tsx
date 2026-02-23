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
  const getSliderValue = (depth: Depth): number => {
    return DEPTH_VALUES.indexOf(depth);
  };

  const getDepthFromSlider = (sliderValue: number): Depth => {
    return DEPTH_VALUES[sliderValue];
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    onChange(getDepthFromSlider(newValue));
  };

  const currentIndex = getSliderValue(value);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-purple-900 tracking-wide">Depth</h3>
        <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
          {DEPTH_LABELS[value]}
        </span>
      </div>
      
      <div className="relative pt-2 pb-6">
        {/* Slider Track Labels */}
        <div className="flex justify-between mb-3 px-1">
          {DEPTH_VALUES.map((depth, index) => (
            <div
              key={depth}
              className={`flex flex-col items-center transition-all duration-200 ${
                currentIndex === index ? 'scale-110' : 'opacity-60'
              }`}
            >
              <span className="text-2xl mb-1">{DEPTH_EMOJIS[depth]}</span>
              <span className={`text-xs font-medium ${
                currentIndex === index ? 'text-purple-700' : 'text-purple-400'
              }`}>
                {DEPTH_LABELS[depth]}
              </span>
            </div>
          ))}
        </div>

        {/* Slider Input */}
        <input
          type="range"
          min="0"
          max="2"
          step="1"
          value={currentIndex}
          onChange={handleSliderChange}
          className="slider-depth w-full h-3 bg-purple-100 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-6
            [&::-webkit-slider-thumb]:h-6
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-gradient-to-br
            [&::-webkit-slider-thumb]:from-purple-500
            [&::-webkit-slider-thumb]:to-blue-500
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:shadow-purple-300/50
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:duration-200
            [&::-webkit-slider-thumb]:hover:scale-125
            [&::-webkit-slider-thumb]:hover:shadow-xl
            [&::-webkit-slider-thumb]:active:scale-110
            [&::-moz-range-thumb]:w-6
            [&::-moz-range-thumb]:h-6
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-gradient-to-br
            [&::-moz-range-thumb]:from-purple-500
            [&::-moz-range-thumb]:to-blue-500
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:shadow-lg
            [&::-moz-range-thumb]:shadow-purple-300/50
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:transition-all
            [&::-moz-range-thumb]:duration-200
            [&::-moz-range-thumb]:hover:scale-125
            [&::-moz-range-thumb]:active:scale-110"
          style={{
            background: `linear-gradient(to right, 
              rgb(168 85 247) 0%, 
              rgb(168 85 247) ${(currentIndex / 2) * 100}%, 
              rgb(243 242 255) ${(currentIndex / 2) * 100}%, 
              rgb(243 242 255) 100%)`
          }}
        />
      </div>
    </div>
  );
}
