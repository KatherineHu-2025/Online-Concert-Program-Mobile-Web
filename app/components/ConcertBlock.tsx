import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSavedConcerts, saveConcert, unsaveConcert } from '../utils/concertStorage';
import { getJournalEntries } from '../utils/journalStorage';
import { useRouter } from 'next/navigation';

interface ConcertBlockProps {
  id: string;
  title: string;
  date: string;
  venue: string;
  circleColor: string;
}

const ConcertBlock: React.FC<ConcertBlockProps> = ({ id, title, date, venue, circleColor }) => {
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();
  const isPastConcert = new Date(date) < new Date();

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

  const handleCreateJournal = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    
    // Check if an entry for this concert already exists by title only
    const entries = getJournalEntries();
    const existingEntry = entries.find(entry => entry.title === title);

    if (existingEntry) {
      // If entry exists, navigate to its edit page
      router.push(`/journal/${existingEntry.id}`);
      return;
    }

    // If no entry exists, navigate to /journal/new with concert info as query params
    const params = new URLSearchParams({
      title,
      date: new Date(date).toISOString().slice(0, 16),
      venue
    });
    router.push(`/journal/new?${params.toString()}`);
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
            {isPastConcert && (
              <button
                onClick={handleCreateJournal}
                className="w-8 h-8 flex items-center justify-center"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FEFBF4" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ConcertBlock;