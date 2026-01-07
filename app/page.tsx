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
      tones: ['light', 'thoughtful'],
      depth: 'medium',
      topics: [],
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
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #FFE5EC 0%, #E5F4FF 50%, #FFF5E1 100%)' }}>
      {/* Header - Playful */}
      <header className="border-b-2 border-gray-800" style={{ background: '#FFDEE9' }}>
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center md:text-left" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '-0.02em' }}>
            ✨ Icebreaker Studio
          </h1>
        </div>
      </header>

      {/* Main Layout - Sidebar + Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Sidebar - Filters */}
        <aside className="w-full md:w-80 lg:w-96 border-r-0 md:border-r-2 border-gray-800 bg-white/50 backdrop-blur-sm">
          <div className="sticky top-0 p-6 md:p-8 h-full overflow-y-auto">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800">Select your vibe</h2>
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

      {/* Footer - Playful */}
      <footer className="border-t-2 border-gray-800 bg-white/30 backdrop-blur-sm py-4">
        <p className="text-xs text-gray-600 font-medium text-center">
          ⭐ 288 curated questions ⭐
        </p>
      </footer>
    </div>
  );
}
