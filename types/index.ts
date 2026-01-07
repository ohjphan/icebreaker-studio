// Core type definitions for Icebreaker Studio

export type Tone = 'extreme' | 'funny' | 'light' | 'thoughtful' | 'serious';

export type Depth = 'surface' | 'medium' | 'deep';

export type Topic = 
  | 'personal'
  | 'work'
  | 'creative'
  | 'reflective';

export type TimeLength = '2min' | '5min' | '10min';

export interface SafetySettings {
  psychologicalSafety: boolean;
  optOutFriendly: boolean;
}

export interface FilterState {
  tones: Tone[];
  depth: Depth;
  topics: Topic[];
  timeLength: TimeLength;
  safety: SafetySettings;
}

export interface GeneratedQuestion {
  text: string;
  timestamp: number;
  filters: FilterState;
}

// UI Helper types
export interface ToneOption {
  value: Tone;
  label: string;
  emoji: string;
  description: string;
}

export interface TopicOption {
  value: Topic;
  label: string;
  description: string;
}

export const TONE_OPTIONS: ToneOption[] = [
  { 
    value: 'extreme', 
    label: 'Extreme', 
    emoji: '😈',
    description: 'Bold, vulnerable questions'
  },
  { 
    value: 'funny', 
    label: 'Funny', 
    emoji: '😂',
    description: 'Playful and humorous'
  },
  { 
    value: 'light', 
    label: 'Light', 
    emoji: '🙂',
    description: 'Easy and comfortable'
  },
  { 
    value: 'thoughtful', 
    label: 'Thoughtful', 
    emoji: '🤔',
    description: 'Reflective and meaningful'
  },
  { 
    value: 'serious', 
    label: 'Serious', 
    emoji: '🎯',
    description: 'Professional and focused'
  },
];

export const TOPIC_OPTIONS: TopicOption[] = [
  {
    value: 'personal',
    label: 'Personal',
    description: 'Interests, hobbies, life outside work'
  },
  {
    value: 'work',
    label: 'Work',
    description: 'Collaboration, work style, feedback'
  },
  {
    value: 'creative',
    label: 'Creative',
    description: 'Imagination, ideas, problem-solving'
  },
  {
    value: 'reflective',
    label: 'Reflective',
    description: 'Values, growth, meaningful experiences'
  },
];

export const DEFAULT_FILTERS: FilterState = {
  tones: ['light', 'thoughtful'],
  depth: 'medium',
  topics: [],
  timeLength: '5min',
  safety: {
    psychologicalSafety: true,
    optOutFriendly: true,
  },
};

