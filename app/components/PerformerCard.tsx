import React from 'react';
import Image from 'next/image';

interface PerformerCardProps {
  name: string;
  type: string;
  imageUrl: string;
  isGroup: boolean;
}

const PerformerCard: React.FC<PerformerCardProps> = ({ 
  name, 
  type, 
  imageUrl,
  isGroup
}) => {
  return (
    <div className="bg-[#6D4C5E] rounded-2xl p-4 mb-4 text-white">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 relative">
          <Image
            src={isGroup ? '/group-avatar.svg' : '/single-avatar.svg'}
            alt={name}
            fill
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-1">{name}</h3>
          <p className="text-gray-300 text-sm">{type}</p>
        </div>
      </div>
    </div>
  );
};

export default PerformerCard; 