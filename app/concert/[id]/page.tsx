'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';

interface Concert {
  id: string;
  title: string;
  date: string;
  venue: string;
  circleColor: string;
  month: string;
}

const concerts: Concert[] = [
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

export default function ConcertPage() {
  const params = useParams();
  const concert = concerts.find(c => c.id === params.id);

  if (!concert) {
    return (
      <main className="min-h-screen flex flex-col bg-[#2B2F3E]">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-white mb-4">Concert Not Found</h1>
            <p className="text-[#E8D1C5] text-lg">
              The concert you&apos;re looking for doesn&apos;t exist.
            </p>
          </div>
        </div>
        <Navbar />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#2B2F3E]">
      <div className="flex-1 p-6">
        <div className="bg-[#2F4538] rounded-xl p-6 text-white">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl font-semibold">{concert.title}</h1>
            <div 
              className="w-12 h-12 rounded-full"
              style={{ backgroundColor: `#${concert.circleColor}` }}
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{concert.date}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{concert.venue}</span>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </main>
  );
} 