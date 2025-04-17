'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { addJournalEntry, getJournalEntries, updateJournalEntry, JournalEntry } from '../../utils/journalStorage';

export default function NewJournalEntry() {
  const router = useRouter();
  const [entryId, setEntryId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  useEffect(() => {
    // Get the most recently added entry
    const entries = getJournalEntries();
    const latestEntry = entries[entries.length - 1];
    
    if (latestEntry) {
      setEntryId(latestEntry.id);
      setTitle(latestEntry.title);
      setDate(latestEntry.date);
      setVenue(latestEntry.venue);
      setRating(latestEntry.rating);
      setContent(latestEntry.content);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const entry = {
      id: entryId || Date.now().toString(),
      title,
      date,
      venue,
      rating,
      content,
      preview: content.slice(0, 100) + (content.length > 100 ? '...' : '')
    };

    if (entryId) {
      updateJournalEntry(entryId, entry);
    } else {
      addJournalEntry(entry);
    }
    
    router.push('/journal');
  };

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
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-2xl font-bold text-[#2D2F3D]"
              required
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
              className="w-full p-2 border border-gray-300 rounded-lg text-gray-600"
              required
            />
          </div>

          <div>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-gray-600"
              required
            />
          </div>

          <div className="bg-[#7472B3] rounded-lg p-6 shadow-sm">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg h-48 bg-white text-[#2D2F3D]"
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
      </div>
    </main>
  );
} 