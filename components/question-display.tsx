'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface QuestionDisplayProps {
  question: string | null;
  isLoading: boolean;
  error: string | null;
  onReroll: () => void;
  cardColor: string;
  upcomingCardColors: string[];
}

export function QuestionDisplay({
  question,
  isLoading,
  error,
  onReroll,
  cardColor,
  upcomingCardColors,
}: QuestionDisplayProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isSwipingOut, setIsSwipingOut] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'down' | null>(null);

  // Determine text color based on background
  const textColor = cardColor === '#FFD500' ? '#000000' : '#FFFFFF';

  const handleRerollClick = () => {
    // Animate card swiping down
    setIsSwipingOut(true);
    setSwipeDirection('down');
    setDragOffset({ x: 0, y: 600 }); // Swipe down
    
    setTimeout(() => {
      onReroll();
      setIsSwipingOut(false);
      setSwipeDirection(null);
      setDragOffset({ x: 0, y: 0 });
    }, 300);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    const threshold = 100;
    
    if (Math.abs(dragOffset.x) > threshold || Math.abs(dragOffset.y) > threshold) {
      // Determine swipe direction and animate out
      setIsSwipingOut(true);
      
      if (Math.abs(dragOffset.x) > Math.abs(dragOffset.y)) {
        // Horizontal swipe
        const direction = dragOffset.x > 0 ? 'right' : 'left';
        setSwipeDirection(direction);
        setDragOffset({ x: dragOffset.x > 0 ? 1000 : -1000, y: dragOffset.y });
      } else {
        // Vertical swipe (down)
        setSwipeDirection('down');
        setDragOffset({ x: dragOffset.x, y: 600 });
      }
      
      setTimeout(() => {
        onReroll();
        setDragOffset({ x: 0, y: 0 });
        setIsDragging(false);
        setIsSwipingOut(false);
        setSwipeDirection(null);
      }, 300);
    } else {
      // Snap back
      setDragOffset({ x: 0, y: 0 });
      setIsDragging(false);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startPos.x;
    const deltaY = e.touches[0].clientY - startPos.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleTouchEnd = () => {
    const threshold = 100;
    
    if (Math.abs(dragOffset.x) > threshold || Math.abs(dragOffset.y) > threshold) {
      // Determine swipe direction and animate out
      setIsSwipingOut(true);
      
      if (Math.abs(dragOffset.x) > Math.abs(dragOffset.y)) {
        // Horizontal swipe
        const direction = dragOffset.x > 0 ? 'right' : 'left';
        setSwipeDirection(direction);
        setDragOffset({ x: dragOffset.x > 0 ? 1000 : -1000, y: dragOffset.y });
      } else {
        // Vertical swipe (down)
        setSwipeDirection('down');
        setDragOffset({ x: dragOffset.x, y: 600 });
      }
      
      setTimeout(() => {
        onReroll();
        setDragOffset({ x: 0, y: 0 });
        setIsDragging(false);
        setIsSwipingOut(false);
        setSwipeDirection(null);
      }, 300);
    } else {
      // Snap back
      setDragOffset({ x: 0, y: 0 });
      setIsDragging(false);
    }
  };

  const rotation = dragOffset.x * 0.05; // Subtle rotation based on drag
  
  return (
    <div className="w-full relative" style={{ minHeight: '500px', paddingTop: '30px' }}>
      {/* Stack of upcoming cards (behind) - peeking from top */}
      {upcomingCardColors.map((color, index) => {
        // Define explicit peek distances: 2nd card = 10px down, 3rd card = 8px up
        const basePeek = index === 0 ? 10 : -8;
        
        // When swiping out, cards move up more (closing the gap)
        const translateY = isSwipingOut 
          ? basePeek - 20 // Move up by 20px when swiping
          : basePeek;
        
        const scale = isSwipingOut
          ? 1 - (index + 1) * 0.02 + 0.02 // Grow slightly when swiping
          : 1 - (index + 1) * 0.02;
        
        return (
          <div
            key={`upcoming-${index}`}
            className="absolute top-0 left-0 right-0 min-h-[400px] md:min-h-[500px] border-4 border-black pointer-events-none"
            style={{
              backgroundColor: color,
              transform: `translateY(${translateY}px) scale(${scale})`,
              zIndex: 2 - index,
              opacity: 1,
              transition: isSwipingOut ? 'transform 0.3s ease-out' : 'transform 0.2s ease-out',
            }}
          >
            {/* Noise Texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.6]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                mixBlendMode: 'multiply',
              }}
            />
          </div>
        );
      })}

      {/* Main card (top) */}
      <div
        className="relative min-h-[400px] md:min-h-[500px] border-4 border-black overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          backgroundColor: cardColor,
          transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
          transition: isDragging ? 'none' : isSwipingOut ? 'transform 0.3s ease-in' : 'transform 0.3s ease-out',
          zIndex: 10,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
        <div className="relative z-10 w-full p-12 md:p-20 flex flex-col items-center justify-center">
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
          <div className="w-full flex flex-col items-center justify-center space-y-12 animate-in fade-in duration-500">
            <p 
              className="text-center leading-tight font-black tracking-tight max-w-4xl"
              style={{ color: textColor, fontSize: '40px' }}
            >
              {question}
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleRerollClick}
                disabled={isLoading}
                className="group px-10 py-4 font-bold uppercase tracking-[3px] bg-white text-black border-3 border-black hover:bg-gray-100 active:translate-y-1 transition-all duration-200 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '14px' }}
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

