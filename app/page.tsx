'use client';

import React, { useState } from 'react';
import ConcertBlock from './components/ConcertBlock';
import Navbar from './components/Navbar';

interface Concert {
  id: string;
  title: string;
  date: string;
  venue: string;
  imageUrl?: string;
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
      imageUrl: '/czech-chamber.png'
    },
    {
      id: '2',
      title: "Debussy's La Mer",
      date: '4/20/2025 7:30pm',
      venue: 'Duke Family Performance Hall',
      imageUrl: '/debussy.png'
    }
  ];

  const pastConcerts: Concert[] = [];

  const filteredConcerts = (activeTab === 'upcoming' ? upcomingConcerts : pastConcerts)
    .filter(concert => 
      concert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concert.venue.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <main className="min-h-screen bg-[#F9F3EF] pb-24">
      <header className="bg-[#2B2F3E] text-white p-6">
        <h1 className="text-2xl font-semibold mb-6">Interactive Concert Program</h1>
        
        <div className="mb-4">
          {/* Tab Labels and Buttons */}
          <div className="flex items-center">
            {/* Upcoming Concerts Tab */}
            <div className="flex-1">
              <h2 className={`text-2xl mb-2 ${activeTab === 'upcoming' ? 'text-[#44483E]' : 'text-gray-400'}`}>
                Upcoming Concerts
              </h2>
              <div 
                className={`h-2 rounded-full cursor-pointer ${
                  activeTab === 'upcoming' ? 'bg-[#2F4538]' : 'bg-transparent'
                }`}
                onClick={() => setActiveTab('upcoming')}
              />
            </div>

            {/* Separator */}
            <div className="mx-2 h-8 w-0.5 bg-[#E8D1C5]/50" />

            {/* Past Concerts Tab */}
            <div className="flex-1">
              <h2 className={`text-2xl mb-2 ${activeTab === 'past' ? 'text-[#44483E]' : 'text-gray-400'}`}>
                Past Concerts
              </h2>
              <div 
                className={`h-2 rounded-full cursor-pointer ${
                  activeTab === 'past' ? 'bg-[#E8D1C5]' : 'bg-transparent'
                }`}
                onClick={() => setActiveTab('past')}
              />
            </div>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search Events"
            className="w-full bg-white/10 rounded-full py-2 px-4 pl-10 text-white placeholder-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300"
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
      </header>

      <section className="p-6">
        <div className="space-y-4">
          {filteredConcerts.map((concert) => (
            <ConcertBlock
              key={concert.id}
              title={concert.title}
              date={concert.date}
              venue={concert.venue}
              imageUrl={concert.imageUrl}
            />
          ))}
          {filteredConcerts.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No concerts found
            </div>
          )}
        </div>
      </section>

      <Navbar />
    </main>
  );
}
