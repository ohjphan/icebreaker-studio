'use client';

import { Topic, TOPIC_OPTIONS } from '@/types';

interface TopicSelectorProps {
  selectedTopic: Topic | null;
  onChange: (topic: Topic | null) => void;
}

const topicColors: Record<Topic, string> = {
  personal: 'bg-purple-400 text-white',
  work: 'bg-yellow-400 text-purple-900',
  creative: 'bg-purple-300 text-purple-900',
  reflective: 'bg-purple-500 text-white',
};

const topicEmojis: Record<Topic, string> = {
  personal: '🎨',
  work: '💼',
  creative: '💡',
  reflective: '🌟',
};

export function TopicSelector({ selectedTopic, onChange }: TopicSelectorProps) {
  const handleTopicClick = (topic: Topic) => {
    // Toggle: if already selected, deselect (set to null), otherwise select
    if (selectedTopic === topic) {
      onChange(null);
    } else {
      onChange(topic);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-purple-900 tracking-wide">
        Topic <span className="text-purple-500 font-normal text-xs">(optional)</span>
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {TOPIC_OPTIONS.map((option) => {
          const isSelected = selectedTopic === option.value;
          return (
            <button
              key={option.value}
              onClick={() => handleTopicClick(option.value)}
              className={`
                px-4 py-3.5 rounded-3xl text-sm font-semibold
                border transition-all duration-200
                ${isSelected 
                  ? `${topicColors[option.value]} border-purple-300 shadow-lg scale-105` 
                  : 'bg-white border-purple-200 hover:bg-purple-50 hover:border-purple-300 shadow-sm'
                }
              `}
              title={option.description}
            >
              <span className="mr-2 text-lg">{topicEmojis[option.value]}</span>
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

