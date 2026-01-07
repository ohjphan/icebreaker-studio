'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

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
  return (
    <div className="w-full">
      <div 
        className="min-h-[300px] md:min-h-[400px] rounded-3xl p-8 md:p-16 border-3 border-gray-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center space-y-8 transition-colors duration-500"
        style={{ backgroundColor: question ? cardColor : '#FFFFFF' }}
      >
        {isLoading ? (
          <div className="text-center space-y-4 animate-pulse w-full">
            <div className="h-6 bg-purple-200 rounded-full w-3/4 mx-auto"></div>
            <div className="h-6 bg-pink-200 rounded-full w-full"></div>
            <div className="h-6 bg-blue-200 rounded-full w-4/5 mx-auto"></div>
            <div className="h-6 bg-purple-200 rounded-full w-2/3 mx-auto"></div>
          </div>
        ) : error ? (
          <div className="text-center space-y-4">
            <p className="text-red-600 text-base font-medium">{error}</p>
            <Button onClick={onReroll} variant="ghost" size="sm">
              Try Again
            </Button>
          </div>
        ) : question ? (
          <div className="w-full space-y-8 animate-in fade-in duration-300">
            <p className="text-2xl md:text-4xl text-gray-900 text-center leading-relaxed font-bold">
              {question}
            </p>
            <div className="flex justify-center">
              <button
                onClick={onReroll}
                className="px-6 py-3 rounded-full text-sm font-bold border-2 border-gray-800 bg-gradient-to-r from-yellow-300 to-orange-300 hover:from-yellow-400 hover:to-orange-400 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] transition-all duration-200 flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Re-roll
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-xl md:text-2xl font-bold text-gray-600">
              Select your vibe and generate a question
            </p>
            <p className="text-sm text-gray-500">
              Use the controls on the left to customize
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

