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
    <div 
      className="min-h-screen flex flex-col pb-32 transition-all duration-300 ease-out relative overflow-hidden"
      style={{ 
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(255, 107, 237, 0.4) 0%, 
            rgba(138, 127, 232, 0.3) 20%, 
            transparent 50%),
          radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, 
            rgba(255, 154, 158, 0.3) 0%, 
            rgba(108, 92, 231, 0.4) 30%, 
            transparent 60%),
          linear-gradient(135deg, 
            #6C5CE7 0%, 
            #FF6BED 20%, 
            #FF9A9E 40%, 
            #5ED9E3 60%, 
            #8B7FE8 80%, 
            #4C3F91 100%)`
      }}
    >
      {/* Header - Simplified */}
      <header className="pt-6 pb-0">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center tracking-tight">
            Icebreaker Studio
          </h1>
          <p className="text-sm md:text-base text-purple-100 mt-2 font-medium text-center">
            Spark genuine connection
          </p>
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
