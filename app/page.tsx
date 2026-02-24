'use client';

import { useState, useEffect } from 'react';
import { FilterState, DEFAULT_FILTERS } from '@/types';
import { FilterBar } from '@/components/filter-bar';
import { QuestionDisplay } from '@/components/question-display';
import { LearnMoreModal } from '@/components/learn-more-modal';
import { generateQuestion } from '@/lib/question-generator';

export default function Home() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [question, setQuestion] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardColor, setCardColor] = useState<string>('#FFFFFF');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-generate question on page load
  useEffect(() => {
    handleGenerate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Bauhaus primary colors for question cards
  const cardColors = [
    '#E30613', // Red
    '#0057B7', // Blue
    '#FFD500', // Yellow
    '#000000', // Black (was white)
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
    <div className="min-h-screen flex flex-col pb-20 md:pb-32 relative" style={{ backgroundColor: '#F5EDE0' }}>
      {/* Noise Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.35] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply'
        }}
      />
      
      {/* Content with higher z-index */}
      <div className="relative z-10">
        {/* Header - Bauhaus Style */}
        <header className="pt-8 pb-4">
        <div className="container mx-auto px-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="font-black text-black tracking-tight" style={{ fontSize: '32px' }}>
                Icebreaker Pad
              </h1>
              <p className="text-base font-bold text-black mt-2 uppercase tracking-[3px]" style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '14px' }}>
                spark genuine connection
              </p>
            </div>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="ml-4 px-4 py-2 md:px-6 md:py-3 font-bold uppercase tracking-[3px] bg-white text-black border-3 border-black hover:bg-gray-100 active:translate-y-1 transition-all duration-200 whitespace-nowrap"
              style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '14px' }}
            >
              Learn More
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Question Display (Full Width, Centered) */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-6">
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

      {/* Learn More Modal */}
      <LearnMoreModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      </div>
    </div>
  );
}
