import React from 'react';
import Image from 'next/image';

interface PerformerCardProps {
  name: string;
  type: string;
  imageUrl: string;
}

const PerformerCard: React.FC<PerformerCardProps> = ({ name, type, imageUrl }) => {
  return (
    <div className="bg-[#6D4C5E] rounded-lg py-2.5 px-4 flex items-center gap-4 text-white mb-4">
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
  );
};

export default PerformerCard; 