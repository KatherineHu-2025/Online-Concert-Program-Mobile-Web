'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { addJournalEntry } from '../../utils/journalStorage';

// Separate form component that uses useSearchParams
function JournalEntryForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  React.useEffect(() => {
    // Only pre-populate if query params exist
    const titleParam = searchParams.get('title');
    const dateParam = searchParams.get('date');
    const venueParam = searchParams.get('venue');
    if (titleParam || dateParam || venueParam) {
      setTitle(titleParam || '');
      setDate(dateParam || '');
      setVenue(venueParam || '');
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const entry = {
      id: Date.now().toString(),
      title,
      date,
      venue,
      rating,
      content,
      preview: content.slice(0, 100) + (content.length > 100 ? '...' : '')
    };

    addJournalEntry(entry);
    
    router.push('/journal');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-[#7472B3] rounded-lg text-2xl font-bold text-[#7472B3]"
          required
          placeholder="Title"
        />
      </div>

      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="text-2xl text-[#7472B3]"
          >
            {star <= rating ? "★" : "☆"}
          </button>
        ))}
      </div>

      <div>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border border-[#7472B3] rounded-lg text-[#7472B3]"
          required
        />
      </div>

      <div>
        <input
          type="text"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          className="w-full p-2 border border-[#7472B3] rounded-lg text-[#7472B3]"
          required
          placeholder="Location"
        />
      </div>

      <div className="bg-[#7472B3] rounded-lg p-6 shadow-sm">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-[#7472B3] rounded-lg h-48 bg-white text-[#2D2F3D] placeholder-[#7472B3]"
          placeholder="Write your thoughts here..."
          required
        />
        <div className="flex justify-end gap-2 mt-4">
          <Link
            href="/journal"
            className="px-4 py-2 text-[#FEFBF4] hover:text-white transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-[#FEFBF4] text-[#7472B3] rounded-lg hover:opacity-90 transition-opacity"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

// Main page component with Suspense boundary
export default function NewJournalEntry() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FEFBF4]">
      {/* Top title bar */}
      <div className="bg-[#2D2F3D] text-white py-5 px-4 flex items-center gap-4">
        <Link href="/journal" className="text-xl">
          ←
        </Link>
        <h1 className="text-lg font-bold">
          Journal Entry
        </h1>
      </div>

      <div className="flex-1 p-6">
        <Suspense fallback={
          <div className="flex items-center justify-center h-full">
            <div className="text-[#7472B3]">Loading...</div>
          </div>
        }>
          <JournalEntryForm />
        </Suspense>
      </div>

      <style jsx global>{`
        input[type='datetime-local']::-webkit-calendar-picker-indicator {
          filter: invert(36%) sepia(16%) saturate(1162%) hue-rotate(208deg) brightness(91%) contrast(91%);
        }
        input:focus, textarea:focus {
          outline: 2px solid #F2C3B3 !important;
          box-shadow: 0 0 0 2px #F2C3B3 !important;
          border-color: #F2C3B3 !important;
        }
      `}</style>
    </main>
  );
} 