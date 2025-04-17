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
      <div className="bg-[#7472B3] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow text-[#FEFBF4]">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            <p className="opacity-90 text-sm mb-0.5">{formatDate(date)}</p>
            <p className="opacity-80 text-sm">{venue}</p>
            <div className="mt-2 flex justify-between items-center">
              <p className="text-sm opacity-90 italic">{formatPreview(preview)}</p>
              <button className="w-8 h-8 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity ml-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <span key={index} className="text-lg">
                {index < rating ? "★" : "☆"}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JournalEntry; 