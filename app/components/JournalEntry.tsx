import React from 'react';
import Link from 'next/link';

interface JournalEntryProps {
  id: string;
  title: string;
  date: string;
  venue: string;
  rating: number;
  preview: string;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ id, title, date, venue, rating, preview }) => {
  // Format the date string
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Format preview to show first three words
  const formatPreview = (text: string) => {
    const words = text.split(' ');
    if (words.length <= 3) return text;
    return words.slice(0, 3).join(' ') + '...';
  };

  return (
    <Link href={`/journal/${id}`}>
      <div className="bg-[#7472B3] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow text-[#FEFBF4] relative">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1 text-[#FEFBF4]">{title}</h3>
            <p className="text-sm mb-0.5 flex items-center text-[#FEFBF4]">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="#FEFBF4" viewBox="0 0 32 32" strokeWidth="2">
                <rect x="5" y="6" width="22" height="20" rx="3" stroke="#FEFBF4" strokeWidth="2" fill="none" />
                <path d="M22 4v4M10 4v4M5 12h22" stroke="#FEFBF4" strokeWidth="2" />
              </svg>
              {formatDate(date)}
            </p>
            <p className="text-sm flex items-center text-[#FEFBF4]">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="#FEFBF4" viewBox="0 0 32 32" strokeWidth="2">
                <circle cx="16" cy="13" r="4" stroke="#FEFBF4" strokeWidth="2" fill="none" />
                <path d="M16 28C9 19.5 6 15.5 6 11.5C6 7.35786 9.35786 4 13.5 4H18.5C22.6421 4 26 7.35786 26 11.5C26 15.5 23 19.5 16 28Z" stroke="#FEFBF4" strokeWidth="2" fill="none" />
              </svg>
              {venue}
            </p>
            <div className="mt-2 flex justify-between items-center">
              <p className="text-sm italic text-[#FEFBF4]">{formatPreview(preview)}</p>
            </div>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <span key={index} className="text-lg text-[#FEFBF4]">
                {index < rating ? "★" : "☆"}
              </span>
            ))}
          </div>
        </div>
        <button className="w-8 h-8 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity absolute bottom-2 right-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      </div>
    </Link>
  );
};

export default JournalEntry; 