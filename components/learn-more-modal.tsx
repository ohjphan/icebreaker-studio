'use client';

import { X } from 'lucide-react';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

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
        <div className="pointer-events-auto bg-white border-4 border-black max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
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
              About Hi Vibes
            </h2>
            
            <div className="space-y-4 leading-relaxed text-black" style={{ fontSize: '16px' }}>
              <p>
                One of my favorite parts of design standup at CZI Education is bonding with my peers over a silly or surprisingly deep icebreaker question. Those small moments of sharing always seem to shift the energy in the room.
              </p>
              
              <p>
                Icebreakers are more than warm-ups. Brief, structured sharing builds psychological safety, increasing trust, participation, and openness. When people share small personal insights, it lowers social barriers and helps teams feel connected faster. Research shows that early participation and familiarity also strengthen collaboration, creativity, and problem-solving.
              </p>
              
              <p>
                Sometimes, though, coming up with a great question takes more time than you have. That's why I created Hi Vibes, to help teams spark meaningful connection and vibe together, effortlessly.
              </p>

              <div className="pt-4">
                <p className="font-bold">
                  Jessica Phan
                </p>
                <p className="text-sm text-black/70 mt-1">
                  Built in collaboration with Cursor and ChatGPT
                </p>
                
                {/* Social Icons */}
                <div className="flex gap-3 mt-3">
                  <a 
                    href="https://www.linkedin.com/in/jessicaphan/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 border-3 border-black hover:scale-110 transition-transform"
                    style={{ backgroundColor: '#0057B7' }}
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="h-5 w-5 text-white" />
                  </a>
                  <a 
                    href="https://x.com/ohjphan" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 border-3 border-black hover:scale-110 transition-transform"
                    style={{ backgroundColor: '#E30613' }}
                    aria-label="Twitter"
                  >
                    <FaTwitter className="h-5 w-5 text-white" />
                  </a>
                  <a 
                    href="https://www.instagram.com/phannify/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 border-3 border-black hover:scale-110 transition-transform"
                    style={{ backgroundColor: '#FFD500' }}
                    aria-label="Instagram"
                  >
                    <FaInstagram className="h-5 w-5 text-black" />
                  </a>
                </div>
              </div>
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
