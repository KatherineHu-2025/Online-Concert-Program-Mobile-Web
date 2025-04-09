import React from 'react';
import Link from 'next/link';

interface ConcertBlockProps {
  id: string;
  title: string;
  date: string;
  venue: string;
  circleColor: string;
}

const ConcertBlock: React.FC<ConcertBlockProps> = ({ id, title, date, venue, circleColor }) => {
  return (
    <Link href={`/concert/${id}`}>
      <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-[#2B2F3E]">{title}</h3>
          <div 
            className="w-8 h-8 rounded-full flex-shrink-0"
            style={{ backgroundColor: `#${circleColor}` }}
          />
        </div>
        <div className="space-y-1">
          <p className="text-gray-600">{date}</p>
          <p className="text-gray-500">{venue}</p>
        </div>
      </div>
    </Link>
  );
};

export default ConcertBlock; 