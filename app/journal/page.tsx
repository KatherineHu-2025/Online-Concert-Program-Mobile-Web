'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import JournalEntry from '../components/JournalEntry';
import { getJournalEntries, JournalEntry as JournalEntryType } from '../utils/journalStorage';

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntryType[]>([]);

  useEffect(() => {
    const journalEntries = getJournalEntries();
    // Sort entries by date (most recent first)
    const sortedEntries = [...journalEntries].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setEntries(sortedEntries);
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-[#FEFBF4]">
      {/* Top title bar */}
      <div className="bg-[#2D2F3D] text-white py-5 px-4 flex items-center gap-4">
        <h1 className="text-lg font-bold">
          Interactive Concert Program
        </h1>
      </div>

      <div className="flex-1 px-6 py-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#2D2F3D]">Journal</h2>
          <Link 
            href="/journal/new" 
            className="px-4 py-2 bg-[#F2C3B3] text-[#2D2F3D] rounded-lg hover:opacity-90 transition-opacity"
          >
            New Entry
          </Link>
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No journal entries yet.</p>
            <p className="text-gray-500 text-sm mt-2">
              Write about your concert experiences by clicking the New Entry button
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 pb-24">
            {entries.map((entry) => (
              <JournalEntry
                key={entry.id}
                id={entry.id}
                title={entry.title}
                date={entry.date}
                venue={entry.venue}
                rating={entry.rating}
                preview={entry.preview}
              />
            ))}
          </div>
        )}
      </div>

      <Navbar />
    </main>
  );
} 