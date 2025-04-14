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
        className="rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow text-[#FEFBF4] relative"
        style={{ backgroundColor: new Date(date) >= new Date() ? '#334934' : '#A5A46B' }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold mb-0.5">{title}</h3>
            <p className="opacity-90">{date}</p>
            <p className="opacity-80">{venue}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div 
              className="w-8 h-8 rounded-full flex-shrink-0 border-2 border-[#FEFBF4]"
              style={{ backgroundColor: `#${circleColor}`, opacity: 1 }}
            />
            <button 
              onClick={handleSave}
              className="w-8 h-8 flex items-center justify-center"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill={isSaved ? "#FEFBF4" : "none"} xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17.5L5 21V5Z" 
                  stroke="#FEFBF4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ConcertBlock; 