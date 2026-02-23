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
        className="min-h-[300px] md:min-h-[450px] rounded-[32px] p-8 md:p-16 border border-purple-200/50 shadow-lg shadow-purple-100/50 flex flex-col items-center justify-center space-y-8 transition-all duration-500 backdrop-blur-sm"
        style={{ backgroundColor: question ? cardColor : 'rgba(255, 255, 255, 0.8)' }}
      >
        {isLoading ? (
          <div className="text-center space-y-5 animate-pulse w-full">
            <div className="h-8 bg-purple-200/60 rounded-2xl w-3/4 mx-auto"></div>
            <div className="h-8 bg-purple-300/60 rounded-2xl w-full"></div>
            <div className="h-8 bg-purple-200/60 rounded-2xl w-4/5 mx-auto"></div>
            <div className="h-8 bg-purple-300/60 rounded-2xl w-2/3 mx-auto"></div>
          </div>
        ) : error ? (
          <div className="text-center space-y-4">
            <p className="text-red-600 text-base font-medium">{error}</p>
            <Button onClick={onReroll} variant="ghost" size="sm">
              Try Again
            </Button>
          </div>
        ) : question ? (
          <div className="w-full space-y-10 animate-in fade-in duration-500">
            <p className="text-2xl md:text-5xl text-purple-950 text-center leading-tight font-bold tracking-tight">
              {question}
            </p>
            <div className="flex justify-center">
              <button
                onClick={onReroll}
                className="px-8 py-4 rounded-full text-base font-bold bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-3"
              >
                <RefreshCw className="h-5 w-5" />
                Re-roll
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="text-7xl mb-4">✨</div>
            <p className="text-2xl md:text-3xl font-bold text-purple-900 tracking-tight">
              Ready to break the ice?
            </p>
            <p className="text-base text-purple-600">
              Customize your filters and generate a question
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

