import React, { useState } from 'react';
import Image from 'next/image';
import PerformerModal from './PerformerModal';

interface PerformerCardProps {
  name: string;
  type: string;
  imageUrl: string;
  description?: string;
}

const PerformerCard: React.FC<PerformerCardProps> = ({ 
  name, 
  type, 
  imageUrl,
  description = "Winners of The American Prize in Orchestral Performance 2018, college division, The Davidson College Symphony Orchestra (DCSO) is an ensemble for students of all backgrounds to rehearse and perform in a collaborative atmosphere while honing their technical skills and broadening their musical knowledge and experience.\n\nApproximately 95% of the ensemble is composed of non-music majors, with no special priority given to music majors. This diverse body of students enhances their artistry in conjunction with their various perspectives and academic interests, creating an engaging and artistically stimulating rehearsal atmosphere.\n\nAs an auditioned ensemble averaging 60 student musicians, the DCSO performs a diverse range of orchestral repertoire from the Baroque through the present, featuring works by living composers each season. The orchestra rehearses twice weekly (Mondays and Wednesdays from 4:30-5:45 p.m.)"
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="bg-[#6D4C5E] rounded-2xl py-2.5 px-4 flex items-center gap-4 text-white mb-4 cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-bold">{name}</h3>
          <p className="text-white/80 italic">{type}</p>
        </div>
      </div>

      <PerformerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        name={name}
        type={type}
        imageUrl={imageUrl}
        description={description}
      />
    </>
  );
};

export default PerformerCard; 