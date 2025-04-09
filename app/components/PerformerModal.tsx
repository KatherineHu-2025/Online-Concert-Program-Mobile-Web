import React from 'react';
import Image from 'next/image';

interface PerformerModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  type: string;
  imageUrl: string;
  description: string;
}

const PerformerModal: React.FC<PerformerModalProps> = ({
  isOpen,
  onClose,
  name,
  type,
  imageUrl,
  description
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60" 
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-[340px] bg-[#DEDDED] rounded-2xl overflow-hidden">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-[#3B3C50] z-20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable Content */}
        <div className="max-h-[500px] overflow-y-auto pr-3">
          <div className="px-6 pt-6 pb-8 pr-3">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#7472B3]">
                <Image
                  src={imageUrl}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl text-[#3B3C50] font-lora">{name}</h3>
                <p className="text-[#3B3C50]/80 italic">{type}</p>
              </div>
            </div>

            {/* Decorative dots */}
            <div className="flex items-center gap-1 mb-6">
              {Array.from({ length: 22 }).map((_, i) => (
                <div 
                  key={i} 
                  className="w-2 h-2 rounded-full bg-[#7472B3] flex-shrink-0"
                />
              ))}
              <div className="w-5 h-5 flex-shrink-0 ml-1">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                  <path d="M9 19V6l12-3v13" stroke="#7472B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" stroke="#7472B3" strokeWidth="2"/>
                  <path d="M21 16c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" stroke="#7472B3" strokeWidth="2"/>
                </svg>
              </div>
            </div>

            {/* Description */}
            <div className="text-[#3B3C50] space-y-4">
              {description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformerModal; 