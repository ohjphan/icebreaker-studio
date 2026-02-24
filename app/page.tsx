'use client';

import { useState, useEffect } from 'react';
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
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  // Track mouse movement for dynamic gradient
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-generate question on page load
  useEffect(() => {
    handleGenerate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    <div className="min-h-screen flex flex-col pb-20 md:pb-32 bg-white">
      {/* Header - Bauhaus Style */}
      <header className="pt-8 pb-4 border-b-4 border-black">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter">
            ICEBREAKER
          </h1>
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
    </div>
  );
}
