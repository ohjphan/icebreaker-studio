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
  // Determine text color based on background
  const textColor = cardColor === '#FFD500' ? '#000000' : '#FFFFFF';
  
  return (
    <div className="w-full">
      <div 
        className="min-h-[400px] md:min-h-[500px] border-4 border-black relative overflow-hidden"
        style={{ 
          backgroundColor: cardColor,
        }}
      >
        {/* Noise Texture Overlay on Card */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.6] z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'multiply',
            width: '100%',
            height: '100%'
          }}
        />
        
        {/* Content with higher z-index */}
        <div className="relative z-10 w-full h-full p-12 md:p-20 flex flex-col items-center justify-center space-y-10">
        {isLoading ? (
          <div className="text-center space-y-6 w-full">
            <div className="flex items-center justify-center gap-4">
              <div className="w-8 h-8 bg-[#E30613] border-3 border-black animate-bounce"></div>
              <div className="w-8 h-8 bg-[#0057B7] border-3 border-black animate-bounce [animation-delay:0.1s]"></div>
              <div className="w-8 h-8 bg-[#FFD500] border-3 border-black animate-bounce [animation-delay:0.2s]"></div>
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
              className="text-3xl md:text-6xl text-center leading-tight font-black tracking-tight"
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
              <div className="w-16 h-16 bg-[#E30613] border-3 border-black"></div>
              <div className="w-16 h-16 bg-[#0057B7] border-3 border-black rounded-full"></div>
              <div className="w-16 h-16 bg-[#FFD500] border-3 border-black"></div>
            </div>
            <p className="text-2xl md:text-4xl font-black text-black uppercase tracking-tighter">
              Loading...
            </p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

