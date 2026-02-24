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
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 transition-opacity"
        style={{ backgroundColor: '#0057B7' }}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
                className="px-8 py-3 font-black uppercase text-base tracking-wider bg-black text-white border-3 border-black hover:bg-gray-800 active:translate-y-1 transition-all duration-200"
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
