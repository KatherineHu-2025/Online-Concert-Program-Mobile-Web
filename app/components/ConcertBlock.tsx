import React from 'react';
import Image from 'next/image';

interface ConcertBlockProps {
  title: string;
  date: string;
  venue: string;
  imageUrl?: string;
}

const ConcertBlock: React.FC<ConcertBlockProps> = ({
  title,
  date,
  venue,
  imageUrl = '/default-concert.png'
}) => {
  return (
    <div className="bg-[#2F4538] rounded-xl p-4 mb-4 text-white relative">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-italic mb-2">{title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{venue}</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
          <Image
            src={imageUrl}
            alt={title}
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
      </div>
      <button className="absolute top-4 right-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </button>
    </div>
  );
};

export default ConcertBlock; 