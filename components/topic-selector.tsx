'use client';

import { Topic, TOPIC_OPTIONS } from '@/types';

interface TopicSelectorProps {
  selectedTopics: Topic[];
  onChange: (topics: Topic[]) => void;
}

const topicColors: Record<Topic, string> = {
  personal: 'bg-rose-300 border-rose-400 hover:bg-rose-400',
  work: 'bg-amber-300 border-amber-400 hover:bg-amber-400',
  creative: 'bg-violet-300 border-violet-400 hover:bg-violet-400',
  reflective: 'bg-teal-300 border-teal-400 hover:bg-teal-400',
};

const topicEmojis: Record<Topic, string> = {
  personal: '🎨',
  work: '💼',
  creative: '💡',
  reflective: '🌟',
};

export function TopicSelector({ selectedTopics, onChange }: TopicSelectorProps) {
  const toggleTopic = (topic: Topic) => {
    if (selectedTopics.includes(topic)) {
      onChange(selectedTopics.filter((t) => t !== topic));
    } else {
      onChange([...selectedTopics, topic]);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
        Topics <span className="text-gray-500 font-normal text-xs normal-case">(optional)</span>
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {TOPIC_OPTIONS.map((option) => {
          const isSelected = selectedTopics.includes(option.value);
          return (
            <button
              key={option.value}
              onClick={() => toggleTopic(option.value)}
              className={`
                px-4 py-3 rounded-2xl text-sm font-bold
                border-2 border-gray-800
                transition-all duration-200
                ${isSelected 
                  ? `${topicColors[option.value]} shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-y-[-2px]` 
                  : 'bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                }
              `}
              title={option.description}
            >
              <span className="mr-1.5 text-base">{topicEmojis[option.value]}</span>
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

