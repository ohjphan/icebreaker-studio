'use client';

import { useState } from 'react';
import { FilterState, DEFAULT_FILTERS } from '@/types';
import { FilterBar } from '@/components/filter-bar';
import { QuestionDisplay } from '@/components/question-display';
import { generateQuestion } from '@/lib/question-generator';

export default function Home() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [question, setQuestion] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardColor, setCardColor] = useState<string>('#FFFFFF');

  // Fun background colors for the question card
  const cardColors = [
    '#FFE5EC', // Soft pink
    '#E5F4FF', // Soft blue
    '#FFF5E1', // Soft yellow
    '#E8F5E9', // Soft green
    '#F3E5F5', // Soft purple
    '#FFF3E0', // Soft orange
    '#E0F7FA', // Soft cyan
    '#FCE4EC', // Light pink
    '#F1F8E9', // Light lime
    '#FFF9C4', // Light yellow
    '#E1BEE7', // Light purple
    '#FFCCBC', // Light coral
  ];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * cardColors.length);
    return cardColors[randomIndex];
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    // Small delay to show loading animation
    await new Promise(resolve => setTimeout(resolve, 300));

    const result = await generateQuestion(filters);

    setIsGenerating(false);

    if (result.success && result.question) {
      setQuestion(result.question);
      setCardColor(getRandomColor()); // Change color on new question
    } else {
      setError(result.error || 'Failed to generate question');
    }
  };

  const handleSurpriseMeSafe = async () => {
    // Use safe default settings
    const safeFilters: FilterState = {
      tone: 'light',
      depth: 'medium',
      topic: null,
      timeLength: '5min',
      safety: {
        psychologicalSafety: true,
        optOutFriendly: true,
      },
    };

    setFilters(safeFilters);

    setIsGenerating(true);
    setError(null);

    // Small delay to show loading animation
    await new Promise(resolve => setTimeout(resolve, 300));

    const result = await generateQuestion(safeFilters);

    setIsGenerating(false);

    if (result.success && result.question) {
      setQuestion(result.question);
      setCardColor(getRandomColor()); // Change color on new question
    } else {
      setError(result.error || 'Failed to generate question');
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-32" style={{ background: 'linear-gradient(160deg, #4C3F91 0%, #6C5CE7 50%, #8B7FE8 100%)' }}>
      {/* Header - M3 Expressive */}
      <header className="border-b border-purple-300/30 bg-white/10 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white text-center tracking-tight">
            Icebreaker Studio
          </h1>
          <p className="text-sm md:text-base text-purple-100 mt-2 font-medium text-center">
            Spark genuine connection
          </p>
        </div>
      </header>

      {/* Main Content - Question Display (Full Width, Centered) */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-5xl">
          <QuestionDisplay
            question={question}
            isLoading={isGenerating}
            error={error}
            onReroll={handleGenerate}
            cardColor={cardColor}
          />
        </div>
      </main>

      {/* Fixed Bottom Filter Bar */}
      <FilterBar
        tone={filters.tone}
        depth={filters.depth}
        topic={filters.topic}
        onToneChange={(tone) => setFilters({ ...filters, tone })}
        onDepthChange={(depth) => setFilters({ ...filters, depth })}
        onTopicChange={(topic) => setFilters({ ...filters, topic })}
        onGenerate={handleGenerate}
        onSurprise={handleSurpriseMeSafe}
        isGenerating={isGenerating}
      />
    </div>
  );
}
