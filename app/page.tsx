'use client';

import React, { useState, useEffect } from 'react';
import ConcertBlock from './components/ConcertBlock';
import Navbar from './components/Navbar';
import { getScannedConcerts, SavedConcert, syncConcertsWithFirebase, getLastSyncTime } from './utils/concertStorage';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [scannedConcerts, setScannedConcerts] = useState<SavedConcert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAndSyncConcerts() {
      setIsLoading(true);
      try {
        // Load initial concerts from local storage
        const concerts = getScannedConcerts();
        setScannedConcerts(concerts);

        // Check if we need to sync (every 5 minutes)
        const lastSync = getLastSyncTime();
        const fiveMinutes = 5 * 60 * 1000;
        if (Date.now() - lastSync > fiveMinutes) {
          await syncConcertsWithFirebase();
          // Reload concerts after sync
          const updatedConcerts = getScannedConcerts();
          setScannedConcerts(updatedConcerts);
        }
      } catch (error) {
        console.error('Error loading concerts:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadAndSyncConcerts();

    // Set up periodic sync every 5 minutes
    const syncInterval = setInterval(async () => {
      try {
        await syncConcertsWithFirebase();
        const updatedConcerts = getScannedConcerts();
        setScannedConcerts(updatedConcerts);
      } catch (error) {
        console.error('Error during periodic sync:', error);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(syncInterval);
  }, []);

  const currentDate = new Date();
  
  const filteredConcerts = scannedConcerts
    .filter(concert => {
      const concertDate = new Date(concert.date);
      if (activeTab === 'upcoming') {
        return concertDate >= currentDate;
      } else {
        return concertDate < currentDate;
      }
    })
    .filter(concert => 
      concert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concert.venue.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <main className="h-screen flex flex-col bg-[#2B2F3E]">
      <header className="text-white p-6 pt-25 flex-shrink-0">
        <h1 className="text-2xl font-semibold">Interactive Concert Program</h1>
      </header>

      {/* Fixed top controls: Tabs and Search */}
      <div className="bg-[#FEFBF4] flex-shrink-0 sticky top-0 z-20">
        <div className="p-6 pb-2">
          {/* Tab Labels and Buttons */}
          <div className="flex items-center">
            {/* Upcoming Concerts Tab */}
            <div className="flex-1">
              <div 
                className="cursor-pointer h-[64px] flex flex-col"
                onClick={() => setActiveTab('upcoming')}
              >
                <div className="flex-1 flex items-center justify-center">
                  <h2 className="text-lg text-[#3B3C50] text-center">
                    Upcoming<br />Concerts
                  </h2>
                </div>
                <div 
                  className={`h-[6px] mx-2 rounded-full ${
                    activeTab === 'upcoming' ? 'bg-[#334934]' : 'bg-transparent'
                  }`}
                />
              </div>
            </div>

            {/* Separator */}
            <div className="mx-2 h-8 w-1 rounded-full bg-[#F2C3B3]/50" />

            {/* Past Concerts Tab */}
            <div className="flex-1">
              <div 
                className="cursor-pointer h-[64px] flex flex-col"
                onClick={() => setActiveTab('past')}
              >
                <div className="flex-1 flex items-center justify-center">
                  <h2 className="text-lg text-[#3B3C50] text-center">
                    Past Concerts
                  </h2>
                </div>
                <div 
                  className={`h-[6px] mx-2 rounded-full ${
                    activeTab === 'past' ? 'bg-[#734053]' : 'bg-transparent'
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="relative mt-4 mb-2">
            <input
              type="text"
              placeholder="Search Events"
              className="w-full bg-white/10 rounded-full py-2 px-4 pl-10 text-[#3B3C50] placeholder-[#3B3C50] border border-[#DEDDED] focus:outline-none focus:border-[#F2C3B3] focus:ring-1 focus:ring-[#F2C3B3] transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3B3C50]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Scrollable timeline section */}
      <div className="flex-1 bg-[#FEFBF4] overflow-y-auto concert-scrollbar" style={{ minHeight: 0 }}>
        <section className="px-6 pb-32 pt-2">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Loading concerts...</p>
            </div>
          ) : scannedConcerts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No concerts added yet</p>
              <p className="text-gray-400 text-sm">
                Scan a concert QR code to add it to your list
              </p>
            </div>
          ) : (
            <div className="relative z-0">
              {/* Continuous Timeline Line */}
              <div className="absolute left-4 top-4 bottom-24 w-0.5 bg-[#C7CCE6] z-0" />
              <div className="space-y-4">
                {filteredConcerts.map((concert) => (
                  <div key={concert.id} className="flex gap-4">
                    {/* Timeline Node */}
                    <div className="relative z-0">
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
                {filteredConcerts.length === 0 && (
                  <div className="text-center text-[#3B3C50] py-8">
                    No concerts found
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </div>

      <Navbar />
    </main>
  );
}
