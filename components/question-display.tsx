'use client';

import { Button } from '@/components/ui/button';

interface QuestionDisplayProps {
  question: string | null;
  isLoading: boolean;
  error: string | null;
  onReroll: () => void;
  cardColor: string;
}

export function QuestionDisplay({
  question,
  isLoading,
  error,
  onReroll,
  cardColor,
}: QuestionDisplayProps) {
  const textColor = cardColor === '#FFFFFF' ? '#000000' : '#FFFFFF';
  
  return (
    <div className="w-full">
      <div 
        className="min-h-[400px] md:min-h-[500px] p-12 md:p-20 border-4 border-black flex flex-col items-center justify-center space-y-10 transition-all duration-300"
        style={{ 
          backgroundColor: cardColor,
        }}
      >
        {isLoading ? (
          <div className="text-center space-y-6 w-full">
            <div className="flex items-center justify-center gap-4">
              <div className="w-8 h-8 bg-[#E30613] animate-bounce"></div>
              <div className="w-8 h-8 bg-[#0057B7] animate-bounce [animation-delay:0.1s]"></div>
              <div className="w-8 h-8 bg-[#FFD500] animate-bounce [animation-delay:0.2s]"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center space-y-4">
            <p className="text-red-600 text-lg font-bold uppercase">{error}</p>
            <Button onClick={onReroll} variant="ghost" size="sm" className="font-black uppercase">
              Try Again
            </Button>
          </div>
        ) : question ? (
          <div className="w-full space-y-12 animate-in fade-in duration-500">
            <p 
              className="text-3xl md:text-6xl text-center leading-tight font-black uppercase tracking-tighter"
              style={{ color: textColor }}
            >
              {question}
            </p>
            <div className="flex justify-center">
              <button
                onClick={onReroll}
                disabled={isLoading}
                className="group px-10 py-4 font-black uppercase text-base tracking-wider bg-white text-black border-3 border-black hover:bg-gray-100 active:translate-y-1 transition-all duration-200 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className={`text-2xl ${isLoading ? 'animate-bounce' : 'group-hover:animate-bounce'}`}>
                  🎲
                </span>
                Re-roll
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-[#E30613]"></div>
              <div className="w-16 h-16 bg-[#0057B7] rounded-full"></div>
              <div className="w-16 h-16 bg-[#FFD500]"></div>
            </div>
            <p className="text-2xl md:text-4xl font-black text-black uppercase tracking-tighter">
              Loading...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

