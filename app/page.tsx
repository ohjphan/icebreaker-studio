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

  // Get upcoming card colors for stack effect
  const getUpcomingCardColors = () => {
    return [
      cardColors[Math.floor(Math.random() * cardColors.length)],
      cardColors[Math.floor(Math.random() * cardColors.length)],
    ];
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
          <div className="w-full max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="font-black text-black tracking-tight group inline-block cursor-default" style={{ fontSize: '32px' }}>
                <span className="inline-block title-letter group-hover:animate-bounce group-hover:text-[#E30613] transition-colors">H</span>
                <span className="inline-block title-letter group-hover:animate-bounce group-hover:[animation-delay:0.05s] group-hover:text-[#0057B7] transition-colors">i</span>
                <span className="inline-block group-hover:text-black transition-colors"> </span>
                <span className="inline-block title-letter group-hover:animate-bounce group-hover:[animation-delay:0.1s] group-hover:text-[#FFD500] transition-colors">V</span>
                <span className="inline-block title-letter group-hover:animate-bounce group-hover:[animation-delay:0.15s] group-hover:text-[#E30613] transition-colors">i</span>
                <span className="inline-block title-letter group-hover:animate-bounce group-hover:[animation-delay:0.2s] group-hover:text-[#0057B7] transition-colors">b</span>
                <span className="inline-block title-letter group-hover:animate-bounce group-hover:[animation-delay:0.25s] group-hover:text-[#FFD500] transition-colors">e</span>
                <span className="inline-block title-letter group-hover:animate-bounce group-hover:[animation-delay:0.3s] group-hover:text-[#E30613] transition-colors">s</span>
              </h1>
              <p className="text-base font-bold text-black mt-1 uppercase tracking-[3px]" style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '14px' }}>
                spark genuine connection
              </p>
            </div>
            
            {/* Menu Button - 3 Squares */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="group ml-4 flex items-center gap-1.5 p-2 hover:bg-black/5 transition-colors rounded"
              aria-label="Learn More"
            >
              <div className="w-5 h-5 bg-[#E30613] border-3 border-black group-hover:animate-bounce"></div>
              <div className="w-5 h-5 bg-[#0057B7] border-3 border-black group-hover:animate-bounce group-hover:[animation-delay:0.1s]"></div>
              <div className="w-5 h-5 bg-[#FFD500] border-3 border-black group-hover:animate-bounce group-hover:[animation-delay:0.2s]"></div>
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
            upcomingCardColors={getUpcomingCardColors()}
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
