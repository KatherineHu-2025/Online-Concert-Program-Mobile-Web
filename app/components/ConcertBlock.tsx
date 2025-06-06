'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSavedConcerts, saveConcert, unsaveConcert } from '../utils/concertStorage';
import { getJournalEntries } from '../utils/journalStorage';
import { useRouter } from 'next/navigation';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface ConcertBlockProps {
  id: string;
  title: string;
  date: string;
  venue: string;
  circleColor: string;
}

const ConcertBlock: React.FC<ConcertBlockProps> = ({ id, title, date, venue, circleColor }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isPastConcert, setIsPastConcert] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const savedConcerts = getSavedConcerts();
    setIsSaved(savedConcerts.some(concert => concert.id === id));
    setIsPastConcert(new Date(date) < new Date());
  }, [id, date]);

  const formattedColor = circleColor?.startsWith('#') ? circleColor : `#${circleColor || 'DEDDED'}`;

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
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
    e.preventDefault();
    const entries = getJournalEntries();
    const existingEntry = entries.find(entry => entry.title === title);

    if (existingEntry) {
      router.push(`/journal/${existingEntry.id}`);
      return;
    }

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
        style={{ backgroundColor: isClient && isPastConcert ? '#734053' : '#334934' }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold mb-0.5">{title}</h3>
            <div className="flex items-center gap-1 opacity-90 mb-1">
              <CalendarIcon className="h-5 w-5" />
              <p>{date}</p>
            </div>
            <div className="flex items-center gap-1 opacity-80">
              <MapPinIcon className="h-5 w-5" />
              <p>{venue}</p>
            </div>
          </div>
          {isClient && (
            <div className="flex flex-col items-center gap-2">
              <div 
                className="w-8 h-8 rounded-full flex-shrink-0 border-2 border-[#FEFBF4]"
                style={{ backgroundColor: formattedColor, opacity: 1 }}
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
          )}
        </div>
      </div>
    </Link>
  );
};

export default ConcertBlock;