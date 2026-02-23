'use client';

import { useState } from 'react';
import { FilterState, DEFAULT_FILTERS } from '@/types';
import { ControlPanel } from '@/components/control-panel';
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
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(160deg, #F8F7FF 0%, #E8E5FF 50%, #FFF9E6 100%)' }}>
      {/* Header - M3 Expressive */}
      <header className="border-b border-purple-200/50 bg-white/60 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-5xl font-bold text-purple-950 text-center md:text-left tracking-tight">
            Icebreaker Studio
          </h1>
          <p className="text-sm md:text-base text-purple-700 mt-2 font-medium text-center md:text-left">
            Spark genuine connection
          </p>
        </div>
      </header>

      {/* Main Layout - Sidebar + Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Sidebar - Filters */}
        <aside className="w-full md:w-80 lg:w-96 border-r-0 md:border-r border-purple-200/50 bg-white/40 backdrop-blur-xl">
          <div className="sticky top-0 p-6 md:p-8 h-full overflow-y-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-purple-950 tracking-tight">Select your vibe</h2>
              <p className="text-sm text-purple-600 mt-1">Customize your question</p>
            </div>
            <ControlPanel
              filters={filters}
              onFiltersChange={setFilters}
              onGenerate={handleGenerate}
              onSurpriseMeSafe={handleSurpriseMeSafe}
              isGenerating={isGenerating}
            />
          </div>
        </aside>

          {/* Right Content - Question Display */}
          <main className="flex-1 flex items-center justify-center p-6 md:p-12">
            <div className="w-full max-w-3xl">
              <QuestionDisplay
                question={question}
                isLoading={isGenerating}
                error={error}
                onReroll={handleGenerate}
                cardColor={cardColor}
              />
            </div>
          </main>
      </div>

      {/* Footer - M3 Expressive */}
      <footer className="border-t border-purple-200/50 bg-white/40 backdrop-blur-xl py-6">
        <p className="text-xs text-purple-600 font-medium text-center">
          288 curated questions
        </p>
      </footer>
    </div>
  );
}
