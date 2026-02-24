'use client';

import { X } from 'lucide-react';

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LearnMoreModal({ isOpen, onClose }: LearnMoreModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with Blue Background */}
      <div 
        className="fixed inset-0 z-50 transition-opacity"
        style={{ backgroundColor: '#0057B7' }}
        onClick={onClose}
      >
        {/* Noise Texture Overlay on top of blue */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.5]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'multiply',
            width: '100%',
            height: '100%'
          }}
        />
      </div>
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="pointer-events-auto">
        <div className="bg-white border-4 border-black max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6" strokeWidth={3} />
          </button>

          {/* Content */}
          <div className="p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-black text-black mb-6 tracking-tight">
              About Icebreaker Pad
            </h2>
            
            <div className="space-y-4 text-base md:text-lg leading-relaxed text-black">
              <p>
                Icebreakers are more than warm-ups. They're backed by social science. Brief, structured sharing builds psychological safety, increasing trust, participation, and openness. When people share small personal insights, it reduces social threat and helps teams feel more connected, faster. Research shows that early participation and familiarity also improve collaboration, creativity, and problem-solving.
              </p>
              
              <p>
                That's why we created Icebreaker Pad to generate thoughtful questions that help teams connect and vibe faster. Created by Jessica Phan with the help of Cursor and ChatGPT, it's designed to make meaningful connection simple, fast, and accessible for any group.
              </p>
            </div>

            {/* Close button at bottom */}
            <div className="mt-8">
              <button
                onClick={onClose}
                className="px-8 py-3 font-bold uppercase tracking-[3px] bg-black text-white border-3 border-black hover:bg-gray-800 active:translate-y-1 transition-all duration-200"
                style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '14px' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
