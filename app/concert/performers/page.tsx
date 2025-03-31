'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import PerformerCard from '../../components/PerformerCard';

export default function PerformersPage() {
  const performers = [
    {
      name: 'Davidson Orchestra',
      type: 'group',
      imageUrl: '/orchestra-placeholder.jpg'
    },
    {
      name: 'Davidson Appalachian Ensemble',
      type: 'group',
      imageUrl: '/appalachian-placeholder.jpg'
    },
    {
      name: 'Davidson Jazz Ensemble',
      type: 'group',
      imageUrl: '/jazz-placeholder.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FEFBF4] font-lora">
      {/* Top title bar */}
      <div className="bg-[#2D2F3D] text-white py-5 px-4 flex items-center gap-4">
        <Link href="/concert" className="text-xl">
          ←
        </Link>
        <h1 className="text-lg font-bold">
          Interactive Concert Program
        </h1>
      </div>

      {/* Header with background image */}
      <div className="relative h-[200px]">
        <img
          src="/orchestra-bg.jpg"
          alt="Orchestra performing"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#2D2F3D] opacity-60"></div>
        
        {/* Concert Title */}
        <div className="relative z-10 h-full flex items-end pb-3">
          <h2 className="text-white text-2xl font-bold px-4">
            Holiday Gala
          </h2>
        </div>
      </div>

      {/* Performers Section */}
      <div className="px-4 py-6">
        <h2 className="text-[#2D2F3D] text-2xl font-bold mb-6">Performers</h2>
        <div>
          {performers.map((performer, index) => (
            <PerformerCard
              key={index}
              name={performer.name}
              type={performer.type}
              imageUrl={performer.imageUrl}
            />
          ))}
        </div>
      </div>

      <Navbar />
    </div>
  );
} 