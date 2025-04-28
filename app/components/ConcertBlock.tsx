import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSavedConcerts, saveConcert, unsaveConcert } from '../utils/concertStorage';

interface ConcertBlockProps {
  id: string;
  title: string;
  date: string;
  venue: string;
  circleColor: string;
}

const ConcertBlock: React.FC<ConcertBlockProps> = ({ id, title, date, venue, circleColor }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedConcerts = getSavedConcerts();
    setIsSaved(savedConcerts.some(concert => concert.id === id));
  }, [id]);

  // Log the incoming color value
  console.log('Incoming circleColor:', circleColor);

  // Format the color value to handle both formats (with or without #)
  const formattedColor = circleColor?.startsWith('#') ? circleColor : `#${circleColor || 'DEDDED'}`;
  
  // Log the formatted color
  console.log('Formatted color:', formattedColor);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    if (isSaved) {
      unsaveConcert(id);
    } else {
      saveConcert({
        id,
        title,
        date,
        venue,
        circleColor
      });
    }
    setIsSaved(!isSaved);
  };

  return (
    <Link href={`/concert/${id}`}>
      <div 
        className={`rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative ${
          new Date(date) >= new Date() 
            ? 'bg-[#334934] text-[#FEFBF4]' 
            : 'bg-[#734053] text-[#FEFBF4]'
        }`}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold mb-0.5">{title}</h3>
            <p>{(() => {
              const dateObj = new Date(date);
              return dateObj.toLocaleString(undefined, {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              });
            })()}</p>
            <p>{venue}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div 
              className={`w-8 h-8 rounded-full flex-shrink-0 border-2 ${
                new Date(date) >= new Date() ? 'border-[#FEFBF4]' : 'border-[#FEFBF4]'
              }`}
              style={{ 
                backgroundColor: formattedColor,
                opacity: 1
              }}
            />
            <button 
              onClick={handleSave}
              className="w-8 h-8 flex items-center justify-center"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill={isSaved ? "#FEFBF4" : "none"} 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17.5L5 21V5Z" 
                  stroke="#FEFBF4"
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ConcertBlock; 