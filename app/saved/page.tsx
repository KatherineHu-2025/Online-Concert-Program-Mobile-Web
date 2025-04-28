'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSavedConcerts, SavedConcert, clearSavedConcerts } from '../utils/concertStorage';
import ConcertBlock from '../components/ConcertBlock';
import Navbar from '../components/Navbar';

export default function SavedConcerts() {
  const [savedConcerts, setSavedConcerts] = useState<SavedConcert[]>([]);

  useEffect(() => {
    const concerts = getSavedConcerts();
    // Sort concerts by date (soonest first)
    const sortedConcerts = [...concerts].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setSavedConcerts(sortedConcerts);
  }, []);

  const handleClear = () => {
    clearSavedConcerts();
    setSavedConcerts([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FEFBF4]">
      {/* Top title bar */}
      <div className="bg-[#2D2F3D] text-white py-5 px-4 flex items-center gap-4">
        <Link href="/" className="text-xl">
          ←
        </Link>
        <h1 className="text-lg font-bold">
          Interactive Concert Program
        </h1>
      </div>

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#2D2F3D]">Saved Concerts</h2>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-[#FF855F] text-[#FEFBF4] rounded-lg hover:opacity-90 transition-opacity"
          >
            Clear All
          </button>
        </div>

        {savedConcerts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No saved concerts yet.</p>
            <p className="text-gray-500 text-sm mt-2">
              Save concerts by clicking the bookmark icon on any concert card
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Continuous Timeline Line */}
            <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-[#C7CCE6]" />
            
            <div className="space-y-4">
              {savedConcerts.map((concert) => (
                <div key={concert.id} className="flex gap-4">
                  {/* Timeline Node */}
                  <div className="relative z-10">
                    <div className="w-8 h-8 rounded-full bg-[#7472B3] flex items-center justify-center text-[#FEFBF4] text-xs font-bold">
                      {new Date(concert.date).toLocaleString('default', { month: 'short' }).toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <ConcertBlock
                      id={concert.id}
                      title={concert.title}
                      date={concert.date}
                      venue={concert.venue}
                      circleColor={concert.circleColor || concert.color || 'DEDDED'}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Navbar />
    </div>
  );
} 