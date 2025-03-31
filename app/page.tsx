'use client';

import React, { useState } from 'react';
import ConcertBlock from './components/ConcertBlock';
import Navbar from './components/Navbar';

interface Concert {
  id: string;
  title: string;
  date: string;
  venue: string;
  circleColor: string;
  month: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  const upcomingConcerts: Concert[] = [
    {
      id: '1',
      title: 'Czech Chamber Music',
      date: '3/30/2025 7:30pm',
      venue: 'Tyler-Tallman Hall',
      circleColor: 'DEDDED',
      month: 'MAR'
    },
    {
      id: '2',
      title: "Debussy's La Mer",
      date: '4/20/2025 7:30pm',
      venue: 'Duke Family Performance Hall',
      circleColor: 'E0EFD8',
      month: 'APR'
    }
  ];

  const pastConcerts: Concert[] = [];

  const filteredConcerts = (activeTab === 'upcoming' ? upcomingConcerts : pastConcerts)
    .filter(concert => 
      concert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concert.venue.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <main className="min-h-screen flex flex-col bg-[#2B2F3E]">
      <header className="text-white p-6 pt-25">
        <h1 className="text-2xl font-semibold">Interactive Concert Program</h1>
      </header>

      <div className="flex-1 bg-[#FEFBF4]">
        <div className="p-6">
          {/* Tab Labels and Buttons */}
          <div className="flex items-center">
            {/* Upcoming Concerts Tab */}
            <div className="flex-1">
              <div 
                className="cursor-pointer"
                onClick={() => setActiveTab('upcoming')}
              >
                <h2 className="text-lg mb-2 text-[#3B3C50] text-center">
                  Upcoming Concerts
                </h2>
                <div 
                  className={`h-2 rounded-full ${
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
                className="cursor-pointer"
                onClick={() => setActiveTab('past')}
              >
                <h2 className="text-lg mb-2 text-[#3B3C50] text-center">
                  Past Concerts
                </h2>
                <div 
                  className={`h-2 rounded-full ${
                    activeTab === 'past' ? 'bg-[#F2C3B3]' : 'bg-transparent'
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="relative mt-4">
            <input
              type="text"
              placeholder="Search Events"
              className="w-full bg-white/10 rounded-full py-2 px-4 pl-10 text-[#3B3C50] placeholder-gray-400 border border-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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

        <section className="px-6 pb-24">
          <div className="relative">
            {/* Continuous Timeline Line */}
            <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-[#C7CCE6]" />
            
            <div className="space-y-4">
              {filteredConcerts.map((concert) => (
                <div key={concert.id} className="flex gap-4">
                  {/* Timeline Node */}
                  <div className="relative z-10">
                    <div className="w-8 h-8 rounded-full bg-[#C7CCE6] flex items-center justify-center text-[#3B3C50] text-sm">
                      {concert.month}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <ConcertBlock
                      title={concert.title}
                      date={concert.date}
                      venue={concert.venue}
                      circleColor={concert.circleColor}
                    />
                  </div>
                </div>
              ))}
              {filteredConcerts.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  No concerts found
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <Navbar />
    </main>
  );
}
